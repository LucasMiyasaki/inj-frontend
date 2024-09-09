import React, { ChangeEvent, ReactElement, useState } from "react";
import {
  Expenditure,
  ExpenditureErrors,
  ExpenditureType,
  ExpenditureTypeErrors,
} from "../../../types/types";
import { useTranslation } from "react-i18next";
import {
  Container,
  Form,
  Row,
  Title,
  Animation,
  ButtonRow,
  Col,
  DatePicker,
  Wrapper,
  InputContainer,
} from "./expenditure-form.style";
import { SelectField } from "../../../../../commom/component/select/select";
import { FormField } from "../../../../../commom/component/form-field/form-field";
import { TextArea } from "../../../../../commom/component/text-area/text-area";
import { Button } from "../../../../../commom/component/button/button";
import { formatToInt } from "../../../../../utils/formatter/format-number";
import { ButtonIcon } from "../button-icon/button-icon";
import { useNavigate } from "react-router-dom";
import { FormFieldTypes } from "../../../../../commom/component/form-field/types";
import { Radio } from "../../../../../commom/component/radio/radio";
import {
  ErrorText,
  Label,
} from "../../../../../commom/component/form-field/form-field.styles";
import { Modal } from "../../../../../commom/component/modal/modal";
import { FormFieldSpan } from "../form-field/form-field";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { ToastContainer } from "react-toastify";
import { TypeListScreen } from "../type-list/typeList.container";

interface Props {
  error: ExpenditureErrors;
  expenditure: Expenditure;
  expenditureType: ExpenditureType;
  errorType: ExpenditureTypeErrors;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDataType: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRadio: () => void;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleNavigate: () => void;
  handleDate: (e: Value) => void;
  onSubmit: () => Promise<void>;
  onSubmitType: () => Promise<void>;
  isButtonDisabled?: boolean;
  expenditureTypeList: ExpenditureType[];
  date: Date | null;
  typeForm: boolean;
  handleTypeForm: () => void;
  handleTypeList: () => void;
  showTypeList: boolean;
}

export const Expenditures = ({
  error,
  errorType,
  expenditure,
  expenditureType,
  expenditureTypeList,
  handleSelect,
  handleData,
  handleDataType,
  handleTextArea,
  handleRadio,
  handleNavigate,
  handleDate,
  onSubmit,
  onSubmitType,
  date,
  typeForm,
  handleTypeForm,
  handleTypeList,
  showTypeList,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const components = (): ReactElement => {
    return (
      <>
        {expenditureTypeList.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  const renderSecondForm = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    if (expenditure.installments === true) {
      return (
        <Row>
          <FormField
            label={t("expenditure.form.parcels.label")}
            placeholder={t("expenditure.form.parcels.placeholder")}
            value={formatToInt(String(expenditure.parcels))}
            name="parcels"
            onChange={handleData}
            error={error.parcels}
          />

          <FormField
            label={t("expenditure.form.fees.label")}
            placeholder={t("expenditure.form.fees.placeholder")}
            value={expenditure.fee}
            name="fee"
            onChange={handleData}
            error={error.fee}
            inputType={FormFieldTypes.number}
          />
        </Row>
      );
    }
    return <></>;
  };

  const renderContent = (): ReactElement => {
    return (
      <>
      {showTypeList ? <TypeListScreen handleTypeList={handleTypeList}/> : <></>}
        <Modal
          title={t("expenditureType.title")}
          message={""}
          showPrimaryButton={true}
          showSecondaryButton={true}
          showModal={typeForm}
          primaryButtonLabel="Voltar"
          secondaryButtonLabel="Cadastrar"
          onPrimaryButtonPress={handleTypeForm}
          onSecondaryButtonPress={async () => {
            await onSubmitType();
          }}
        >
          <FormField
            label={t("expenditureType.form.name.label")}
            value={expenditureType.name}
            name="name"
            onChange={handleDataType}
            error={errorType.name}
          />
        </Modal>
        <Container>
          <Animation>
            <Form>
              <Title>{t("expenditure.title")}</Title>
              <Row>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "3%",
                    width: "100%",
                  }}
                >
                  <SelectField
                    label={t("expenditure.form.expenditureType.label")}
                    value={expenditure.expenditureTypeId}
                    name="expenditureTypeId"
                    onChange={handleSelect}
                    error={error.expenditureTypeId}
                    components={components}
                  />

                  <div style={{ marginTop: "30px" }}>
                    <ButtonIcon
                      backgroundColor="#f6ab67"
                      pressedBackgroundColor="#D9D9D9"
                      hasFixWidth={false}
                      label={"+"}
                      onPress={handleTypeForm}
                    />
                  </div>
                  <div style={{ marginTop: "30px", marginRight: "5%" }}>
                    <ButtonIcon
                      backgroundColor="#DDDDDD"
                      pressedBackgroundColor="#D9D9D9"
                      hasFixWidth={false}
                      label={"..."}
                      onPress={() => {
                        handleTypeList();
                      }}
                    />
                  </div>
                </div>

                <FormFieldSpan
                  label={t("expenditure.form.value.label")}
                  placeholder={t("expenditure.form.value.placeholder")}
                  value={expenditure.value}
                  name="value"
                  onChange={handleData}
                  error={error.value}
                  inputType={FormFieldTypes.number}
                  span="R$"
                />
              </Row>

              <Row>
                <TextArea
                  label={t("expenditure.form.description.label")}
                  placeholder={t("expenditure.form.description.placeholder")}
                  value={expenditure.description}
                  name="description"
                  onChange={handleTextArea}
                />
              </Row>

              <Row>
                <Col style={{ width: "40%" }}>
                  <Label>{t("expenditure.form.installments.label")}</Label>
                  <Radio
                    label="SIM"
                    onSelect={handleRadio}
                    checked={expenditure.installments}
                  />
                  <Radio
                    label="NÃO"
                    onSelect={handleRadio}
                    checked={!expenditure.installments}
                  />
                </Col>

                <Wrapper>
                  <Label>Data de vencimento</Label>
                  <InputContainer>
                    <DatePicker
                      value={date}
                      onChange={handleDate}
                      clearIcon=""
                      format="dd/MM/yyyy"
                    />
                  </InputContainer>
                  <ErrorText>{error.dueDate}</ErrorText>
                </Wrapper>
              </Row>

              {renderSecondForm()}

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
      </>
    );
  };

  return renderContent();
};
