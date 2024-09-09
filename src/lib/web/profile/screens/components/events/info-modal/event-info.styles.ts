import styled from "styled-components";
import { PaymentStatusTypes } from "../../../../../../services/types/subscription-types";

export const EventsInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const EventsInfoContent = styled.div`
  border: none;
  width: calc(50% - 20px);
  padding: 16px;
  border-radius: 16px;
  background-color: #ffbe98;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const EventsInfoTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #000;
`;

export const EventsInfoNotFound = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #000;
`;

export const EventsInfoDependents = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #666;
`;

export const EventsInfoTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EventInfoMode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const Mode = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const PaymentStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const PaymentStatusLabel = styled.p<{ status: PaymentStatusTypes }>`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) =>
    props.status === PaymentStatusTypes.ACCEPTED
      ? "#03CE48"
      : props.status === PaymentStatusTypes.PENDING
        ? "#CE9503"
        : "#FF5757"};
`;

export const PaymentMethodLabel = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000;
  margin-top: 12px;
`;

export const TopEventWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

export const CancelTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #000;
  margin-bottom: 24px;
`;
