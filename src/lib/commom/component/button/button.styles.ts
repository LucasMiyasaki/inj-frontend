import styled from "styled-components";
export const Container = styled.button<{
  backgroundColor?: string;
  pressedBackgroundColor?: string;
  hasFixWidth?: boolean;
}>`
  ${(props) => (props.hasFixWidth === true ? "" : `width: 100%;`)}
  background-color: ${(props) =>
    props.disabled === true ? "#d0d0d0" : props.backgroundColor ?? "#f9fffa"};
  border-radius: 15px;
  border: none;
  box-shadow: 1px 2px rgba(0, 0, 0, 0.1);

  :hover {
    cursor: ${(props) => (props.disabled === true ? "auto" : "pointer")};
  }

  :active {
    background-color: ${(props) =>
      props.disabled === true
        ? "#d0d0d0"
        : props.pressedBackgroundColor ?? "#f9fffa"};
    border-radius: 15px;
    border: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 64px;
`;

export const Text = styled.p<{ labelColor?: string, isDisabled?: boolean }>`
  color: ${(props) => (props.isDisabled === true) ? "8d8d8d" : props.labelColor ?? "#000000"};
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  margin: 0 auto;
`;
