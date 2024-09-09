export interface Event {
  id?: number;
  name: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  capacity: string;
}
