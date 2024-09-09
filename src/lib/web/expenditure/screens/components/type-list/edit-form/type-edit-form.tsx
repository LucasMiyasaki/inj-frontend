import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Form,
  Row,
  Title,
  Animation,
  ButtonRow,
} from "./type-edit-form.styles";
import { ExpenditureType, ExpenditureTypeErrors } from "../../../../types/types";
import { Screen } from "../../../../../../commom/component/screen/screen";
import { FormField } from "../../../../../../commom/component/form-field/form-field";
import { Button } from "../../../../../../commom/component/button/button";

interface Props {
  expenditureType: ExpenditureType;
  errorType: ExpenditureTypeErrors;
  handleDataType: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdateType: () => Promise<void>;
  closeEditForm: () => void;
}

export const TypeEditForm = ({
  errorType,
  expenditureType,
  handleDataType,
  onUpdateType,
  closeEditForm
}: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Screen showHeader={false}>
      <Container>
        <Animation>
          <Form>
            <Title>{"Alterar tipo de despesa"}</Title>
            <Row>
              <FormField
                label={t("expenditureType.form.name.label")}
                value={expenditureType.name}
                name="name"
                onChange={handleDataType}
                error={errorType.name}
              />
            </Row>

            <ButtonRow>
              <Button
                backgroundColor="#D0D0D0"
                pressedBackgroundColor="#D9D9D9"
                hasFixWidth={false}
                label={"Voltar"}
                onPress={closeEditForm}
              />
              <Button
                label={"Alterar"}
                onPress={async () => {
                  await onUpdateType();
                }}
                hasFixWidth={false}
                backgroundColor="#f6ab67"
                pressedBackgroundColor="#f9c799"
              />
            </ButtonRow>
          </Form>
        </Animation>
      </Container>
    </Screen>
  );
};
