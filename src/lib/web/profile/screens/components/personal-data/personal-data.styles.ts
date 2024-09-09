import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
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

export const FormAnimation = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const InfoAnimation = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;
