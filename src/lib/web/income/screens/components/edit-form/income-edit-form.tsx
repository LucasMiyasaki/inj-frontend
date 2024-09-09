import React, { ChangeEvent, ReactElement } from "react";
import {
  Container,
  Row,
  Animation,
  Form,
  Title,
  ButtonRow,
  Wrapper,
  InputContainer,
  DatePicker,
} from "./income-edit-form.styles";
import { FormField } from "../../../../../commom/component/form-field/form-field";
import { formatToDate } from "../../../../../utils/formatter/format-date";
import { Screen } from "../../../../../commom/component/screen/screen";
import { Income, IncomeErrors } from "../../../types/types";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../../commom/component/button/button";
import { SelectField } from "../../../../../commom/component/select/select";
import { TextArea } from "../../../../../commom/component/text-area/text-area";
import { FormFieldTypes } from "../../../../../commom/component/form-field/types";
import { Label } from "../../income.styles";
import { ErrorText } from "../form-field/form-field.styles";
import { Value } from "react-date-picker/dist/cjs/shared/types";

interface Props {
  income: Income;
  error: IncomeErrors;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdate: () => Promise<void>;
  closeEditMode: () => void;
  date: Date | null;
  handleDate: (e: Value) => void;
}

export const IncomeEditForm = ({
  income,
  error,
  handleData,
  handleSelect,
  handleTextArea,
  onUpdate,
  closeEditMode,
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
            <Title>Alterar Receita</Title>
            <Row>
              <SelectField
                label={t("income.form.type.label")}
                value={income.type}
                name="type"
                onChange={handleSelect}
                error={error.type}
                components={components}
              />

              <FormField
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
                  <DatePicker
                    value={date}
                    onChange={handleDate}
                    clearIcon=""
                    format="dd/MM/yyyy"
                  />
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
                onPress={closeEditMode}
              />
              <Button
                label={"Alterar"}
                onPress={async () => {
                  await onUpdate();
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
