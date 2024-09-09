import { AccessTimeOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import moment from "moment";
import React, { ReactElement } from "react";
import { Event } from "../../../profile/types";
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
  SubscribeButton,
  Wrapper,
} from "./events.styles";

interface Props {
  event: Event;
  img: string;
  handleEventPress: (event: Event) => void;
}

export const EventsHome = ({
  img,
  event,
  handleEventPress,
}: Props): ReactElement => {
  const renderContent = (): ReactElement => {
    return (
      <EventContent>
        <EventTitle>{event.name}</EventTitle>
        <EventDescription>{event.description}</EventDescription>
        <EventsDateWrapper>
          <EventsDate>
            <CalendarMonthOutlined />
            <EventsDateLabel>
              {moment.utc(event.startDate).format("DD/MM/YYYY")}
            </EventsDateLabel>
          </EventsDate>
          <Divider />
          <EventsDate>
            <CalendarMonthOutlined />
            <EventsDateLabel>
              {moment.utc(event.endDate).format("DD/MM/YYYY")}
            </EventsDateLabel>
          </EventsDate>
        </EventsDateWrapper>
        <EventsDateWrapper>
          <EventsDate>
            <AccessTimeOutlined />
            <EventsDateLabel>
              {moment.utc(event.startDate).format("HH:mm")}
            </EventsDateLabel>
          </EventsDate>
          <Divider />
          <EventsDate>
            <AccessTimeOutlined />
            <EventsDateLabel>
              {moment.utc(event.endDate).format("HH:mm")}
            </EventsDateLabel>
          </EventsDate>
        </EventsDateWrapper>
      </EventContent>
    );
  };

  return (
    <Container>
      <Wrapper>
        <BackgroundImage
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
        <EventWrapper>
          {renderContent()}
          <SubscribeButton
            label="Quero participar"
            onPress={() => handleEventPress(event)}
          />
        </EventWrapper>
      </Wrapper>
    </Container>
  );
};
