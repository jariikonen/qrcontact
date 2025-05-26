import { phoneNumberTypeOptions } from '../PhoneNumberInput';
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

export const defaultPhoneEntry = [
  { preferred: false, type: phoneNumberTypeOptions[0], number: '' },
];

export const defaultContactFormValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  phone: defaultPhoneEntry,
};

export function isDeepEqual(
  obj1: ContactFormValues,
  obj2: ContactFormValues
): boolean {
  return (
    obj1.firstName === obj2.firstName &&
    obj1.lastName === obj2.lastName &&
    JSON.stringify(obj1.phone) === JSON.stringify(obj2.phone)
  );
}
