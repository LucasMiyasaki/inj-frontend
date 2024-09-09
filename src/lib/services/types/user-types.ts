export interface User {
  id?: number;
  name: string;
  email: string;
  document: string;
  password: string;
  phone: string;
  type?: UserStatus;
  status?: string;
  attempts?: number;
}

export interface UpdateUser {
  document: string;
  phone: string;
  email: string;
  name: string;
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  BLOCKED = "BLOCKED",
}
