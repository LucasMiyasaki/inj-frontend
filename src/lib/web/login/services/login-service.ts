import Client from "../../../commom/client/client";
import { UserLogin } from "../types/types";

export abstract class LoginService {
  public abstract login(client: Client, user: UserLogin): Promise<void>;
}
