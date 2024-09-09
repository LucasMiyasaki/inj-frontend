import { plainToInstance } from "class-transformer";

export class ClientResponse {
  public constructor(
    private readonly status: number,
    private readonly data: { data: unknown },
  ) {}

  public getData<TResponse>(DataType: ClassType<TResponse>): TResponse {
    return plainToInstance(DataType, this.data.data);
  }

  public getArrayData<TResponse>(DataType: ClassType<TResponse>): TResponse[] {
    return plainToInstance(DataType, this.data.data as unknown[]);
  }

  public hasStatus(status: number): boolean {
    return this.status === status;
  }
}

type ClassType<T> = new (...args: any[]) => T;
