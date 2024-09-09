import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserLogin } from "../types/types";
import { LoginService } from "./login-service";
import Client from "../../../commom/client/client";

export default class ApplicationLoginService extends LoginService {
  private readonly url: string = `/user/login`;

  public async login(client: Client, user: UserLogin): Promise<void> {
    try {
      const res = await axios.request({
        url: "http://localhost:3344/user/login",
        method: "post",
        data: user,
      });

      console.log(res);

      console.log(res.status === 401);

      if (res.status === 200) {
        localStorage.setItem("jsonWebToken", String(res.data.data.token));
        toast.success("Logado com sucesso");
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);

      if (err.message === "Request failed with status code 401") {
        toast.error(
          "Usuário não autorizado, espere um administrador aprovar seu cadastro",
        );
      } else {
        toast.error("Email ou senha inválidos");
      }

      throw err;
    }
  }
}
