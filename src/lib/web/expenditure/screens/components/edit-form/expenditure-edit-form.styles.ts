import styled, { keyframes } from "styled-components";
import { DatePicker as BaseDatePicker } from "react-date-picker";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;

export const Wrapper = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3%;
  margin-top: 4%;
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3%;
`;

export const Form = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f9faff;
  padding: 2%;
  border-radius: 25px;
  overflow: hidden;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 3%;
  margin-top: 7%;
`;

export const Title = styled.p`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: #000000;
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
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  border: 0.8px solid;
`;

export const DatePicker = styled(BaseDatePicker)`
  .react-date-picker__wrapper {
    border: none;
    box-shadow: none;
  }
`