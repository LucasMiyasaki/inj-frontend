import React, { ChangeEvent, ReactElement } from "react";
import { AdvertiseErrors, Advertise } from "../../../types/types";
import { useTranslation } from "react-i18next";
import { Screen } from "../../../../../commom/component/screen/screen";
import {
  Animation,
  ButtonRow,
  Container,
  DateTimePicker,
  Form,
  InputContainer,
  Row,
  Title,
  Wrapper,
} from "./advertiseForm.style";
import { FormField } from "../../../../../commom/component/form-field/form-field";
import { Button } from "../../../../../commom/component/button/button";
import { formatToDateTime } from "../../../../../utils/formatter/format-date";
import { TextArea } from "../../../../../commom/component/text-area/text-area";
import { FormFieldTypes } from "../../../../../commom/component/form-field/types";
import {
  ErrorText,
  Label,
} from "../../../../../commom/component/form-field/form-field.styles";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";

interface Props {
  error: AdvertiseErrors;
  advertise: Advertise;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleNavigate: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
  startDate: Value;
  endDate: Value;
  handleStartDate: (e: Value) => void;
  handleEndDate: (e: Value) => void;
}

export const AdvertiseForm = ({
  error,
  advertise,
  handleData,
  handleTextArea,
  handleNavigate,
  handleFileChange,
  onSubmit,
  endDate,
  handleEndDate,
  handleStartDate,
  startDate,
}: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Container>
      <Animation>
        <Form>
          <Title>{t("advertise.title")}</Title>
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

          <ButtonRow>
            <Button
              backgroundColor="#D0D0D0"
              pressedBackgroundColor="#D9D9D9"
              hasFixWidth={false}
              label={t("onboarding.button.back")}
              onPress={handleNavigate}
            />
            <Button
              label={t("advertise.form.button.submit")}
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
  );
};
