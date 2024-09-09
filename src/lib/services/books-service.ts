import Client from "../commom/client/client";
import { Book } from "./types/book-types";

export abstract class BooksService {
  public abstract createBook(client: Client, book: any): Promise<void>;
  public abstract getBooks(client: Client, filters: any): Promise<Book[]>;
}
