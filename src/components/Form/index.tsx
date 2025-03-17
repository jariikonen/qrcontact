import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import PhoneNumberInput from '../PhoneNumberInput';
import { FormValues } from './types';
import { phoneNumberTypeOptions } from '../PhoneNumberInput';

let renderCount = 0;

export default function Form() {
  renderCount++;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
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

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 'lg' }} style={{ margin: '2rem 1rem' }}>
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Create your VCard QR-code (render count: {renderCount})
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
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
              <PhoneNumberInput<FormValues>
                key={field.id}
                namePreferred={`phone.${index}.preferred`}
                nameType={`phone.${index}.type`}
                nameNumber={`phone.${index}.number`}
                control={control}
                fields={phoneFields}
                field={field}
                handleInsert={() =>
                  insert(index + 1, {
                    preferred: false,
                    type: phoneNumberTypeOptions[0],
                    number: '',
                  })
                }
                remove={remove}
                index={index}
              />
            );
          })}
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Create
            </Button>
            <Button variant="contained" type="reset" sx={{ ml: '0.5rem' }}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
