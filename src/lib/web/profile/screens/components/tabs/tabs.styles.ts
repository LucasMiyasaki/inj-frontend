import { Logout as BaseLogout } from "@mui/icons-material";
import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5%;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  gap: 5%;
  position: relative;
`;

export const TabLabel = styled.p<{ isSelected?: boolean }>`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => (props.isSelected ? "#f6ab67" : "#000000")};
  cursor: pointer;
  position: relative;
`;

export const TabWrapper = styled.div<{
  isSelected?: boolean;
  direction?: boolean;
}>`
  position: relative;
  z-index: 1;
  padding: 0 16px 24px;
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: ${(props) => (props.isSelected ? 0 : "100%")};
    width: 100%;
    height: 6px;
    border-radius: 25px;
    background-color: ${(props) => (props.isSelected ? "#f6ab67" : "")};
    transform: ${(props) =>
      props.isSelected
        ? "translateX(0)"
        : props.direction
          ? "translateX(-100%)"
          : "translateX(100%)"};
    transition: transform 0.3s ease-out;
  }
`;

export const Logout = styled(BaseLogout).attrs({
  sx: {
    color: "#ea5757",
  },
})`
  cursor: pointer;
`;
