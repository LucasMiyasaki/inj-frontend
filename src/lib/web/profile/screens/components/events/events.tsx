import {
  AccessTimeOutlined,
  AddCircleOutline,
  BlockOutlined,
  CalendarMonthOutlined,
  CheckCircleOutline,
  DeleteOutline,
  ModeEditOutline,
  PrintOutlined,
  RadioButtonUncheckedOutlined,
} from "@mui/icons-material";
import moment from "moment";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { ValidationError } from "yup";
import Client from "../../../../../commom/client/client";
import { Button } from "../../../../../commom/component/button/button";
import { Divider } from "../../../../../commom/component/divider/divider";
import { setLoading } from "../../../../../commom/redux/application-slice";
import ApplicationEventService from "../../../../../services/application-events-service";
import ApplicationSubscriptionService from "../../../../../services/application-subscription-service";
import {
  PaymentStatusTypes,
  Subscription,
} from "../../../../../services/types/subscription-types";
import { User } from "../../../../login/entities/user";
import { Event, EventErrors } from "../../../types";
import {
  AddEvent,
  AddEventLabel,
  AlreadyRequestCancel,
  CancelInfo,
  CancelWrapper,
  ComplementaryInfo,
  ComplementaryInfoWrapper,
  Container,
  DependentName,
  Divider as DividerEvents,
  EventMode,
  EventOptions,
  EventsContent,
  EventsDate,
  EventsDateAndTimeContent,
  EventsDateLabel,
  EventsDateWrapper,
  EventsDescription,
  EventsNotFound,
  EventsTitle,
  EventsTopWrapper,
  EventsWrapper,
  FormAnimation,
  InfoAnimation,
  Mode,
  ObservationValue,
  ParentName,
  PaymentStatusLabel,
  PaymentStatusWrapper,
  TopEventWrapper,
  Wrapper,
} from "./events.styles";
import { EventsForm } from "./form/form-data";
import { createEventValidation } from "./form/form-schema";
import { EventInfo } from "./info-modal/event-info";
import { EventToPrint } from "./print/event-print";
import { isNil } from "lodash";

interface Props {
  currentUser: User | undefined;
  isAdmin: boolean;
}

export const Events = ({ currentUser, isAdmin }: Props): ReactElement => {
  const dispatch = useDispatch();
  const printComponentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const [createMode, setCreateMode] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [events, setEvents] = useState([]);
  const [printEvents, setPrintEvents] = useState<Event>();
  const [event, setEvent] = useState<Event>({
    name: "",
    description: "",
    capacity: "",
    startDate: undefined,
    endDate: undefined,
  });
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [error, setError] = useState<EventErrors>({
    name: "",
    description: "",
    capacity: "",
    startDate: "",
    endDate: "",
  });

  const openCreateMode = (): void => setCreateMode(true);
  const closeCreateMode = (): void => setCreateMode(false);
  const openSubscriptionModal = (event?: Event): void => {
    setSelectedEvent(event);
    setShowSubscriptionModal(true);
  };
  const closeSubscriptionModal = (): void => setShowSubscriptionModal(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises

    if (currentUser?.type === "ADMIN") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getEvents();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getSubscriptions();
    }
  }, []);

  useEffect(() => {
    if (printEvents) {
      handlePrint();
    }
  }, [printEvents]);

  const handlePrintEvent = (event: Event): void => {
    console.log("Evento para impressão:", event);
    setPrintEvents(event);
  };
  const eventService = new ApplicationEventService();
  const subscriptionService = new ApplicationSubscriptionService();
  const client = new Client();

  const getEvents = async (): Promise<void> => {
    dispatch(setLoading(true));
    await eventService.getEvents(client).then((data) => {
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setEvents(data.data);
      dispatch(setLoading(false));
    });
  };

  const getSubscriptions = async (): Promise<void> => {
    dispatch(setLoading(true));
    await subscriptionService.getSubscriptions(client).then((data) => {
      // @ts-expect-error
      setSubscriptions(data);
      dispatch(setLoading(false));
    });
  };

  const createEvent = async (): Promise<void> => {
    await eventService.createEvent(client, event).then(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getEvents();
    });
  };

  const requestCancel = async (subscriptionId: number): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await subscriptionService.requestCancelSubscription(
        client,
        subscriptionId,
      );
      await getSubscriptions().then(() => {
        dispatch(setLoading(false));
      });
    } catch (e) {
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(true));
    }
  };

  const onSubmit = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await createEventValidation
        .validate(event, { abortEarly: false })
        .then(async () => {
          await createEvent();
          dispatch(setLoading(false));
          closeCreateMode();
        });
    } catch (err) {
      const error = err as ValidationError;

      error.inner.map((e): void => {
        return handleErrors(e);
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setError({ ...error, [e.target.name]: undefined });
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const renderEvents = (): ReactElement => {
    if (events.length !== 0) {
      return (
        <EventsWrapper>
          {events.map((event: Event) => (
            <>{renderEventContent(event)}</>
          ))}
        </EventsWrapper>
      );
    }

    if (subscriptions.length !== 0) {
      return (
        <EventsWrapper>
          {subscriptions.map((subscription: Subscription) => (
            <>{renderSubscriptionContent(subscription)}</>
          ))}
        </EventsWrapper>
      );
    }

    return (
      <EventsNotFound>
        {isAdmin ? "Nenhum evento encontrado" : "Nenhuma inscrição encontrada"}
      </EventsNotFound>
    );
  };

  const renderSubscriptionModal = (): ReactElement => {
    return (
      <EventInfo
        closeModal={closeSubscriptionModal}
        event={selectedEvent}
        showModal={showSubscriptionModal}
      />
    );
  };

  const renderPaymentStatus = (
    subscription: Subscription | undefined,
  ): ReactElement | undefined => {
    if (currentUser?.type !== "ADMIN") {
      return (
        <>
          <PaymentStatusWrapper>
            {subscription?.status === PaymentStatusTypes.ACCEPTED ? (
              <CheckCircleOutline
                sx={{
                  color: "#03CE48",
                }}
              />
            ) : subscription?.status === PaymentStatusTypes.PENDING ? (
              <RadioButtonUncheckedOutlined
                sx={{
                  color: "#CE9503",
                }}
              />
            ) : (
              <BlockOutlined
                sx={{
                  color: "#FF5757",
                }}
              />
            )}
            <PaymentStatusLabel
              status={subscription?.status as PaymentStatusTypes}
            >
              {subscription?.status === PaymentStatusTypes.ACCEPTED
                ? "Pago"
                : subscription?.status === PaymentStatusTypes.PENDING
                  ? "Pendente"
                  : "Bloqueado"}
            </PaymentStatusLabel>
          </PaymentStatusWrapper>
        </>
      );
    }
  };

  const renderAdminOptions = (): ReactElement => {
    return (
      <EventMode>
        <Mode></Mode>
        <Mode></Mode>
      </EventMode>
    );
  };

  const renderEventContent = (event?: Event): ReactElement => {
    return (
      <EventsContent onClick={() => openSubscriptionModal(event)}>
        <TopEventWrapper>
          <EventsTopWrapper>
            <EventsTitle>{event?.name}</EventsTitle>
            {isAdmin && renderAdminOptions()}
          </EventsTopWrapper>
        </TopEventWrapper>
        <EventsDescription>{event?.description}</EventsDescription>
        {renderDateAndTime(event)}
      </EventsContent>
    );
  };

  const renderSubscriptionContent = (
    subscription?: Subscription,
  ): ReactElement => {
    return (
      <>
        <EventsContent>
          <TopEventWrapper>
            <EventsTopWrapper>
              <EventsTitle>{subscription?.event?.name}</EventsTitle>
              {isAdmin && renderAdminOptions()}
            </EventsTopWrapper>
            <EventOptions>
              <PrintOutlined
                onClick={() => handlePrintEvent(subscription?.event as Event)}
              />
              {renderPaymentStatus(subscription)}
            </EventOptions>
          </TopEventWrapper>
          <EventsDescription>
            {subscription?.event?.description}
          </EventsDescription>
          {renderDateAndTime(subscription?.event)}
          {renderComplementaryInfo(subscription)}
        </EventsContent>
      </>
    );
  };

  const renderDateAndTime = (event?: Event): ReactElement => {
    return (
      <EventsDateAndTimeContent>
        <EventsDateWrapper>
          <EventsDate>
            <CalendarMonthOutlined />
            <EventsDateLabel>
              {String(moment.utc(event?.startDate).format("DD/MM/YYYY"))}
            </EventsDateLabel>
          </EventsDate>
          <DividerEvents />
          <EventsDate>
            <CalendarMonthOutlined />
            <EventsDateLabel>
              {String(moment.utc(event?.endDate).format("DD/MM/YYYY"))}
            </EventsDateLabel>
          </EventsDate>
        </EventsDateWrapper>
        <EventsDateWrapper>
          <EventsDate>
            <AccessTimeOutlined />
            <EventsDateLabel>
              {String(moment.utc(event?.startDate).format("HH:mm"))}
            </EventsDateLabel>
          </EventsDate>
          <DividerEvents />
          <EventsDate>
            <AccessTimeOutlined />
            <EventsDateLabel>
              {String(moment.utc(event?.endDate).format("HH:mm"))}
            </EventsDateLabel>
          </EventsDate>
        </EventsDateWrapper>
      </EventsDateAndTimeContent>
    );
  };

  const renderComplementaryInfo = (
    subscription?: Subscription,
  ): ReactElement => {
    return (
      <>
        <Divider />
        <ComplementaryInfoWrapper>
          {subscription?.dependent ? (
            <>
              <ComplementaryInfo>
                <ParentName>Responsável: {currentUser?.name}</ParentName>
                <DependentName>
                  Dependente: {subscription?.dependent?.name}
                </DependentName>
                <ObservationValue>
                  {subscription?.dependent?.observation}
                </ObservationValue>
              </ComplementaryInfo>
            </>
          ) : (
            <div></div>
          )}
          <CancelWrapper>
            {!subscription?.cancelRequest ? (
              <>
                <Button
                  label="Cancelar inscrição"
                  onPress={async () =>
                    await requestCancel(Number(subscription?.id))
                  }
                  backgroundColor="#D0D0D0"
                />
                <CancelInfo>
                  * Ao cancelar sua inscrição, sua requisição será avaliada por
                  um superior
                </CancelInfo>
              </>
            ) : (
              <>
                <AlreadyRequestCancel>
                  * Sua solicitação de cancelamento já foi enviada e está em
                  análise, por favor aguarde algum tempo até que um
                  administrador possa avaliar sua solicitação de cancelamento de
                  inscrição no evento {subscription?.event?.name}
                </AlreadyRequestCancel>
              </>
            )}
          </CancelWrapper>
        </ComplementaryInfoWrapper>
      </>
    );
  };

  const renderAddEventButton = (): ReactElement | undefined => {
    if (currentUser?.type === "ADMIN") {
      return (
        <AddEvent onClick={openCreateMode}>
          <AddCircleOutline />
          <AddEventLabel>Adicionar evento</AddEventLabel>
        </AddEvent>
      );
    }
  };

  const renderContent = (): ReactElement => {
    if (createMode) {
      return (
        <FormAnimation>
          <Wrapper>
            <EventsForm
              event={event}
              closeCreateMode={closeCreateMode}
              error={error}
              handleData={handleData}
              onSubmit={onSubmit}
            />
          </Wrapper>
        </FormAnimation>
      );
    } else {
      return (
        <>
          <InfoAnimation>
            <Wrapper>
              {renderAddEventButton()}
              {renderEvents()}
            </Wrapper>
          </InfoAnimation>
        </>
      );
    }
  };

  return (
    <>
      <Container>
        {renderSubscriptionModal()}
        {renderContent()}
      </Container>
      {!isNil(printEvents) && (
        <EventToPrint event={printEvents} ref={printComponentRef} />
      )}
    </>
  );
};
