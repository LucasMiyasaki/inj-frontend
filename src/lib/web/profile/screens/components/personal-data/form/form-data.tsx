import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../../../commom/component/button/button";
import { FormField } from "../../../../../../commom/component/form-field/form-field";
import { formatToPhone } from "../../../../../../utils/formatter/format-phone";
import { User } from "../../../../../login/entities/user";
import { UpdateUser, UpdateUserErrors } from "../../../../types";
import { ButtonWrapper, FormFieldRow } from "./form-data.styles";

interface Props {
  currentUser: User | undefined;
  error: UpdateUserErrors;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleValidation: () => Promise<void>;
  closeEditMode: () => void;
  user: UpdateUser;
}

export const PersonalDataForm = ({
  error,
  currentUser,
  handleData,
  closeEditMode,
  handleValidation,
  user,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const renderForm = (): ReactElement => {
    return (
      <>
        <FormFieldRow>
          <FormField
            label={t("profile.personalData.info.name")}
            onChange={handleData}
            name="name"
            placeholder={currentUser?.name}
            error={error.name}
          />
        </FormFieldRow>
        <FormFieldRow>
          <FormField
            label={t("profile.personalData.info.email")}
            onChange={handleData}
            name="email"
            value={user.email}
            placeholder={currentUser?.email}
            error={error.email}
          />
          <FormField
            label={t("profile.personalData.info.phone")}
            onChange={handleData}
            name="phone"
            value={formatToPhone(user.phone)}
            placeholder={currentUser?.phone}
            error={error.phone}
            maxLenght={15}
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
          onPress={closeEditMode}
          hasFixWidth={false}
          backgroundColor="#FFD6BD"
          pressedBackgroundColor="#f8ddcd"
        />
        <Button
          label={t("profile.personalData.form.button.confirm")}
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
    <>
      {renderForm()}
      {renderButton()}
    </>
  );
};
