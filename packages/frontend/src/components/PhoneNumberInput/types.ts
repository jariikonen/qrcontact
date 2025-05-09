export enum PhoneNumberType {
  Other,
  Home,
  Work,
}

/**
 * Represents a phone number type menu option.
 *
 * Contains a label for display and a value representing the type.
 */
export interface PhoneNumberTypeOption {
  label: string;
  value: PhoneNumberType;
}
