export interface Book {
  id?: number;
  name: string;
  author: string;
  year: string;
  publisher: string;
  url?: string;
  type: string;
  file?: File | null;
}
