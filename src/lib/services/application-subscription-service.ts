import Client from "../commom/client/client";
import { SubscriptionService } from "./subscription-service";
import { Subscription } from "./types/subscription-types";

export default class ApplicationSubscriptionService extends SubscriptionService {
  private readonly url: string = `/subscription`;

  public async createSubscription(
    client: Client,
    subscription: Subscription,
  ): Promise<void> {
    try {
      await client.request({
        method: "post",
        path: this.url,
        data: {
          eventId: subscription.eventId,
          payment: subscription.payment,
          dependentId: subscription.dependentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });
    } catch (error) {}
  }

  public async getSubscriptions(
    client: Client,
  ): Promise<Subscription[] | undefined> {
    try {
      const data = await client.request({
        method: "get",
        path: this.url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      // @ts-expect-error
      return data?.data.subscriptions;
    } catch (error) {}
  }

  public async getSubscriptionByEventId(
    client: Client,
    eventId: number,
  ): Promise<any> {
    try {
      const data = await client.request({
        method: "get",
        path: this.url + `/event/${eventId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      // @ts-expect-error
      return data?.data.subscriptions;
    } catch (error) {}
  }

  public async requestCancelSubscription(
    client: Client,
    subscriptionId: number,
  ): Promise<void> {
    try {
      await client.request({
        method: "put",
        path: this.url + `/cancel`,
        data: {
          id: subscriptionId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });
    } catch (error) {}
  }

  public async approveCancelSubscription(
    client: Client,
    subscriptionId: number,
  ): Promise<void> {
    try {
      await client.request({
        method: "put",
        path: this.url + `/cancel/approve`,
        data: {
          id: subscriptionId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });
    } catch (error) {}
  }

  public async rejectCancelSubscription(
    client: Client,
    subscriptionId: number,
  ): Promise<void> {
    try {
      await client.request({
        method: "put",
        path: this.url + `/cancel/reject`,
        data: {
          id: subscriptionId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });
    } catch (error) {}
  }

  public async confirmPayment(
    client: Client,
    subscriptionId: number,
  ): Promise<void> {
    try {
      const res = await client.request({
        method: "put",
        path: this.url + `/status`,
        data: {
          id: subscriptionId,
          status: "ACCEPTED",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      console.log(res);
    } catch (error) {}
  }

  public async rejectPayment(
    client: Client,
    subscriptionId: number,
  ): Promise<void> {
    try {
      await client.request({
        method: "put",
        path: this.url + `/status`,
        data: {
          id: subscriptionId,
          status: "REJECTED",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });
    } catch (error) {}
  }
}
