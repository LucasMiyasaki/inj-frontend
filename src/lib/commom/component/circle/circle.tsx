import React, { ReactElement } from "react";
import { Text, Wrapper } from "./circle.styles";

interface Props {
  label: string;
  labelColor?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Circle = ({
  label,
  backgroundColor,
  height,
  labelColor,
  width,
  borderRadius,
}: Props): ReactElement => {
  return (
    <Wrapper
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
    >
      <Text labelColor={labelColor}>{label}</Text>
    </Wrapper>
  );
};
