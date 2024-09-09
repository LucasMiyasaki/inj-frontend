import { noop } from "lodash";
import { toast } from "react-toastify";
import Client from "../commom/client/client";
import { OnboardingService } from "./onboarding-service";
import { User } from "./types/user-types";
import { AxiosError } from "axios";

export default class ApplicationOnboardingService extends OnboardingService {
  private readonly url: string = `/user`;

  public async createUser(client: Client, user: User): Promise<void> {
    try {
      const res = await client.request({
        method: "post",
        path: this.url,
        data: user,
      });

      console.log(res);

      if (res?.hasStatus(200)) {
        toast.success("User created!");
      } else {
        toast.error("Informações já estão sendo usadas, tente novamente");
        throw new Error("User not created");
      }
    } catch (error) {
      const err = error as AxiosError;

      console.log(err);

      throw err;
    }
  }
}
