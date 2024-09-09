import Client from "../commom/client/client";

export abstract class EventService {
  public abstract createEvent(client: Client, event: any): Promise<void>;
  public abstract getEvents(client: Client): Promise<void>;
  public abstract getEvent(id: number, client: Client): Promise<void>;
  public abstract getAttendedEvents(client: Client): Promise<void>;
  public abstract getAvailableEvents(client: Client): Promise<void>;
}
