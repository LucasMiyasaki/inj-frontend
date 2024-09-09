import React, { ChangeEvent, ReactElement } from "react";
import { Advertise, UpdateAdvertiseErrors } from "../../../types/types";
import { useTranslation } from "react-i18next";
import { FormField } from "../../../../../commom/component/form-field/form-field";
import {
  ButtonWrapper,
  Form,
  Row,
  Animation,
  Container,
  Title,
  Wrapper,
  InputContainer,
  DateTimePicker,
} from "./advertise-edit-form.styles";
import { TextArea } from "../../../../../commom/component/text-area/text-area";
import { Button } from "../../../../../commom/component/button/button";
import { FormFieldTypes } from "../../../../../commom/component/form-field/types";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { Label } from "../advertise-details/advertise-details.style";
import { ErrorText } from "../../../../../commom/component/form-field/form-field.styles";

interface Props {
  error: UpdateAdvertiseErrors;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleValidation: () => Promise<void>;
  handleTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  closeEditMode: () => void;
  advertise: Advertise;
  startDate: Value;
  endDate: Value;
  handleStartDate: (e: Value) => void;
  handleEndDate: (e: Value) => void;
}

export const AdvertiseEditForm = ({
  error,
  handleData,
  closeEditMode,
  handleValidation,
  handleTextArea,
  handleFileChange,
  advertise,
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const renderForm = (): ReactElement => {
    return (
      <>
        <Row>
          <FormField
            label={t("advertise.form.name.label")}
            placeholder={t("advertise.form.name.placeholder")}
            value={advertise.name}
            name="name"
            onChange={handleData}
            error={error.name}
          />
        </Row>

        <Row>
          <TextArea
            label={t("advertise.form.description.label")}
            placeholder={t("advertise.form.description.placeholder")}
            value={advertise.description}
            name="description"
            onChange={handleTextArea}
            error={error.description}
          />
        </Row>

        <Row>
          <Wrapper>
            <Label>Data de início</Label>
            <InputContainer>
              <DateTimePicker
                value={startDate}
                onChange={handleStartDate}
                clearIcon=""
                disableClock={true}
                format="dd/MM/yyyy - HH:mm"
              />
            </InputContainer>
            <ErrorText>{error.startDate}</ErrorText>
          </Wrapper>

          <Wrapper>
            <Label>Data de término</Label>
            <InputContainer>
              <DateTimePicker
                value={endDate}
                onChange={handleEndDate}
                clearIcon=""
                disableClock={true}
                format="dd/MM/yyyy - HH:mm"
              />
            </InputContainer>
            <ErrorText>{error.endDate}</ErrorText>
          </Wrapper>

          <FormField
            label={t("advertise.form.file.label")}
            placeholder={t("advertise.form.file.placeholder")}
            name="file"
            onChange={handleFileChange}
            error={error.file}
            inputType={FormFieldTypes.file}
          />
        </Row>
      </>
    );
  };

  const renderButton = (): ReactElement => {
    return (
      <ButtonWrapper>
        <Button
          label={"Cancelar"}
          onPress={closeEditMode}
          hasFixWidth={false}
          backgroundColor="#D0D0D0"
          pressedBackgroundColor="#D9D9D9"
        />
        <Button
          label={"Confirmar"}
          onPress={async () => {
            await handleValidation();
          }}
          hasFixWidth={false}
          backgroundColor="#f6ab67"
          pressedBackgroundColor="#f9c799"
        />
      </ButtonWrapper>
    );
  };

  return (
    <Container>
      <Animation>
        <Form>
          <Title>Alterar Aviso</Title>
          {renderForm()}
          {renderButton()}
        </Form>
      </Animation>
    </Container>
  );
};
