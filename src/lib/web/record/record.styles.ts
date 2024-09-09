import styled, { keyframes } from "styled-components";
import { DatePicker as BaseDatePicker } from "react-date-picker"

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const TabContainer = styled.div`
  width: 100%;
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Row = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 3%;
  margin-top: 3%;
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3%;
`;

export const Details = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f9faff;
  padding: 0% 2%;
  border-radius: 25px;
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

export const Label = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000000;
`;

export const Value = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999999;
  white-space: pre-wrap;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 25px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-top: 48px;
`;

export const FormAnimation = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const InfoAnimation = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const Image = styled.img`
  width: 100%;
  height: 412px;
  objectFit: cover;
  border-radius: 15px;
  maring-bottom: 25px;
`;

export const DatePicker = styled(BaseDatePicker)`
  .react-date-picker__wrapper {
    border: none;
    box-shadow: none;
  }
`

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