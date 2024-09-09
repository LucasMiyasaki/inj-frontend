import Client from "../../../commom/client/client";
import { Expenditure } from "../types/types";

export abstract class ExpenditureService {
  public abstract createExpenditure(client: Client, expenditure: Expenditure): Promise<void>;
  public abstract getAll(client: Client): Promise<void>;
  public abstract getByRange(client: Client, startDate: string, endDate: string): Promise<void>;
  public abstract updateExpenditure(client: Client, expenditure: Expenditure, id: number): Promise<void>;
  public abstract deleteExpenditure(client: Client, id: number): Promise<void>;
}