import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 10%;
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

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3%;
  margin-top: 4%;
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

  margin-top: 4%;
`;

export const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  color: #000000;
`;

export const WelcomeContainer = styled.div`
  margin: 25px auto;
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

export const FirstPart = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const SecondPart = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;
