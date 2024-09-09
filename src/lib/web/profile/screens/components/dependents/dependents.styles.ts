import styled, { keyframes } from "styled-components";
import { PaymentStatusTypes } from "../../../../../services/types/subscription-types";

export const Container = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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

export const DependentsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
`;

export const DependentsContent = styled.button`
  border: none;
  width: calc(25% - 20px);
  padding: 16px;
  border-radius: 16px;
  background-color: #ffbe98;
  cursor: pointer;
`;

export const DependentsTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  text-align: start;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const DependentsTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DependentMode = styled.div`
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

export const TopDependentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const DependentsDescription = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999999;
  text-align: justify;
`;

export const Divider = styled.div`
  width: 50px;
  height: 0.3px;
  background-color: #000;
`;

export const DependentsDateAndTimeContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const DependentsDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const DependentsDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const DependentsDateLabel = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const AddDependent = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #8aff53;
  border-radius: 12px;
  padding: 8px 16px;
  border: none;
  gap: 8px;
  cursor: pointer;
`;

export const AddDependentLabel = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const DependentsNotFound = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
`;

export const DependentOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const DependentWrapperContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DependentsFilter = styled.div`
  height: 100%;
  flex: 1;
  padding: 32px 16px;
  background-color: #f9faff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  position: sticky;
  top: 0;
`;

export const DependentsFilterTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

export const ComplementaryInfoWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ComplementaryInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const ParentName = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #000;
`;

export const DependentName = styled.p`
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #666;
`;

export const ObservationValue = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999;
`;

export const CancelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const CancelInfo = styled.p`
  width: 60%;
  font-size: ${(props) => props.theme.fontSize.xxs};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  color: #999;
  text-align: end;
  margin-top: 16px;
`;

export const AlreadyRequestCancel = styled.p`
  width: 45%;
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  color: #ff5757;
  text-align: end;
`;
