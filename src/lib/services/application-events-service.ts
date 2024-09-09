/* eslint-disable @typescript-eslint/no-unsafe-argument */
import moment from "moment";
import Client from "../commom/client/client";
import { EventService } from "./event-service";
import { Event } from "./types/events-types";

export default class ApplicationEventService extends EventService {
  private readonly url: string = `/event`;

  public async createEvent(client: Client, event: Event): Promise<void> {
    try {
      await client.request({
        method: "post",
        path: this.url,
        data: {
          name: event.name,
          description: event.description,
          capacity: Number(event.capacity),
          startDate: moment(event.startDate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          endDate: moment(event.endDate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });
    } catch (error) {}
  }

  public async getEvents(client: Client): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url,
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {}
  }

  public async getEvent(id: number, client: Client): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url + `/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {}
  }

  public async getAttendedEvents(client: Client): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url + `/attended`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {}
  }

  public async getAvailableEvents(client: Client): Promise<void> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url + `/available`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      //@ts-expect-error
      return res?.data;
    } catch (error) {}
  }
}
