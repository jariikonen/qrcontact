import { PhoneNumberType, PhoneNumberTypeOption } from './types';

export const phoneNumberTypeOptions: PhoneNumberTypeOption[] = [
  { label: 'Other', value: PhoneNumberType.Other },
  { label: 'Home', value: PhoneNumberType.Home },
  { label: 'Work', value: PhoneNumberType.Work },
];
