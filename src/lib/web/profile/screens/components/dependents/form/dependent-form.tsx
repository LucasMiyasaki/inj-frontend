import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../../../commom/component/button/button";
import { FormField } from "../../../../../../commom/component/form-field/form-field";
import { Dependent } from "../../../../../../services/types/dependent-types";
import { ButtonWrapper, FormFieldRow } from "./dependent-form.styles";

interface Props {
  dependent: Dependent;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
  closeCreateMode: () => void;
}

export const DependentForm = ({
  dependent,
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
            label={"Nome"}
            onChange={handleData}
            name="name"
            value={dependent.name}
            placeholder={"Digite o nome do dependente"}
          />
        </FormFieldRow>
        <FormFieldRow>
          <FormField
            label={"Observação"}
            onChange={handleData}
            name="observation"
            value={dependent.observation}
            placeholder={
              "Indique alguma observação sobre o dependente (opcional)"
            }
          />
        </FormFieldRow>
      </>
    );
  };

  const renderButton = (): ReactElement => {
    return (
      <ButtonWrapper>
        <Button
          label={"Voltar"}
          onPress={closeCreateMode}
          hasFixWidth={false}
          backgroundColor="#FFD6BD"
          pressedBackgroundColor="#f8ddcd"
        />
        <Button
          label={"Confirmar"}
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
