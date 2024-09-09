import { noop } from "lodash";
import { Expenditure } from "../types/types";
import Client from "../../../commom/client/client";
import { ExpenditureService } from "./expenditure-service";
import { AxiosError } from "axios";

export default class ApplicationExpenditureService extends ExpenditureService {
  private readonly url: string = `/expenditure`;

  public async createExpenditure(client: Client, expenditure: Expenditure): Promise<void> {
    try {
      const response = await client.request({
        method: "post",
        path: this.url,
        data: expenditure,
      });

      //@ts-expect-error
      return response;
    } catch(error) {
      console.log(error);
    }
  }

  public async getAll(client: Client): Promise<void> {
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

  public async getByRange(client: Client, startDate: string, endDate: string): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url + "/range",
        params: {
          startDate,
          endDate,
        }
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {
      const err = error as AxiosError;

      console.log(err.toJSON());
    }
  }

  public async updateExpenditure(client: Client, expenditure: Expenditure, id: number): Promise<void> {
    try {
      const response = await client.request({
        method: "put",
        path: this.url + "/" + id,
        data: expenditure,
      });

      //@ts-expect-error
      return response;
    } catch (e) {
      window.alert(e);
    }
  }

  public async deleteExpenditure(client: Client, id: number): Promise<void> {
    try {
      const response = await client.request({
        method: "delete",
        path: this.url + "/" + id,
      });

      //@ts-expect-error
      return response;
    } catch(error) {
      console.log(error);
    }
  }
}
