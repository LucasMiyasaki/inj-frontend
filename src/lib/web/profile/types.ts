export interface UpdateUser {
  document: string;
  phone: string;
  email: string;
  name: string;
}

export interface UpdateUserErrors {
  document: undefined;
  phone: undefined;
  email: undefined;
  name: undefined;
}

export interface Event {
  id?: number;
  name: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  capacity: string;
}

export interface EventErrors {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: string;
}

export interface Book {
  id?: number;
  name: string;
  author: string;
  year: string;
  publisher: string;
  url?: string;
  type: string;
  file?: File | null;
}

export interface BookErrors {
  name: string;
  author: string;
  year: string;
  publisher: string;
  url: string;
  type: string;
  file: string;
}
