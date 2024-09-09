import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import React, { ReactElement, useEffect, useState } from "react";
import Client from "../../../../../commom/client/client";
import { Button } from "../../../../../commom/component/button/button";
import { FormField } from "../../../../../commom/component/form-field/form-field";
import ApplicationBooksService from "../../../../../services/application-books-service";
import { Book, BookErrors } from "../../../types";
import {
  AddBook,
  AddBookLabel,
  BookContainer,
  BookInfo,
  BooksAuthor,
  BooksContent,
  BooksFilter,
  BooksFilterTitle,
  BooksLabel,
  BooksLabelWrapper,
  BooksNotFound,
  BooksPublisher,
  BooksTitle,
  BooksWrapper,
  BooksYear,
  Container,
  Divider,
  FilterButtonWrapper,
  FormAnimation,
  InfoAnimation,
  TopBookWrapper,
  Wrapper,
} from "./books.styles";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../commom/redux/application-slice";
import { isEmpty } from "lodash";
import { BooksForm } from "./form/book-form";
import { ValidationError } from "yup";
import { createBookValidation } from "./form/book-form.yup";

interface Props {
  isAdmin: boolean;
}

const INITIAL_STATE_BOOK = {
  name: "",
  author: "",
  publisher: "",
  year: "",
  type: "",
  file: undefined,
};

export const Books = ({ isAdmin }: Props): ReactElement => {
  const dispatch = useDispatch();

  const [books, setBooks] = useState<Book[]>([]);
  const [createMode, setCreateMode] = useState(false);
  const [book, setBook] = useState<Book>(INITIAL_STATE_BOOK);
  const [error, setError] = useState<BookErrors>({
    name: "",
    author: "",
    publisher: "",
    year: "",
    type: "",
    url: "",
    file: "",
  });
  const [filter, setFilter] = useState({
    author: "",
    year: "",
    yearOperator: "",
    type: "",
  });

  const openCreateMode = (): void => setCreateMode(true);
  const closeCreateMode = (): void => setCreateMode(false);

  const booksService = new ApplicationBooksService();
  const client = new Client();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBooks();
  }, []);

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const getBooks = async (): Promise<void> => {
    dispatch(setLoading(true));
    await booksService
      .getBooks(client, filter)
      .then(async (data) => {
        dispatch(setLoading(false));
        setBooks(data);
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const onSubmit = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await createBookValidation
        .validate(book, { abortEarly: false })
        .then(async () => {
          console.log(book);

          await booksService.createBook(client, book).then(async () => {
            await getBooks();
            closeCreateMode();
            setBook(INITIAL_STATE_BOOK);
          });
        });
    } catch (err) {
      const error = err as ValidationError;

      error.inner.map((e): void => {
        return handleErrors(e);
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteBook = async (id?: number): Promise<void> => {
    dispatch(setLoading(true));
    await booksService
      .deleteBook(client, id)
      .then(async () => {
        await getBooks();
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setError({ ...error, [e.target.name]: undefined });
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newFile = event.target.files?.[0];

    if (newFile) {
      setBook({ ...book, file: newFile });
    }
  };

  const handleFilterSubmit = async (): Promise<void> => {
    await getBooks();
  };

  const renderBooks = (): ReactElement => {
    return (
      <>
        <BooksWrapper>
          {renderAddBookButton()}
          {books.map((book) => renderBookContent(book))}
        </BooksWrapper>
      </>
    );
  };

  const renderAddBookButton = (): ReactElement | undefined => {
    if (isAdmin) {
      return (
        <AddBook onClick={openCreateMode}>
          <AddOutlined />
          <AddBookLabel>Adicionar Livro</AddBookLabel>
        </AddBook>
      );
    }
  };

  const renderBookContent = (book: Book): ReactElement => {
    if (!isEmpty(book)) {
      return (
        <>
          <BooksContent key={book.id}>
            <img
              src={"http://localhost:3344/images/book/" + book.url}
              alt={book.name}
              style={{
                width: "78px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <BookInfo>
              <TopBookWrapper>
                <BooksTitle>{book.name}</BooksTitle>
                <DeleteOutline
                  sx={{
                    color: "#FF5757",
                    cursor: "pointer",
                  }}
                  onClick={async () => await deleteBook(book.id)}
                />
              </TopBookWrapper>

              <BooksLabelWrapper>
                <BooksLabel>Autor:</BooksLabel>
                <BooksAuthor>{book.author}</BooksAuthor>
              </BooksLabelWrapper>

              <BooksLabelWrapper>
                <BooksLabel>Editora:</BooksLabel>
                <BooksPublisher>{book.publisher}</BooksPublisher>
              </BooksLabelWrapper>

              <BooksLabelWrapper>
                <BooksLabel>Ano:</BooksLabel>
                <BooksYear>{book.year}</BooksYear>
              </BooksLabelWrapper>
            </BookInfo>
          </BooksContent>
        </>
      );
    }

    return <BooksNotFound>Nenhum livro encontrado</BooksNotFound>;
  };

  const renderFilter = (): ReactElement => {
    return (
      <BooksFilter>
        <BooksFilterTitle>Filtro</BooksFilterTitle>

        <Divider />
        <FormField
          label="Autor"
          onChange={handleFilterChange}
          name="author"
          value={filter.author}
          placeholder="Digite o nome do autor"
        />

        <FormField
          label="Ano"
          onChange={handleFilterChange}
          name="year"
          value={filter.year}
          placeholder="Digite o ano"
        />

        <FormField
          label="Tipo"
          onChange={handleFilterChange}
          name="type"
          value={filter.type}
          placeholder="Digite o tipo"
        />

        <FilterButtonWrapper>
          <Button
            backgroundColor="#ffbe98"
            label="Filtrar"
            onPress={handleFilterSubmit}
          />
        </FilterButtonWrapper>
      </BooksFilter>
    );
  };

  const renderContent = (): ReactElement => {
    if (createMode) {
      return (
        <FormAnimation>
          <Wrapper>
            <BooksForm
              book={book}
              handleData={handleData}
              handleFile={handleFile}
              closeCreateMode={closeCreateMode}
              error={error}
              onSubmit={onSubmit}
            />
          </Wrapper>
        </FormAnimation>
      );
    }

    return (
      <InfoAnimation>
        <BookContainer>
          {renderBooks()}
          {renderFilter()}
        </BookContainer>
      </InfoAnimation>
    );
  };

  return <Container>{renderContent()}</Container>;
};
