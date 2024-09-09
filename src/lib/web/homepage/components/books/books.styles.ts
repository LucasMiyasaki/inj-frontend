import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 8px;
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
  border: none;
  border-radius: 16px;
  background-color: #f9faff;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

export const BookContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

export const BooksWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const BooksContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 16px 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background-color: #f9faff;
`;

export const TruncateLines = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BookInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-left: 16px;
`;

export const BooksNotFound = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.extraBold};
`;

export const BooksTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`;

export const BooksLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const BooksAuthor = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999999;
`;

export const BooksLabel = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #666;
`;

export const BooksPublisher = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999;
`;

export const BooksYear = styled.p`
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #999;
`;

export const BooksTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BooksFilter = styled.div`
  height: 100%;
  flex: 1;
  padding: 32px 16px;
  background-color: #f9faff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  position: sticky;
  top: 0;
`;

export const BooksFilterTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #000;
  margin: 16px auto;
`;

export const FilterButtonWrapper = styled.div`
  margin-top: 32px;
`;

export const AddBook = styled.button`
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

export const AddBookLabel = styled.p`
  font-size: ${(props) => props.theme.fontSize.l};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const TopBookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
`;
