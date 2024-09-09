import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;
  background-color: transparent;
  overflow: auto;
  outline: none;
`;

export const Label = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000000;
`;

export const ErrorText = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #e0242f;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  border: 0.8px solid;
`;

export const ShowPassword = styled.button`
  background-color: transparent;
  border: none;
`;
