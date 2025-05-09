import { PhoneNumberTypeOption } from '../../PhoneNumberInput/types';

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  phone: {
    preferred: boolean;
    type: PhoneNumberTypeOption;
    number: string;
  }[];
}
