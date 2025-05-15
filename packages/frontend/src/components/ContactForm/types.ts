import { PhoneNumberTypeOption } from '../PhoneNumberInput/types';

export interface ContactFormValues {
  [key: string]:
    | string
    | {
        preferred: boolean;
        type: PhoneNumberTypeOption;
        number: string;
      }[];
  firstName: string;
  lastName: string;
  phone: {
    preferred: boolean;
    type: PhoneNumberTypeOption;
    number: string;
  }[];
}
