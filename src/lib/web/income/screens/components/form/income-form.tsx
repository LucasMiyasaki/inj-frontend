import React, { ChangeEvent, ReactElement } from "react";
import { Income, IncomeErrors } from "../../../types/types";
import { useTranslation } from "react-i18next";
import {
  Container,
  Form,
  Row,
  Title,
  Animation,
  ButtonRow,
  Wrapper,
  DatePicker,
  InputContainer,
} from "./income-form.style";
import { SelectField } from "../../../../../commom/component/select/select";
import { TextArea } from "../../../../../commom/component/text-area/text-area";
import { Button } from "../../../../../commom/component/button/button";
import { FormFieldTypes } from "../../../../../commom/component/form-field/types";
import { FormFieldSpan } from "../form-field/form-field";
import { Label } from "../../income.styles";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { ErrorText } from "../form-field/form-field.styles";

interface Props {
  error: IncomeErrors;
  income: Income;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleNavigate: () => void;
  onSubmit: () => Promise<void>;
  date: Date | null;
  handleDate: (e: Value) => void;
}

export const Incomes = ({
  error,
  income,
  handleSelect,
  handleData,
  handleTextArea,
  handleNavigate,
  onSubmit,
  date,
  handleDate,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const components = (): ReactElement => {
    return (
      <>
        <option value="TITHE">Dizimo</option>
        <option value="DONATION">Oferta</option>
        <option value="OTHER">Outro</option>
      </>
    );
  };

  return (
    <>
      <Container>
        <Animation>
          <Form>
            <Title>{t("income.title")}</Title>
            <Row>
              <SelectField
                label={t("income.form.type.label")}
                value={income.type}
                name="type"
                onChange={handleSelect}
                error={error.type}
                components={components}
              />

              <FormFieldSpan
                span="R$"
                label={t("income.form.amount.label")}
                placeholder={t("income.form.amount.placeholder")}
                value={income.amount}
                name="amount"
                onChange={handleData}
                error={error.amount}
                inputType={FormFieldTypes.number}
              />

              <Wrapper>
                <Label>Data de recebimento</Label>
                <InputContainer>
                  <DatePicker value={date} onChange={handleDate} clearIcon="" format="dd/MM/yyyy"/>
                </InputContainer>
                <ErrorText>{error.date}</ErrorText>
              </Wrapper>
            </Row>

            <Row>
              <TextArea
                label={t("income.form.description.label")}
                placeholder={t("income.form.description.placeholder")}
                value={income.description}
                name="description"
                onChange={handleTextArea}
              />
            </Row>

            <ButtonRow>
              <Button
                backgroundColor="#D0D0D0"
                pressedBackgroundColor="#D9D9D9"
                hasFixWidth={false}
                label={t("onboarding.button.back")}
                onPress={handleNavigate}
              />
              <Button
                label={"Cadastrar"}
                onPress={async () => {
                  await onSubmit();
                }}
                hasFixWidth={false}
                backgroundColor="#f6ab67"
                pressedBackgroundColor="#f9c799"
              />
            </ButtonRow>
          </Form>
        </Animation>
      </Container>
    </>
  );
};
