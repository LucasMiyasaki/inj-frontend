import Client from "../../../commom/client/client";
import { Income } from "../types/types";

export abstract class IncomeService {
  public abstract createIncome(client: Client, income: Income): Promise<void>;
  public abstract getAll(client: Client): Promise<void>;
  public abstract getByRange(client: Client, startDate: string, endDate: string): Promise<void>;
  public abstract updateIncome(client: Client, income: Income, id: number): Promise<void>;
  public abstract deleteIncome(client: Client, id: number): Promise<void>;
}