import {
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
} from "@mui/icons-material";
import { RadioContainer, RadioLabel } from "./radio.styles";
import React, { ReactElement } from "react";

interface Props {
  label: string;
  checked: boolean;
  onSelect: () => void;
}

export const Radio = ({ checked, label, onSelect }: Props): ReactElement => (
  <RadioContainer onClick={onSelect}>
    {checked ? (
      <RadioButtonCheckedOutlined />
    ) : (
      <RadioButtonUncheckedOutlined />
    )}
    <RadioLabel>{label}</RadioLabel>
  </RadioContainer>
);
