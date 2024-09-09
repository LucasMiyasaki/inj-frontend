/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toast } from "react-toastify";
import Client from "../../../commom/client/client";
import { Advertise } from "../types/types";
import { AdvertiseService } from "./advertise-service";
import { AxiosError } from "axios";

export default class ApplicationAdvertiseService extends AdvertiseService {
  private readonly url: string = `/advertise`;

  public async createAdvertise(
    client: Client,
    advertise: Advertise,
  ): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("name", advertise.name);
      formData.append("description", advertise.description);
      formData.append("startDate", advertise.startDate);
      formData.append("endDate", advertise.endDate);
      if (advertise.file) {
        formData.append("file", advertise.file);
      }

      const response = await client.request({
        method: "post",
        path: this.url,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      //@ts-expect-error
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  public async getAllAdvertises(client: Client): Promise<void> {
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

  public async getAdvertise(client: Client, id: number): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url + "/" + id,
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {
      const err = error as AxiosError;

      console.log(err.toJSON());
    }
  }

  public async updateAdvertise(
    client: Client,
    advertise: Advertise,
    id: number,
  ): Promise<void> {
    try {
      const formData = new FormData();
      const show = advertise.show.toString();
      formData.append("name", advertise.name);
      formData.append("description", advertise.description);
      formData.append("startDate", advertise.startDate);
      formData.append("endDate", advertise.endDate);
      formData.append("show", show);
      if (advertise.file) {
        formData.append("file", advertise.file);
      }

      const response = await client.request({
        method: "put",
        path: this.url + "/" + id,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      //@ts-expect-error
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteAdvertise(client: Client, id: number): Promise<void> {
    try {
      const response = await client.request({
        method: "delete",
        path: this.url + "/" + id,
      });

      //@ts-expect-error
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
