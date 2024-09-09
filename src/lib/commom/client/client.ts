import axios from "axios";
import { ClientRequest } from "./client-request";
import { ClientResponse } from "./client-response";

interface Response<T> {
  data: T;
  message: string[];
}

export default class Client {
  private readonly url: string;
  private readonly instance;

  public constructor() {
    this.url = process.env.API_URL ?? "http://localhost:3344";
    this.instance = axios.create({
      baseURL: this.url,
    });
  }

  public setAuthorization(auth: string): void {
    this.instance.defaults.headers.Authorization = `Bearer ${auth}`;
  }

  public async request(
    request: ClientRequest,
  ): Promise<ClientResponse | undefined> {
    try {
      const response = await this.instance.request<Response<unknown>>({
        url: this.url + request.path,
        method: request.method,
        data: request.data,
        params: request.params,
        headers: request.headers,
      });

      return new ClientResponse(response.status, response.data);
    } catch (error) {
      console.log(error);
    }
  }
}
