import styled from "styled-components";
import { Button } from "../../../../commom/component/button/button";

export const Container = styled.div`
  width: 95%;
  height: 75vh;
  margin: 0 auto;
  border-radius: 25px;
  background-color: #e1e1e1;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  position: relative;
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.45;
`;

export const EventWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 64px;
  position: relative;
  z-index: 1;
`;

export const EventContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const EventTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  margin-bottom: 16px;
`;

export const EventDescription = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  width: 80%;
`;

export const Divider = styled.div`
  width: 50px;
  height: 0.3px;
  background-color: #000;
`;

export const EventsDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
`;

export const EventsDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const EventsDateLabel = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const SubscribeButton = styled(Button).attrs({
  backgroundColor: "#F6AB67",
  pressedBackgroundColor: "#f9c799",
  hasFixWidth: true,
})``;
