import styled, { keyframes } from "styled-components";
import { UserStatus } from "../../../../../services/types/user-types";

export const Container = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
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

export const InfoAnimation = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

export const UsersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const UsersContent = styled.div`
  width: calc(33.33% - 20px);
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 16px;
  background-color: #ffbe98;
  margin-bottom: 20px;
  margin-right: 20px;
`;

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const UsersNotFound = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
`;

export const UsersTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const UsersLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const UsersPhone = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999999;
`;

export const UsersLabel = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #666;
`;

export const UsersEmail = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999;
`;

export const UsersDocument = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999;
`;

export const UserStatusLabel = styled.p<{ status: UserStatus }>`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) =>
    props.status === UserStatus.ACTIVE
      ? "#03CE48"
      : props.status === UserStatus.PENDING
        ? "#CE9503"
        : "#FF5757"};
`;

export const UserStatusTitle = styled.p<{ status: UserStatus }>`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) =>
    props.status === UserStatus.ACTIVE
      ? "#03CE48"
      : props.status === UserStatus.PENDING
        ? "#CE9503"
        : "#FF5757"};
  margin-bottom: 24px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
