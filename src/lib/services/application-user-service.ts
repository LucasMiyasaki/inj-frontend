import { noop } from "lodash";
import { toast } from "react-toastify";
import Client from "../commom/client/client";
import { UserService } from "./user-service";
import { User } from "./types/user-types";

export default class ApplicationUserService extends UserService {
  private readonly url: string = `/user`;

  public async getUserData(client: Client): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {}
  }

  public async updateUser(
    client: Client,
    user: { name?: string; phone?: string; email?: string },
  ): Promise<void> {
    try {
      await client.request({
        method: "put",
        path: this.url,
        data: user,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      toast.success("User updated");
    } catch (error) {
      noop();
    }
  }

  public async getAllUsers(client: Client): Promise<User[] | undefined> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url + `/all`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      // @ts-expect-error
      console.log(res.data.data);

      //@ts-expect-error
      return res?.data;
    } catch (error) {
      noop();
    }
  }

  public async deleteUser(client: Client): Promise<void> {
    try {
      await client.request({
        method: "delete",
        path: this.url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      localStorage.removeItem("jsonWebToken");

      toast.success("User deleted");
    } catch (error) {
      noop();
    }
  }

  public async approveUser(client: Client, userId: number): Promise<void> {
    try {
      await client.request({
        method: "put",
        path: this.url + `/status`,
        data: {
          id: userId,
          status: "ACTIVE",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      toast.success("Usuário aprovado");
    } catch (error) {
      noop();
    }
  }

  public async blockUser(client: Client, userId: number): Promise<void> {
    try {
      await client.request({
        method: "put",
        path: this.url + `/status`,
        data: {
          id: userId,
          status: "BLOCKED",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      toast.success("Usuário bloqueado");
    } catch (error) {
      noop();
    }
  }
}
