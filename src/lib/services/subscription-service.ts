import Client from "../commom/client/client";
import { Subscription } from "./types/subscription-types";

export abstract class SubscriptionService {
  public abstract createSubscription(
    client: Client,
    subscription: any,
  ): Promise<void>;
  public abstract getSubscriptions(
    client: Client,
  ): Promise<Subscription[] | undefined>;
  public abstract getSubscriptionByEventId(
    client: Client,
    eventId: number,
  ): Promise<any>;
  public abstract approveCancelSubscription(
    client: Client,
    subscriptionId: number,
  ): Promise<void>;
  public abstract rejectCancelSubscription(
    client: Client,
    subscriptionId: number,
  ): Promise<void>;
  public abstract confirmPayment(
    client: Client,
    subscriptionId: number,
  ): Promise<void>;
  public abstract rejectPayment(
    client: Client,
    subscriptionId: number,
  ): Promise<void>;
}
