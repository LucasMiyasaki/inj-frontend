import React, { ReactElement } from "react";
import { Container, Text, Wrapper } from "./button.styles";

interface Props {
  onPress: () => void;
  label: string;
  labelColor?: string;
  backgroundColor?: string;
  pressedBackgroundColor?: string;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  hasFixWidth?: boolean;
  isDisabled?: boolean
}

export const Button = ({
  onPress,
  labelColor,
  backgroundColor,
  pressedBackgroundColor,
  label,
  hasFixWidth = true,
  isDisabled
}: Props): ReactElement => {
  return (
    <Container
      hasFixWidth={hasFixWidth}
      backgroundColor={backgroundColor}
      pressedBackgroundColor={pressedBackgroundColor}
      onClick={onPress}
      disabled={isDisabled}
    >
      <Wrapper>
        <Text isDisabled={isDisabled} labelColor={labelColor}>{label}</Text>
      </Wrapper>
    </Container>
  );
};
