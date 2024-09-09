import { formatToCPF, formatToHiddenDigits } from "brazilian-values";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../../commom/component/button/button";
import { User } from "../../../../login/entities/user";
import { UpdateUser, UpdateUserErrors } from "../../../types";
import { PersonalDataForm } from "./form/form-data";
import {
  ButtonWrapper,
  Container,
  FormAnimation,
  InfoAnimation,
  InfoWrapper,
  Label,
  Value,
  Wrapper,
} from "./personal-data.styles";
import { formatToPhone } from "../../../../../utils/formatter/format-phone";

interface Props {
  currentUser: User | undefined;
  error: UpdateUserErrors;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleValidation: () => Promise<void>;
  user: UpdateUser;
  openDeleteDialog: () => void;
}

export const PersonalData = ({
  error,
  currentUser,
  handleData,
  handleValidation,
  user,

  openDeleteDialog,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const [editMode, setEditMode] = useState(false);

  const openEditMode = (): void => setEditMode(true);
  const closeEditMode = (): void => setEditMode(false);

  const renderUserData = (): ReactElement => {
    return (
      <>
        <InfoWrapper>
          <Label>{t("profile.personalData.info.name")}</Label>
          <Value>{currentUser?.name}</Value>
        </InfoWrapper>
        <InfoWrapper>
          <Label>{t("profile.personalData.info.email")}</Label>
          <Value>{currentUser?.email}</Value>
        </InfoWrapper>
        <InfoWrapper>
          <Label>{t("profile.personalData.info.document")}</Label>
          <Value>
            {formatToHiddenDigits(formatToCPF(String(currentUser?.document)), {
              range: [0, 8],
            })}
          </Value>
        </InfoWrapper>
        <InfoWrapper>
          <Label>{t("profile.personalData.info.phone")}</Label>
          <Value>{formatToPhone(String(currentUser?.phone))}</Value>
        </InfoWrapper>
      </>
    );
  };

  const renderButton = (): ReactElement => {
    return (
      <ButtonWrapper>
        <Button
          label={t("profile.personalData.button.change")}
          onPress={openEditMode}
          hasFixWidth={false}
          backgroundColor="#FFD6BD"
          pressedBackgroundColor="#f8ddcd"
        />
        <Button
          label={t("profile.personalData.button.delete")}
          onPress={openDeleteDialog}
          hasFixWidth={false}
          backgroundColor="#FF7575"
          pressedBackgroundColor="#FFB5B5"
        />
      </ButtonWrapper>
    );
  };

  const renderContent = (): ReactElement => {
    if (editMode) {
      return (
        <FormAnimation>
          <Wrapper>
            <PersonalDataForm
              error={error}
              user={user}
              currentUser={currentUser}
              handleData={handleData}
              handleValidation={handleValidation}
              closeEditMode={closeEditMode}
            />
          </Wrapper>
        </FormAnimation>
      );
    } else {
      return (
        <>
          <InfoAnimation>
            <Wrapper>
              {renderUserData()}
              {renderButton()}
            </Wrapper>
          </InfoAnimation>
        </>
      );
    }
  };

  return <Container>{renderContent()}</Container>;
};
