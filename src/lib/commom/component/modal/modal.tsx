import React, { ReactElement } from "react";
import {
  ButtonWrapper,
  Container,
  PrimaryButton,
  SecondaryButton,
  Subtitle,
  Title,
  Wrapper,
  Animation,
  Children,
} from "./modal.styles";
import { noop } from "lodash";
import { Loading } from "../loading/loading";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/types";
import { ModalType } from "./types";

interface Props {
  showModal: boolean;
  title: string;
  message: string | ReactElement;
  showPrimaryButton: boolean;
  primaryButtonLabel: string;
  onPrimaryButtonPress: () => void;
  showSecondaryButton?: boolean;
  secondaryButtonLabel?: string;
  onSecondaryButtonPress?: () => void;
  children?: ReactElement;
  type?: ModalType;
}

export const Modal = ({
  showModal,
  title,
  message,
  onPrimaryButtonPress,
  onSecondaryButtonPress = noop,
  primaryButtonLabel,
  secondaryButtonLabel = "",
  showPrimaryButton,
  showSecondaryButton,
  children,
  type = ModalType.small,
}: Props): ReactElement => {
  const loading = useSelector(
    (state: ReduxState) => state.application.isModalLoading,
  );

  if (!showModal) {
    return <></>;
  }

  return (
    <Container>
      <Loading loading={loading} />
      <Animation>
        <Wrapper type={type}>
          <Title>{title}</Title>
          <Subtitle>{message}</Subtitle>
          <Children>{children}</Children>
          <ButtonWrapper>
            {showPrimaryButton && (
              <PrimaryButton
                label={primaryButtonLabel}
                onPress={onPrimaryButtonPress}
              />
            )}
            {showSecondaryButton && (
              <SecondaryButton
                label={secondaryButtonLabel}
                onPress={onSecondaryButtonPress}
              />
            )}
          </ButtonWrapper>
        </Wrapper>
      </Animation>
    </Container>
  );
};
