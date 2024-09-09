import styled from "styled-components";

export const Container = styled.div`
  background-color: transparent;
  padding: 2% 5%;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f9faff;
  border-radius: 25px;
  padding: 1% 3%;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  gap: 30%;
`;

export const LeftWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
`;

export const Text = styled.p`
  color: #000000;
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const Link = styled.a`
  text-transform: none;
  text-decoration: none;
`;

export const NameWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const Name = styled.p`
  color: #000000;
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  max-lines: 1;
`;
