import Client from "../commom/client/client";
import { Dependent } from "./types/dependent-types";

export abstract class DependentsService {
  public abstract createDependent(
    client: Client,
    dependent: any,
  ): Promise<void>;
  public abstract getAllDependents(client: Client): Promise<Dependent[]>;
}
