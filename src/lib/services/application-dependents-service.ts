import { toast } from "react-toastify";
import Client from "../commom/client/client";
import { DependentsService } from "./dependents-service";
import { Dependent } from "./types/dependent-types";

export default class ApplicationDependentsService extends DependentsService {
  private readonly url: string = `/dependents`;

  public async createDependent(client: Client, dependent: any): Promise<void> {
    try {
      const res = await client.request({
        method: "post",
        path: this.url,
        data: {
          name: dependent.name,
          observation: dependent.observation,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      if (res?.hasStatus(200)) {
        toast.success("Dependente cadastrado com sucesso");
      } else if (res?.hasStatus(400)) {
        toast.error("Erro ao cadastrar dependente");
        throw new Error("Dependent already exists");
      }
    } catch (error) {}
  }

  public async getAllDependents(client: Client): Promise<Dependent[]> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      console.log(res);

      // @ts-expect-error
      return res?.data.data;
    } catch (error) {
      return [];
    }
  }
}
