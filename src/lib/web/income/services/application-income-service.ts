import { noop } from "lodash";
import { Income } from "../types/types";
import Client from "../../../commom/client/client";
import { IncomeService } from "./income-service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default class ApplicationIncomeService extends IncomeService {
  private readonly url: string = `/income`;

  public async createIncome(client: Client, income: Income): Promise<void> {
    try {
      const response = await client.request({
        method: "post",
        path: this.url,
        data: income
      });

      //@ts-expect-error
      return response;
    } catch (error) {
      toast.error(String(error));
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
          endDate
        }
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {
      const err = error as AxiosError;

      console.log(err.toJSON());
    }
  }

  public async updateIncome(client: Client, income: Income, id: number): Promise<void> {
    try {
      const response = await client.request({
        method: "put",
        path: this.url + "/" + id,
        data: income
      });

      //@ts-expect-error
      return response;
    } catch (e) {
      toast.error(String(e));
    }
  }

  public async deleteIncome(client: Client, id: number): Promise<void> {
    try {
      const response = await client.request({
        method: "delete",
        path: this.url + "/" + id
      })

      //@ts-expect-error
      return response;
    } catch (error) {
      toast.error(String(error));
    }
  }
}