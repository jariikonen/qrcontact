import { PhoneNumberTypeOption } from '../../PhoneNumberInput/types';

export interface SimpleFormValues {
  firstName: string;
  lastName: string;
  phone: {
    preferred: boolean;
    type: PhoneNumberTypeOption;
    number: string;
  }[];
}
