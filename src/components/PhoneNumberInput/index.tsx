import React, { useCallback, useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  CountryCodeSelectorComposite as CountryCodeSelector,
  CountryType,
} from 'mui-country-code-selector';
import {
  ArrayPath,
  Control,
  Controller,
  FieldArrayWithId,
  FieldValues,
  Path,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { PhoneNumberType, PhoneNumberTypeOption } from './types';
import { matchSorter } from 'match-sorter';

export const phoneNumberTypeOptions: PhoneNumberTypeOption[] = [
  { label: 'Other', value: PhoneNumberType.Other },
  { label: 'Home', value: PhoneNumberType.Home },
  { label: 'Work', value: PhoneNumberType.Work },
];

export interface PhoneNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  index: number;
  fields: FieldArrayWithId<FieldValues, ArrayPath<T>, 'id'>[];
  field: FieldArrayWithId<FieldValues, ArrayPath<T>, 'id'>;
  namePreferred: Path<T>;
  nameType: Path<T>;
  nameNumber: Path<T>;
  handleInsert: () => void;
  remove: UseFieldArrayRemove;
}

export default function PhoneNumberInput<T extends FieldValues>({
  control,
  index,
  namePreferred,
  nameType,
  nameNumber,
  fields,
  field,
  handleInsert,
  remove,
}: PhoneNumberInputProps<T>) {
  const [phoneError, setPhoneError] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePhoneNumberInputError = useCallback((errorStr: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setPhoneError(errorStr);

    const newTimeout = setTimeout(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setPhoneError('');
    }, 3000);
    timeoutRef.current = newTimeout;
  }, []);

  const handleTypeChange = (
    onChange: (...event: any[]) => void,
    value: PhoneNumberTypeOption | PhoneNumberTypeOption[]
  ) => {
    onChange(value);
  };

  const filterOptions = (
    options: CountryType[],
    { inputValue }: { inputValue: string; getOptionLabel: object }
  ) => {
    const inputVal = inputValue.startsWith('+')
      ? inputValue.substring(1)
      : inputValue;
    return matchSorter<CountryType>(options, inputVal, {
      keys: ['country', 'code', 'iso'],
    });
  };

  return (
    <React.Fragment key={field.id}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="left">
          {fields.length > 1 && (
            <Controller
              name={namePreferred}
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ mt: '0.25rem' }}
                      value={value}
                      onChange={onChange}
                    />
                  }
                  label="Preferred"
                  labelPlacement="start"
                  slotProps={{
                    typography: {
                      variant: 'caption',
                      sx: { mt: '0.25rem' },
                    },
                  }}
                  sx={{ ml: 0, mr: 0 }}
                  hidden={fields.length === 1}
                />
              )}
            />
          )}
          <Controller
            name={nameType}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disablePortal
                options={phoneNumberTypeOptions}
                renderInput={(params) => <TextField {...params} label="Type" />}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box component="li" key={key} {...optionProps}>
                      {option.label}
                    </Box>
                  );
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                value={value}
                onChange={(_event, value) => handleTypeChange(onChange, value)}
                autoSelect
                autoHighlight
                disableClearable
                sx={{ ml: 0, mr: '0.3rem', minWidth: '7rem' }}
              />
            )}
          />
          <Controller
            name={nameNumber}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CountryCodeSelector
                phoneNumberLabel="Phone number"
                selectorProps={{
                  sx: { maxWidth: '10rem', ml: 0, mr: '0.3rem' },
                  filterOptions,
                }}
                inputProps={{
                  sx: { maxWidth: '30rem', ml: 0, mr: '0.3rem' },
                }}
                value={value}
                onChange={onChange}
                errorMessageDisplay="none"
                onError={(error) => handlePhoneNumberInputError(error)}
              />
            )}
          />
          <IconButton type="button" color="primary" onClick={handleInsert}>
            <AddCircleIcon />
          </IconButton>
          <IconButton
            type="button"
            color="primary"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            <RemoveCircleIcon />
          </IconButton>
        </Box>
      </Grid>
      {phoneError && (
        <Grid item xs={12}>
          <FormHelperText error>{phoneError}</FormHelperText>
        </Grid>
      )}
    </React.Fragment>
  );
}
