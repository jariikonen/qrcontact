import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormLabel,
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
  FieldErrors,
  FieldValues,
  Path,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { PhoneNumberType, PhoneNumberTypeOption } from './types';
import { matchSorter } from 'match-sorter';
import { ContactFormValues } from '../ContactForm/types';

function getScreenWidth() {
  const { innerWidth: width } = window;
  return width;
}

export const phoneNumberTypeOptions: PhoneNumberTypeOption[] = [
  { label: 'Other', value: PhoneNumberType.Other },
  { label: 'Home', value: PhoneNumberType.Home },
  { label: 'Work', value: PhoneNumberType.Work },
];

export interface PhoneNumberInputProps<T extends FieldValues> {
  /** Control object from react-hook-form. */
  control: Control<T>;

  /** Index of current phone number input. */
  index: number;

  /** Array of phone number entries. */
  fields: FieldArrayWithId<FieldValues, ArrayPath<T>, 'id'>[];

  /** Current phone number input. */
  field: FieldArrayWithId<FieldValues, ArrayPath<T>, 'id'>;

  /** Name of the preferred checkbox field. */
  namePreferred: Path<T>;

  /** Name of the phone number type field. */
  nameType: Path<T>;

  /** Name of the phone number input field. */
  nameNumber: Path<T>;

  /** Function to handle insertion of a new phone number input. */
  handleInsert: () => void;

  /** Function for removing a phone number input. */
  remove: UseFieldArrayRemove;

  /** Form errors set on the outside. */
  externalErrors: FieldErrors<ContactFormValues>;
}

/**
 * Component for rendering a phone number input with type and preferred options.
 *
 * @param {PhoneNumberInputProps} props - Properties for the PhoneNumberInput component.
 * @returns {JSX.Element} Rendered PhoneNumberInput component.
 */
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
  externalErrors,
}: PhoneNumberInputProps<T>) {
  const [phoneError, setPhoneError] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  // Add a resize handler to get the screen width.
  useEffect(() => {
    function handleResize() {
      setScreenWidth(getScreenWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handler for the phone number input error messages.
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

  // Handler for the phone number type change events.
  const handleTypeChange = (
    onChange: (...event: any[]) => void,
    value: PhoneNumberTypeOption | PhoneNumberTypeOption[]
  ) => {
    onChange(value);
  };

  // Function for filtering the country code options based on user input.
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
    <Fragment key={field.id}>
      <Grid
        item
        xs={12}
        sx={{ display: { xs: 'block', md: 'none' } }}
        mt={'0.4rem'}
        mb={'0.2rem'}
      >
        <FormLabel sx={{ fontSize: '0.9rem' }}>Phone number entry:</FormLabel>
      </Grid>
      <Grid item xs={12} id={`phone.${index}`}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="flex-start"
          rowGap={'0.5rem'}
          sx={{
            ml: { xs: '1rem', md: 0 },
            mb: { xs: '0.5rem', md: 0 },
            p: { xs: '1rem', md: 0 },
            border: { xs: 1, md: 0 },
            borderColor: { xs: 'grey.500', md: 'inherit' },
            borderRadius: { xs: '0.7rem', md: 0 },
          }}
        >
          {fields.length > 1 && (
            <Controller
              name={namePreferred}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box minWidth={screenWidth < 390 ? '10rem' : 'auto'}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ mt: '0.25rem' }}
                        checked={value}
                        onChange={onChange}
                        id={`phone.${index}.preferredCheckbox`}
                        color={externalErrors?.phone ? 'error' : 'primary'}
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
                </Box>
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
                  sx: {
                    minWidth: '7rem',
                    maxWidth: '7rem',
                    ml: 0,
                    mr: '0.3rem',
                  },
                  filterOptions,
                }}
                inputProps={{
                  sx: {
                    minWidth: '10rem',
                    maxWidth: '10rem',
                    ml: 0,
                    mr: '0.3rem',
                  },
                }}
                value={value}
                onChange={onChange}
                errorMessageDisplay="status"
                onError={(error) => handlePhoneNumberInputError(error)}
              />
            )}
          />
          <Box display="block" pt={'0.5rem'}>
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
        </Box>
      </Grid>
      {phoneError && (
        <Grid item xs={12}>
          <FormHelperText error>{phoneError}</FormHelperText>
        </Grid>
      )}
    </Fragment>
  );
}
