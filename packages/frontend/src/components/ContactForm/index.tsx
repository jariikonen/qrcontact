import { useEffect } from 'react';
import { Box, Button, FormHelperText, Grid, TextField } from '@mui/material';
import { useFieldArray, useWatch } from 'react-hook-form';
import PhoneNumberInput from '../PhoneNumberInput';
import {
  ContactFormValues,
  defaultContactFormValues as defaultValues,
} from './types';
import { phoneNumberTypeOptions } from '../PhoneNumberInput';
import { Store, useStore } from '../../store';
import { useFormWithStore } from '@jariikonen/zustand-rhf-sync';

export interface ContactFormProps {
  /** Function for selecting form values from the full store state. */
  formSelector: (state: Store) => ContactFormValues;

  /** Function for setting the form values state variable. */
  setFormValues: (formValues: ContactFormValues) => void;

  /** Function for setting the contact information state variable. */
  setContactInformation: (contactInformation: ContactFormValues | null) => void;

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
  formSelector,
  setFormValues,
  setContactInformation,
  elementIdToScrollTo,
  setElementIdToScrollTo,
  handleSubmit: handleSubmitOutside,
  handleReset: handleResetOutside,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setError,
    clearErrors,
  } = useFormWithStore<Store, ContactFormValues>(
    useStore,
    setFormValues,
    formSelector,
    { mode: 'onChange', reValidateMode: 'onChange' }
  );

  // Set up the field array for dynamic creation of phone number inputs
  const {
    fields: phoneFields,
    insert,
    remove,
  } = useFieldArray({
    name: 'phone',
    control,
    shouldUnregister: false,
  });

  // Workaround for RHF useFieldArray's insert function's focusName not
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

  // Watch for changes in the phone number inputs so that the number of
  // preferred phone numbers can be validated.
  const phoneNumbers = useWatch({
    control,
    name: 'phone',
  });

  // Allow only one phone number to be marked as preferred.
  useEffect(() => {
    const preferredCount = phoneNumbers.filter((p) => p.preferred).length;
    if (preferredCount > 1) {
      setError('phone', {
        type: 'manual',
        message: 'Only one phone number can be marked as preferred.',
      });
    } else {
      clearErrors('phone');
    }
  }, [phoneNumbers]);

  function handleReset() {
    reset(defaultValues);
    handleResetOutside();
  }

  function handleInsert(id: number) {
    insert(id, {
      preferred: false,
      type: phoneNumberTypeOptions[0],
      number: '',
    });
    setElementIdToScrollTo(id.toString());
  }

  function onSubmit(data: ContactFormValues) {
    setContactInformation(data);
    handleSubmitOutside();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
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
                externalErrors={errors}
              />
            );
          })}
          {errors.phone && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.phone.message}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Create
            </Button>
            <Button
              variant="contained"
              type="button"
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
