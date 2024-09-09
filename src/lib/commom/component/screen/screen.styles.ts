import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Wrapper = styled.div`
  width: 100%;
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
`;
