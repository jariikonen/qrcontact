import { useEffect } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useFieldArray, useForm, UseFormProps } from 'react-hook-form';
import PhoneNumberInput from '../PhoneNumberInput';
import { ContactFormValues } from './types';
import { phoneNumberTypeOptions } from '../PhoneNumberInput';

export interface ContactFormProps {
  /** State variable containing the form values. */
  formValues: Partial<ContactFormValues> | null;

  /** Function for setting the form values state variable. */
  setFormValues: (formValues: Partial<ContactFormValues> | null) => void;

  /** Function for setting the contact information state variable. */
  setContactInformation: (contactInformation: ContactFormValues) => void;

  /** State variable containing id of an element that should be focused to. */
  elementIdToScrollTo: string | null;

  /** Function for setting ElementIdToScrollTo state variable. */
  setElementIdToScrollTo: (elementId: string | null) => void;

  /** Callback function that is executed when the form is submitted. */
  handleSubmit: () => void;

  /** Callback function that is executed when the form is reset. */
  handleReset: () => void;
}

/**
 * Form component for collecting contact information.
 *
 * @param {ContactFormProps} props - Props for the ContactForm component.
 * @returns {JSX.Element} Rendered ContactForm component.
 */
export default function ContactForm({
  formValues,
  setFormValues,
  setContactInformation,
  elementIdToScrollTo,
  setElementIdToScrollTo,
  handleSubmit: handleSubmitOutside,
  handleReset: handleResetOutside,
}: ContactFormProps) {
  // Default props for useForm.
  const defaultProps: UseFormProps<ContactFormValues> = {
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: [
        { preferred: false, type: phoneNumberTypeOptions[0], number: '' },
      ],
    },
  };

  // Use form values from the state if they exist.
  const formProps = formValues
    ? {
        ...defaultProps,
        defaultValues: formValues,
      }
    : defaultProps;

  // Set up the form using React Hook Form's useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<ContactFormValues>(formProps);

  // Watch for all values in RHF state and store changes in the formValues
  // state variable.
  useEffect(() => {
    const subscription = watch((data) => {
      console.log('storing form values', data);
      setFormValues(data as Partial<ContactFormValues>);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Workaround for the RHF useFieldArray's insert function's focusName not
  // working properly with MUI checkbox.
  useEffect(() => {
    if (elementIdToScrollTo) {
      document.getElementById(`phone.${elementIdToScrollTo}`)?.scrollIntoView();
      document
        .getElementById(`phone.${elementIdToScrollTo}.preferredCheckbox`)
        ?.focus();
      setElementIdToScrollTo(null);
    }
  });

  // Set up the field array for dynamic creation of phone number inputs
  const {
    fields: phoneFields,
    insert,
    remove,
  } = useFieldArray({
    name: 'phone',
    control,
  });

  // Function to handle the resetting of the form
  function handleReset() {
    reset();
    handleResetOutside();
  }

  // Function to handle the insertion of a new phone number input
  function handleInsert(id: number) {
    insert(id, {
      preferred: false,
      type: phoneNumberTypeOptions[0],
      number: '',
    });
    setElementIdToScrollTo(id.toString());
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form
        onSubmit={handleSubmit((data) => {
          setContactInformation(data);
          handleSubmitOutside();
        })}
      >
        <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 0.7 }}>
          <Grid item xs={12}>
            <TextField
              error={typeof errors.firstName !== 'undefined'}
              label="First name *"
              fullWidth
              {...register('firstName', {
                required: 'First name is required.',
              })}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={typeof errors.lastName !== 'undefined'}
              label="Last name *"
              fullWidth
              {...register('lastName', {
                required: 'Last name is required.',
              })}
              helperText={errors.lastName?.message}
            />
          </Grid>
          {phoneFields.map((field, index) => {
            return (
              <PhoneNumberInput<ContactFormValues>
                key={field.id}
                namePreferred={`phone.${index}.preferred`}
                nameType={`phone.${index}.type`}
                nameNumber={`phone.${index}.number`}
                control={control}
                fields={phoneFields}
                field={field}
                handleInsert={() => handleInsert(index + 1)}
                remove={remove}
                index={index}
              />
            );
          })}
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Create
            </Button>
            <Button
              variant="contained"
              type="reset"
              sx={{ ml: '0.5rem' }}
              onClick={handleReset}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
