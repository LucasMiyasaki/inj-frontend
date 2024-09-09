import { formatToCPF } from "brazilian-values";
import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../commom/component/button/button";
import { FormField } from "../../../commom/component/form-field/form-field";
import { ProgressBar } from "../../../commom/component/progress-bar/progress-bar";
import { Screen } from "../../../commom/component/screen/screen";
import { formatToPhone } from "../../../utils/formatter/format-phone";
import { User, UserErrors } from "../types";
import {
  ButtonRow,
  Container,
  FirstPart,
  Form,
  Row,
  SecondPart,
  Subtitle,
  Title,
  WelcomeContainer,
  Wrapper,
} from "./onboarding.styles";
import { Loading } from "../../../commom/component/loading/loading";
import { FormFieldTypes } from "../../../commom/component/form-field/types";

interface Props {
  error: UserErrors;
  user: User;
  handleValidation: () => Promise<void>;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSection: (value: number) => void;
  section: number;
  steps: Array<{ label: string; selected: boolean }>;
  handleNavigate: () => void;
  isLoading: boolean;
}

export const Onboarding = ({
  error,
  handleData,
  handleSection,
  handleValidation,
  section,
  user,
  steps,
  isLoading,
  handleNavigate,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const renderFirstPart = (): ReactElement => {
    return (
      <FirstPart>
        <Row>
          <FormField
            label={t("onboarding.form.email.label")}
            placeholder={t("onboarding.form.email.placeholder")}
            value={user.email}
            name="email"
            onChange={handleData}
            error={error.email}
          />
        </Row>

        <Row>
          <FormField
            label={t("onboarding.form.document.label")}
            placeholder={t("onboarding.form.document.placeholder")}
            value={formatToCPF(String(user.document))}
            name="document"
            onChange={handleData}
            maxLenght={14}
            error={error.document}
          />
          <FormField
            label={t("onboarding.form.phone.label")}
            placeholder={t("onboarding.form.phone.placeholder")}
            value={formatToPhone(String(user.phone))}
            name="phone"
            onChange={handleData}
            maxLenght={15}
            error={error.phone}
          />
        </Row>
      </FirstPart>
    );
  };

  const renderSecondPart = (): ReactElement => {
    return (
      <SecondPart>
        <Row>
          <FormField
            label={t("onboarding.form.name.label")}
            placeholder={t("onboarding.form.name.placeholder")}
            value={user.name}
            name="name"
            onChange={handleData}
            error={error.name}
          />
        </Row>

        <Row>
          <FormField
            label={t("onboarding.form.password.label")}
            placeholder={t("onboarding.form.password.placeholder")}
            value={user.password}
            inputType={FormFieldTypes.password}
            name="password"
            onChange={handleData}
            error={error.password}
          />
          <FormField
            label={t("onboarding.form.confirmPassword.label")}
            placeholder={t("onboarding.form.confirmPassword.placeholder")}
            value={user.confirmPassword}
            inputType={FormFieldTypes.password}
            name="confirmPassword"
            onChange={handleData}
            error={error.confirmPassword}
          />
        </Row>
      </SecondPart>
    );
  };

  const renderDataForm = (): ReactElement | undefined => {
    if (section === 0) {
      return <>{renderFirstPart()}</>;
    } else if (section === 1) {
      return <>{renderSecondPart()}</>;
    }
  };

  const renderText = (): ReactElement => {
    if (section === 2) {
      return (
        <>
          <FirstPart>
            <Title>
              {t("onboarding.welcome.title", { name: user.name.split(" ")[0] })}
            </Title>
            <WelcomeContainer>
              <Subtitle>{t("onboarding.welcome.created")}</Subtitle>
            </WelcomeContainer>
            <WelcomeContainer>
              <Subtitle>{t("onboarding.welcome.subtitle")}</Subtitle>
            </WelcomeContainer>
          </FirstPart>
        </>
      );
    } else {
      return (
        <>
          <SecondPart>
            <Title>{t("onboarding.title")}</Title>
            <Subtitle>{t("onboarding.subtitle")}</Subtitle>
          </SecondPart>
        </>
      );
    }
  };

  const renderButton = (): ReactElement => {
    return (
      <ButtonRow>
        {section === 2 ? (
          <>
            <Button
              backgroundColor="#FFBE98"
              pressedBackgroundColor="#FFD6BD"
              hasFixWidth={false}
              label={t("onboarding.button.start")}
              onPress={handleNavigate}
            />
          </>
        ) : (
          <>
            <Button
              backgroundColor="#D0D0D0"
              pressedBackgroundColor="#D9D9D9"
              hasFixWidth={false}
              label={t("onboarding.button.back")}
              onPress={() => {
                handleSection(-1);
              }}
            />
            <Button
              backgroundColor="#FFBE98"
              pressedBackgroundColor="#FFD6BD"
              hasFixWidth={false}
              label={t("onboarding.button.next")}
              onPress={async () => {
                await handleValidation();
              }}
            />
          </>
        )}
      </ButtonRow>
    );
  };

  return (
    <Screen showHeader={false}>
      <>
        <Loading loading={isLoading} />
        <Container>
          <Wrapper>
            <Form>
              <ProgressBar
                steps={steps}
                selectedBackground="#F5AE9E"
                notSelectedBackground="#FFE4DE"
                size={32}
              />
              {renderText()}
              {renderDataForm()}
              {renderButton()}
            </Form>
          </Wrapper>
        </Container>
      </>
    </Screen>
  );
};
