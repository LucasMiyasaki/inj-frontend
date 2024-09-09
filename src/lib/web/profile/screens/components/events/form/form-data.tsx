import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../../../commom/component/button/button";
import { FormField } from "../../../../../../commom/component/form-field/form-field";
import { FormFieldTypes } from "../../../../../../commom/component/form-field/types";
import { TextArea } from "../../../../../../commom/component/text-area/text-area";
import { Event, EventErrors } from "../../../../types";
import { ButtonWrapper, FormFieldRow } from "./form-data.styles";

interface Props {
  error: EventErrors;
  event: Event;
  handleData: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => Promise<void>;
  closeCreateMode: () => void;
}

export const EventsForm = ({
  event,
  error,
  handleData,
  onSubmit,
  closeCreateMode,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const renderForm = (): ReactElement => {
    return (
      <>
        <FormFieldRow>
          <FormField
            label={t("profile.events.info.name.label")}
            onChange={handleData}
            name="name"
            value={event.name}
            placeholder={t("profile.events.info.name.placeholder")}
            error={error.name}
          />
          <FormField
            label={t("profile.events.info.capacity.label")}
            onChange={handleData}
            name="capacity"
            value={event.capacity}
            placeholder={t("profile.events.info.capacity.placeholder")}
            error={error.capacity}
          />
        </FormFieldRow>
        <TextArea
          label={t("profile.events.info.description.label")}
          onChange={handleData}
          maxLenght={664}
          name="description"
          value={event.description}
          placeholder={t("profile.events.info.description.placeholder")}
          error={error.description}
        />
        <FormFieldRow>
          <FormField
            label={t("profile.events.info.startDate.label")}
            inputType={FormFieldTypes.datetime}
            onChange={handleData}
            name="startDate"
            value={event.startDate}
            placeholder={t("profile.events.info.startDate.placeholder")}
            error={error.startDate}
          />
          <FormField
            label={t("profile.events.info.endDate.label")}
            inputType={FormFieldTypes.datetime}
            onChange={handleData}
            name="endDate"
            value={event.endDate}
            placeholder={t("profile.events.info.endDate.placeholder")}
            error={error.endDate}
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
