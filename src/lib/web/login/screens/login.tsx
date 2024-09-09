import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { Button } from "../../../commom/component/button/button";
import { FormField } from "../../../commom/component/form-field/form-field";
import { FormFieldTypes } from "../../../commom/component/form-field/types";
import { Loading } from "../../../commom/component/loading/loading";
import { Screen } from "../../../commom/component/screen/screen";
import { UserLogin, UserLoginErros } from "../types/types";
import {
  Animation,
  ButtonRow,
  Container,
  Divider,
  DividerRow,
  DividerText,
  ForgotPassword,
  Form,
  FormFieldRow,
  FormTitle,
  LeftWrapper,
  Message,
  Subtitle,
  Title,
  Wrapper,
} from "./login.styles";

interface Props {
  user: UserLogin;
  error: UserLoginErros;
  loading: boolean;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  isButtonDisabled?: boolean;
  onSubmit: () => Promise<void>;
}

export const Login = ({
  handleData,
  user,
  loading,
  isButtonDisabled,
  onSubmit,
  error,
}: Props): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToOnboarding = (): void => {
    navigate("/onboarding");
  };

  const renderForm = ():ReactElement => {
    return (
      <Form>
        <FormTitle>{t("login.form.title")}</FormTitle>
        <FormFieldRow>
          <FormField
            label={t("login.form.email.label")}
            name="email"
            value={user.email}
            onChange={handleData}
            placeholder={t("login.form.email.placeholder")}
            error={error.email}
          />
        </FormFieldRow>
        <FormFieldRow>
          <FormField
            label={t("login.form.password.label")}
            inputType={FormFieldTypes.password}
            name="password"
            value={user.password}
            onChange={handleData}
            placeholder={t("login.form.password.label")}
            error={error.password}
          />
        </FormFieldRow>
        <ForgotPassword>{t("login.form.forgotPassword")}</ForgotPassword>

        <ButtonRow>
          <Button
            label={t("login.form.button.submit")}
            onPress={async () => {
              await onSubmit();
            }}
            isDisabled={isButtonDisabled}
            hasFixWidth={false}
            backgroundColor="#f6ab67"
            pressedBackgroundColor="#f9c799"
          />

          <DividerRow>
            <Divider />
            <DividerText>{t("login.form.divider")}</DividerText>
            <Divider />
          </DividerRow>

          <Button
            label={t("login.form.button.onboarding")}
            onPress={goToOnboarding}
            hasFixWidth={false}
            backgroundColor="#FFBE98"
            pressedBackgroundColor="#FFD6BD"
          />
        </ButtonRow>
      </Form>
    );
  };

  const renderMessage = (): ReactElement => {
    return (
      <LeftWrapper>
        <Title>{t("login.title")}</Title>
        <Subtitle>{t("login.unit")}</Subtitle>
        <Message>
          {t("login.message.normal.first")}
          <strong>{t("login.message.bold.first")}</strong>
          {t("login.message.normal.second")}
          <strong>{t("login.message.bold.second")}</strong>
          {t("login.message.normal.third")}
          <strong>{t("login.message.bold.third")}</strong>
        </Message>
        <img src={logo} width={96} style={{ marginTop: 15 }} />
      </LeftWrapper>
    );
  };

  return (
    <Screen showHeader={false}>
      <Container>
        <Loading loading={loading} />
        <Animation>
          <Wrapper>
            {renderMessage()}
            {renderForm()}
          </Wrapper>
        </Animation>
      </Container>
    </Screen>
  );
};
