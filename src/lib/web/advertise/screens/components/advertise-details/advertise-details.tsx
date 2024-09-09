import React, { ReactElement } from "react";
import { Advertise } from "../../../types/types";
import { Screen } from "../../../../../commom/component/screen/screen";
import {
  Container,
  Animation,
  Details,
  Label,
  Value,
  InfoWrapper,
  Image,
} from "./advertise-details.style";
import { useTranslation } from "react-i18next";

interface Props {
  advertise: Advertise;
}

export const AdvertiseDetails = ({ advertise }: Props): ReactElement => {
  const { t } = useTranslation();

  const renderAdvertiseData = (): ReactElement => {
    return (
      <>
        <InfoWrapper>
          <Image
            src={"http://localhost:3344/images/advertise/" + advertise.url}
            alt={advertise.name}
          />
        </InfoWrapper>

        <InfoWrapper>
          <Label>{advertise.name}</Label>
        </InfoWrapper>

        <InfoWrapper>
          <Value>{advertise.description}</Value>
        </InfoWrapper>

        <InfoWrapper>
          <Label>{t("advertise.form.startDate.label")}</Label>
          <Value>{advertise.startDate}</Value>
        </InfoWrapper>

        <InfoWrapper>
          <Label>{t("advertise.form.endDate.label")}</Label>
          <Value>{advertise.endDate}</Value>
        </InfoWrapper>
      </>
    );
  };

  const renderContent = (): ReactElement => {
    return (
      <Screen showHeader={true}>
        <>
          <Container>
            <Animation>
              <Details>{renderAdvertiseData()}</Details>
            </Animation>
          </Container>
        </>
      </Screen>
    );
  };

  return renderContent();
};
