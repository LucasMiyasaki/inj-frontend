import Client from "../../../commom/client/client";
import { Advertise } from "../types/types";

export abstract class AdvertiseService {
    public abstract createAdvertise(client: Client, advertise: Advertise): Promise<void>;
    public abstract getAllAdvertises(client: Client): Promise<void>;
    public abstract getAdvertise(client: Client, id: number): Promise<void>;
    public abstract updateAdvertise(client: Client, advertise: Advertise, id: number): Promise<void>;
    public abstract deleteAdvertise(client: Client, id: number): Promise<void>;
}