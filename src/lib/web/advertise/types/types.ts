export interface Advertise {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  url?: string;
  file: File | null;
  show: boolean;
}

export interface AdvertiseErrors {
  name: undefined;
  description: undefined;
  startDate: undefined;
  endDate: undefined;
  file: undefined;
}

export interface UpdateAdvertise {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  file: File | null;
}

export interface UpdateAdvertiseErrors {
  name: undefined;
  description: undefined;
  startDate: undefined;
  endDate: undefined;
  file: undefined;
}
