import { PhoneNumberType, PhoneNumberTypeOption } from './types';

export default function getPhoneNumberTypeString(
  type: PhoneNumberTypeOption,
  preferred: boolean
): string {
  let typeStr = '';
  switch (type.value) {
    case PhoneNumberType.Home:
      typeStr = 'HOME';
      break;
    case PhoneNumberType.Work:
      typeStr = 'WORK';
      break;
    case PhoneNumberType.Other:
      typeStr = 'OTHER';
      break;
    default:
      typeStr = 'OTHER';
  }
  if (preferred) {
    typeStr += ';PREF';
  }
  return typeStr;
}
