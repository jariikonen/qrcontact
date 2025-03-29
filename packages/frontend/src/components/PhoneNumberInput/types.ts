export enum PhoneNumberType {
  Other,
  Home,
  Work,
}

export interface PhoneNumberTypeOption {
  label: string;
  value: PhoneNumberType;
}
