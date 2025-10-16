export interface User {
  id: string;
  currencyCode: string;
  name: string;
  dateOfBirth: Date | string;
  email: string;
  isEmailConfirmed: boolean;
}
