export interface ExpenditureType {
  id?: number;
  name: string;
}

export interface ExpenditureTypeErrors {
  name: undefined | string;
}

export interface Expenditure {
  id?: number;
  description?: string | null;
  value: number | null;
  installments: boolean;
  parcels?: number | null;
  dueDate: string;
  fee?: number | null;
  expenditureTypeId: number;
  payedDate?: string | null;
}

export interface ExpenditureErrors {
  value: undefined;
  parcels: undefined;
  dueDate: undefined;
  fee: undefined;
  expenditureTypeId: undefined;
  payedDate: undefined;
}