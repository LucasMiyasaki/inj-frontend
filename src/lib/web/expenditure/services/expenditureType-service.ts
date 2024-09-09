import Client from "../../../commom/client/client";
import { ExpenditureType } from "../types/types";

export abstract class ExpenditureTypeService {
  public abstract createExpenditureType(client: Client, expenditure: ExpenditureType): Promise<void>;
  public abstract getAllTypes(client: Client): Promise<void>;
  public abstract updateExpenditureType(client: Client, expenditure: ExpenditureType, id: number): Promise<void>;
  public abstract deleteExpenditureType(client: Client, id: number): Promise<void>;
}