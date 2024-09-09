import { isNil } from "lodash";
import { Circle } from "../circle/circle";
import { Divider, Wrapper } from "./progress-bar.styles";
import React, { ReactElement } from "react";

interface Props {
  steps: StepsType[];
  selectedBackground?: string;
  notSelectedBackground?: string;
  size?: number;
}

interface StepsType {
  label: string;
  selected: boolean;
}

export const ProgressBar = ({
  steps,
  notSelectedBackground,
  selectedBackground,
  size,
}: Props): ReactElement => {
  return (
    <Wrapper>
      {steps.map((item, index) => (
        <>
          <Circle
            width={!isNil(size) ? `${size}px` : undefined}
            height={!isNil(size) ? `${size}px` : undefined}
            borderRadius={!isNil(size) ? `${size / 2}px` : undefined}
            label={item.label}
            backgroundColor={
              item.selected ? selectedBackground : notSelectedBackground
            }
          />
          {index !== steps.length - 1 && <Divider />}
        </>
      ))}
    </Wrapper>
  );
};
