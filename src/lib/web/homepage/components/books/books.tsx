import React, { ReactElement } from "react";
import { Book } from "../../../../services/types/book-types";
import {
  BookContainer,
  BookInfo,
  BooksAuthor,
  BooksContent,
  BooksLabel,
  BooksLabelWrapper,
  BooksPublisher,
  BooksTitle,
  BooksYear,
  Container,
  InfoAnimation,
  TruncateLines,
} from "./books.styles";

interface Props {
  book: Book;
}

export const BooksHome = ({ book }: Props): ReactElement => {
  const renderBook = (): ReactElement => {
    return (
      <>
        <BooksContent key={book.id}>
          <BookInfo>
            <img
              src={"http://localhost:3344/images/book/" + book.url}
              alt={book.name}
              style={{
                width: "248px",
                height: "360px",
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                margin: "0 auto"
              }}
            />

            <BooksTitle>{book.name}</BooksTitle>
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
  };

  return (
    <Container>
      <InfoAnimation>{renderBook()}</InfoAnimation>
    </Container>
  );
};
