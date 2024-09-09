import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../../../commom/component/button/button";
import { FormField } from "../../../../../../commom/component/form-field/form-field";
import { SelectField } from "../../../../../../commom/component/select/select";
import { translateBookType } from "../../../../../../utils/translate-book-type";
import { Book, BookErrors } from "../../../../types";
import { ButtonWrapper, FormFieldRow } from "./book-form.styles";
import { bookTypes } from "./types";
import { FormFieldTypes } from "../../../../../../commom/component/form-field/types";

interface Props {
  error: BookErrors;
  book: Book;
  handleData: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
  closeCreateMode: () => void;
}

export const BooksForm = ({
  book,
  error,
  handleData,
  handleFile,
  onSubmit,
  closeCreateMode,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const bookTypesArray = bookTypes.map((type, index) => ({
    id: index + 1,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    name: translateBookType(type),
  }));

  const components = (): ReactElement => {
    return (
      <>
        {bookTypesArray.map((item, index) => (
          <option value={index + 1} key={index}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  const renderForm = (): ReactElement => {
    return (
      <>
        <FormFieldRow>
          <FormField
            label={"Título"}
            onChange={handleData}
            name="name"
            value={book.name}
            placeholder={"Digite o titulo do livro"}
            error={error.name}
          />
        </FormFieldRow>
        <FormFieldRow>
          <FormField
            label={"Autor"}
            onChange={handleData}
            name="author"
            value={book.author}
            placeholder={"Digite o autor do livro"}
            error={error.author}
          />

          <FormField
            label={"Editora"}
            onChange={handleData}
            name="publisher"
            value={book.publisher}
            placeholder={"Digite a editora do livro"}
            error={error.publisher}
          />
        </FormFieldRow>
        <FormFieldRow>
          <FormField
            label={"Ano"}
            onChange={handleData}
            name="year"
            maxLenght={4}
            value={book.year}
            placeholder={"Digite o ano do livro"}
            error={error.year}
          />

          <FormField
            label={"Imagem"}
            onChange={handleFile}
            name="file"
            error={error.file}
            inputType={FormFieldTypes.file}
          />

          <SelectField
            label={"Tipo"}
            onChange={handleData}
            name="type"
            value={book.type}
            components={components}
            error={error.type}
          />
        </FormFieldRow>
      </>
    );
  };

  const renderButton = (): ReactElement => {
    return (
      <ButtonWrapper>
        <Button
          label={t("profile.personalData.form.button.cancel")}
          onPress={closeCreateMode}
          hasFixWidth={false}
          backgroundColor="#FFD6BD"
          pressedBackgroundColor="#f8ddcd"
        />
        <Button
          label={t("profile.personalData.form.button.confirm")}
          onPress={async () => {
            await onSubmit();
          }}
          hasFixWidth={false}
          backgroundColor="#f6ab67"
          pressedBackgroundColor="#f9c799"
        />
      </ButtonWrapper>
    );
  };

  return (
    <>
      {renderForm()}
      {renderButton()}
    </>
  );
};
