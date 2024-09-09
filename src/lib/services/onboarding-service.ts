import Client from "../commom/client/client";
import { User } from "./types/user-types";

export abstract class OnboardingService {
  public abstract createUser(client: Client, user: User): Promise<void>;
}
