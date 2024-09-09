import { noop } from "lodash";
import { ExpenditureType } from "../types/types";
import Client from "../../../commom/client/client";
import { ExpenditureTypeService } from "./expenditureType-service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class ApplicationExpenditureTypeService extends ExpenditureTypeService {
  private readonly url: string = `/expenditureType`;

  public async createExpenditureType(client: Client, expenditureType: ExpenditureType): Promise<void> {
    try {
      const response = await client.request({
        method: "post",
        path: this.url,
        data: expenditureType
      });

      //@ts-expect-error
      return response;
    } catch(error) {
      toast.error(String(error));
    }
  }

  public async getAllTypes(client: Client): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url,
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {
      const err = error as AxiosError;

      console.log(err.toJSON());
    }
  }

  public async updateExpenditureType(client: Client, expenditure: ExpenditureType, id: number): Promise<void> {
    try {
      const response = await client.request({
        method: "put",
        path: this.url + "/" + id,
        data: expenditure
      });

      //@ts-expect-error
      return response;
    } catch (e) {
      toast.error(String(e));
    }
  }

  public async deleteExpenditureType(client: Client, id: number): Promise<void> {
    try {
      const response = await client.request({
        method: "delete",
        path: this.url + "/" + id
      })

      //@ts-expect-error
      return response;
    } catch(error) {
      toast.error(String(error));
    }
  }
}