import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  gap: 5%;
`;

export const LeftWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: #000000;
`;

export const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000000;
`;

export const Message = styled.p`
  width: 80%;
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000000;
  margin: 5% 0;
`;

export const Form = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 25px;
  padding: 32px;
  background-color: #f9faff;
`;

export const FormTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
  color: #000000;
`;

export const ForgotPassword = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  color: #000000;
`;

export const FormFieldRow = styled.div`
  width: 100%;
  margin: 2% auto 0;
`;

export const ButtonRow = styled.div`
  width: 100%;
  margin: 10% auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DividerRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5%;
  margin: 6% auto;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #ffa56f;
  flex: 1;
`;

export const DividerText = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.regular};
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
