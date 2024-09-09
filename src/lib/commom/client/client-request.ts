export interface ClientRequest {
  path: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  responseType?: ResponseType;
}
