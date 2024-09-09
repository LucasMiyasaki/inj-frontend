import React, { ReactElement } from "react";
import {
  ErrorText,
  Select,
  InputContainer,
  Label,
  Wrapper,
} from "./select.styles";

interface Props {
  label: string;
  value?: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  error?: string;
  isDisabled?: boolean;
  components: () => ReactElement;
}

export const SelectField = ({
  label,
  onChange,
  value,
  name,
  error,
  components,
  isDisabled = false,
}: Props): ReactElement => {

  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputContainer>
        <Select
          onChange={onChange}
          value={value}
          name={name}
          disabled={isDisabled}
        >
          <option value={0}>-- Selecione uma opção --</option>
            {components()}
        </Select>
      </InputContainer>

      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};
