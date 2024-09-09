export interface User {
  document: string;
  phone: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface UserErrors {
  document: undefined;
  phone: undefined;
  email: undefined;
  name: undefined;
  password: undefined;
  confirmPassword: undefined;
}
