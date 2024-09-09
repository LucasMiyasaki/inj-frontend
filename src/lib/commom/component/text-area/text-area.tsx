import React, { ReactElement } from "react";
import {
  ErrorText,
  Input,
  InputContainer,
  Label,
  Wrapper,
} from "./text-area.styles";

interface Props {
  label: string;
  placeholder?: string;
  value?: any;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLenght?: number;
  name?: string;
  inputType?: string;
  error?: string;
}

export const TextArea = ({
  maxLenght,
  label,
  onChange,
  placeholder,
  value,
  name,
  error,
}: Props): ReactElement => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputContainer>
        <Input
          maxLength={maxLenght}
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
        />
      </InputContainer>

      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};
