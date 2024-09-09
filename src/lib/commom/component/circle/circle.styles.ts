import styled from "styled-components";

export const Wrapper = styled.div<{
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
}>`
  width: ${(props) => props.width ?? "48px"};
  height: ${(props) => props.height ?? "48px"};
  border-radius: ${(props) => props.borderRadius ?? "24px"};

  background-color: ${(props) => props.backgroundColor ?? "#f9faff"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p<{ labelColor?: string }>`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.labelColor ?? "#000000"};
`;
