import Slider from "react-slick";
import styled from "styled-components";
import { SelectField as BaseSelectField } from "../../commom/component/select/select";

export const StyledSlider = styled(Slider).attrs({
  vertical: false,
})`
  margin-top: 16px;
`;

export const EventsSectionContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 32px auto 64px;
`;

export const BooksSectionContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 32px auto;
  margin-bottom: 64px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f9faff;
  border-radius: 0 0 16px;
`;

export const BooksSectionWrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

export const BooksSectionTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

export const BooksSectionDescription = styled.p`
  width: 75%;
  font-size: ${(props) => props.theme.fontSize.m};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: #666;
  text-align: justify;
`;

export const SelectFieldWrapper = styled.div`
  margin-top: 18px;
`;
