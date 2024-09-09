import React, {
  ReactElement,
  forwardRef,
  Ref,
  HTMLProps,
  ForwardedRef,
} from "react";
import {
  BackgroundImage,
  Container,
  Divider,
  EventContent,
  EventDescription,
  EventTitle,
  EventWrapper,
  EventsDate,
  EventsDateLabel,
  EventsDateWrapper,
  Wrapper,
} from "./event-print.styles";
import { CalendarMonthOutlined, AccessTimeOutlined } from "@mui/icons-material";
import moment from "moment";
import { Event } from "../../../../types";

interface Props extends HTMLProps<HTMLDivElement> {
  event?: Event;
}

// eslint-disable-next-line react/display-name
export const EventToPrint = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
    const { event, style } = props;

    console.log(event);

    const renderContent = (): ReactElement => {
      return (
        <EventContent>
          <EventTitle>{event?.name}</EventTitle>
          <EventDescription>{event?.description}</EventDescription>
          <EventsDateWrapper>
            <EventsDate>
              <CalendarMonthOutlined />
              <EventsDateLabel>
                {moment.utc(event?.startDate).format("DD/MM/YYYY")}
              </EventsDateLabel>
            </EventsDate>
            <Divider />
            <EventsDate>
              <CalendarMonthOutlined />
              <EventsDateLabel>
                {moment.utc(event?.endDate).format("DD/MM/YYYY")}
              </EventsDateLabel>
            </EventsDate>
          </EventsDateWrapper>
          <EventsDateWrapper>
            <EventsDate>
              <AccessTimeOutlined />
              <EventsDateLabel>
                {moment.utc(event?.startDate).format("HH:mm")}
              </EventsDateLabel>
            </EventsDate>
            <Divider />
            <EventsDate>
              <AccessTimeOutlined />
              <EventsDateLabel>
                {moment.utc(event?.endDate).format("HH:mm")}
              </EventsDateLabel>
            </EventsDate>
          </EventsDateWrapper>
        </EventContent>
      );
    };

    return (
      <Container
        style={{
          zIndex: -1000,
          visibility: "hidden",
          display: "none",
        }}
      >
        <Wrapper ref={ref}>
          <BackgroundImage></BackgroundImage>
          <EventWrapper>{renderContent()}</EventWrapper>
        </Wrapper>
      </Container>
    );
  },
);
