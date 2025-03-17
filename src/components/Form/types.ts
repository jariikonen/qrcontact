import { FieldValues } from 'react-hook-form';
import { PhoneNumberTypeOption } from '../PhoneNumberInput/types';

export interface FormValues extends FieldValues {
  firstName: string;
  lastName: string;
  phone: {
    preferred: boolean;
    type: PhoneNumberTypeOption;
    number: string;
  }[];
}
