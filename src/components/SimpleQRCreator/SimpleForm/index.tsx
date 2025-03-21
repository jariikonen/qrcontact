import { Box, Button, Grid, TextField } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import PhoneNumberInput from '../../PhoneNumberInput';
import { SimpleFormValues } from './types';
import { phoneNumberTypeOptions } from '../../PhoneNumberInput';
import { useEffect, useState } from 'react';

export interface SimpleFormProps {
  /**
   * A function to set the contact information when it is updated.
   */
  setContactInformation: React.Dispatch<
    React.SetStateAction<SimpleFormValues | null>
  >;

  /**
   * A function to reset the form.
   */
  handleReset: () => void;
}

export default function SimpleForm({
  setContactInformation,
  handleReset: handleResetOutside,
}: SimpleFormProps) {
  const [elementIdToScrollTo, setElementIdToScrollTo] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (elementIdToScrollTo) {
      document.getElementById(`phone.${elementIdToScrollTo}`)?.scrollIntoView();
      document
        .getElementById(`phone.${elementIdToScrollTo}.preferredCheckbox`)
        ?.focus();
      setElementIdToScrollTo(null);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<SimpleFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: [
        { preferred: false, type: phoneNumberTypeOptions[0], number: '' },
      ],
    },
  });

  const {
    fields: phoneFields,
    insert,
    remove,
  } = useFieldArray({
    name: 'phone',
    control,
  });

  function handleReset() {
    reset();
    handleResetOutside();
    window.scrollTo(0, 0);
  }

  function handleInsert(id: number) {
    insert(id, {
      preferred: false,
      type: phoneNumberTypeOptions[0],
      number: '',
    });
    document;
    setElementIdToScrollTo(id);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form
        onSubmit={handleSubmit((data) => {
          setContactInformation(data);
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
              <PhoneNumberInput<SimpleFormValues>
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
