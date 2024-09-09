export interface Income {
  id?: number;
  description?: string | null;
  amount: number | null;
  type: string;
  date: string;
}

export interface IncomeErrors {
  amount: undefined;
  type: undefined;
  date: undefined;
}