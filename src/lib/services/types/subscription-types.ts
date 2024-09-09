import { Event } from "../../web/profile/types";
import { Dependent } from "./dependent-types";
import { User } from "./user-types";

export interface Subscription {
  id?: number;
  userId?: number;
  eventId: number;
  status?: string;
  payment: string;
  dependentId?: number | null;
  cancelRequest?: boolean;
  cancelRequestApprovalDate?: Date;
  cancelRequestApprovedBy?: string;
  cancelRequestDate?: Date;
  cancelRequestReason?: string;
  cancelRequestStatus?: CancelRequestStatus;
  event?: Event;
  user?: User;
  dependent?: Dependent;
}

export enum PaymentTypes {
  PIX = "PIX",
  CASH = "CASH",
}

export enum PaymentStatusTypes {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum CancelRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
