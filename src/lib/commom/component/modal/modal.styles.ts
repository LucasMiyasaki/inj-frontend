import styled, { keyframes } from "styled-components";
import { Button } from "../button/button";
import { ModalType } from "./types";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div<{ type: ModalType }>`
  width: ${(props) => {
    switch (props.type) {
      case ModalType.small:
        return "40%";
      case ModalType.medium:
        return "60%";
      case ModalType.large:
        return "80%";
    }
  }};
  padding: 32px;
  background-color: #f9faff;
  border-radius: 24px;
`;

export const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: #000000;
`;

export const Subtitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000000;
  text-align: center;
  margin: 36px auto;
`;

export const PrimaryButton = styled(Button).attrs({
  hasFixWidth: false,
  backgroundColor: "#D0D0D0",
  pressedBackgroundColor: "#D9D9D9",
})``;

export const SecondaryButton = styled(Button).attrs({
  hasFixWidth: false,
  backgroundColor: "#f6ab67",
  pressedBackgroundColor: "#f9c799",
})``;

export const ButtonWrapper = styled.div`
  margin-top: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Animation = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const Children = styled.div`
  max-height: calc(60vh - 50px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
