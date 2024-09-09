import Client from "../commom/client/client";
import { UpdateUser } from "./types/user-types";

export abstract class UserService {
  public abstract getUserData(client: Client): Promise<void>;
  public abstract updateUser(client: Client, user: UpdateUser): Promise<void>;
  public abstract deleteUser(client: Client): Promise<void>;
}
