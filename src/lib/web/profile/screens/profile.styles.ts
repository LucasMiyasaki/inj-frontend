import styled from "styled-components";
import { Tabs as BaseTabs } from "./components/tabs/tabs";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  width: 95%;
  max-height: 70vh;
  background-color: #f9faff;
  border-radius: 24px;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
`;

export const SettingsWrapper = styled.div`
  width: 100%;
  margin-top: 48px;
  max-height: calc(100vh - 50px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageNormal = styled.div`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000000;
`;

export const MessageBold = styled.div`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #000000;
`;

export const Tabs = styled(BaseTabs)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;
