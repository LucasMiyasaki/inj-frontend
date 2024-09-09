import { toast } from "react-toastify";
import Client from "../commom/client/client";
import { BooksService } from "./books-service";
import { Book } from "./types/book-types";
import { bookTypes } from "../web/profile/screens/components/books/form/types";

export default class ApplicationBooksService extends BooksService {
  private readonly url: string = `/book`;

  public async createBook(client: Client, book: any): Promise<void> {
    try {
      console.log(book.file);

      const res = await client.request({
        method: "post",
        path: this.url,
        data: {
          name: book.name,
          author: book.author,
          publisher: book.publisher,
          year: book.year,
          type: bookTypes[Number(book.type) - 1],
          file: book.file,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);

      if (res?.hasStatus(200)) {
        toast.success("Livro cadastrado com sucesso");
      } else if (res?.hasStatus(400)) {
        toast.error("Erro ao cadastrar livro");
        throw new Error("Book already exists");
      }
    } catch (error) {}
  }

  public async getBooks(client: Client, filters?: any): Promise<Book[]> {
    try {
      const res = await client.request({
        method: "get",
        path: this.url + "/all",
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      // @ts-expect-error
      return res?.data.data;
    } catch (error) {
      return [];
    }
  }

  public async deleteBook(client: Client, id?: number): Promise<void> {
    try {
      const res = await client.request({
        method: "delete",
        path: this.url,
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jsonWebToken")}`,
        },
      });

      if (res?.hasStatus(200)) {
        toast.success("Livro deletado com sucesso");
      } else {
        toast.error("Erro ao deletar livro");
        throw new Error("Error deleting book");
      }
    } catch (error) {}
  }
}
