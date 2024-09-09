import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Client from "../../commom/client/client";
import { Loading } from "../../commom/component/loading/loading";
import { Modal } from "../../commom/component/modal/modal";
import { Radio } from "../../commom/component/radio/radio";
import { Screen } from "../../commom/component/screen/screen";
import { setLoading } from "../../commom/redux/application-slice";
import { ReduxState } from "../../redux/types";
import { AdvertiseBanner } from "../advertise/screens/advertise";
import { Event } from "../profile/types";
import { buildEvents } from "./components/events/build-events";
import { EventsHome } from "./components/events/events";
import ApplicationSubscriptionService from "../../services/application-subscription-service";
import { PaymentTypes } from "../../services/types/subscription-types";
import { Book } from "../../services/types/book-types";
import { BooksHome } from "./components/books/books";
import {
  BooksSectionContainer,
  BooksSectionDescription,
  BooksSectionTitle,
  BooksSectionWrapper,
  EventsSectionContainer,
  SelectFieldWrapper,
  StyledSlider,
} from "./homepage.styles";
import { Divider } from "../../commom/component/divider/divider";
import { Dependent } from "../../services/types/dependent-types";
import { SelectField } from "../../commom/component/select/select";

interface Props {
  events: Event[];
  books: Book[];
  dependents: Dependent[];
}

export const HomePage = ({
  events,
  books,
  dependents,
}: Props): ReactElement => {
  const eventsArray = buildEvents(events);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loading = useSelector(
    (state: ReduxState) => state.application.isLoading,
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: false,
  };

  const [event, setEvent] = useState<Event>();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentTypes>();
  const [dependentId, setDependentId] = useState<number | null>(null);
  const [okay, setOkay] = useState(false);
  const [showSecondaryButton, setShowSecondaryButton] = useState(true);
  const [primaryButtonLabel, setPrimaryButtonLabel] = useState("Confirmar");
  const [titleModal, setTitleModal] = useState(
    `Deseja se inscrever nesse evento?`,
  );
  const [messageModal, setMessageModal] = useState(
    `Selecione o tipo de pagamento que deseja fazer: `,
  );
  const onPrimaryButtonPress = async (): Promise<void> => {
    if (!okay) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      onSubmit();
    } else {
      setShowModal(false);
      navigate("/profile");
    }
  };

  const handleModal = (): void => {
    setOkay(true);
    setShowSecondaryButton(false);
    setPrimaryButtonLabel("Entendi");
    setTitleModal("Inscrição realizada com sucesso!");
    setMessageModal(
      "Você pode conferir sua inscrição na aba 'Eventos' do seu Perfil",
    );
  };

  const subscriptionService = new ApplicationSubscriptionService();
  const client = new Client();

  const renderEvents = (): ReactElement | undefined => {
    if (eventsArray.length > 1) {
      return (
        <Slider slidesPerRow={1} arrows={false} {...settings}>
          {eventsArray.map((event: any) => (
            <EventsHome
              key={event.id}
              img={event.image}
              event={event}
              handleEventPress={handleEventPress}
            />
          ))}
        </Slider>
      );
    }

    if (eventsArray.length === 1) {
      return (
        <EventsHome
          key={eventsArray[0].id}
          img={String(eventsArray[0].image)}
          event={eventsArray[0] as Event}
          handleEventPress={handleEventPress}
        />
      );
    }
  };

  const components = (): ReactElement => {
    return (
      <>
        {dependents.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  const handleEventPress = (event: Event): void => {
    setEvent(event);
    setShowModal(true);
  };

  const handlePaymentMethodChange = (method: PaymentTypes): void => {
    setPaymentMethod(method);
  };

  const onSubmit = async (): Promise<void> => {
    if (event && paymentMethod) {
      dispatch(setLoading(true));


      const request = {
        eventId: Number(event.id),
        payment: paymentMethod,
        dependentId: dependentId ?? null,
      };

      await subscriptionService
        .createSubscription(client, request)
        .then(() => {
          handleModal();
          dispatch(setLoading(false));
        })
        .catch(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const renderRadio = (): ReactElement | undefined => {
    if (!okay) {
      return (
        <>
          <Radio
            label="PIX"
            checked={paymentMethod === PaymentTypes.PIX}
            onSelect={() => {
              handlePaymentMethodChange(PaymentTypes.PIX);
            }}
          />
          <Radio
            label="Dinheiro"
            checked={paymentMethod === PaymentTypes.CASH}
            onSelect={() => {
              handlePaymentMethodChange(PaymentTypes.CASH);
            }}
          />
        </>
      );
    }
  };

  const renderSelectDependent = (): ReactElement | undefined => {
    if (!okay) {
      return (
        <SelectFieldWrapper>
          <SelectField
            label="Selecione o dependente"
            onChange={(value) => setDependentId(Number(value.target.value))}
            name="dependent"
            value={dependentId}
            components={components}
          />
        </SelectFieldWrapper>
      );
    }
  };

  const renderConfirmModal = (): ReactElement => {
    return (
      <Modal
        showModal={showModal}
        title={titleModal}
        message={messageModal}
        showPrimaryButton={true}
        primaryButtonLabel={primaryButtonLabel}
        onPrimaryButtonPress={onPrimaryButtonPress}
        showSecondaryButton={showSecondaryButton}
        secondaryButtonLabel="Voltar"
        onSecondaryButtonPress={() => {
          setShowModal(false);
        }}
      >
        <>
          {renderRadio()}
          {renderSelectDependent()}
        </>
      </Modal>
    );
  };

  const bookSettings = {
    dots: false,
    infinite: books.length > 1,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  const renderBooksSection = (): ReactElement => {
    return (
      <BooksSectionContainer>
        <BooksSectionWrapper>
          <BooksSectionTitle>Mural dos livros</BooksSectionTitle>
          <BooksSectionDescription>
            Desvende ensinamentos profundos e mergulhe em narrativas
            inspiradoras com nossa seleção de livros do mundo gospel. De
            reflexões espirituais a histórias de fé, descubra obras que irão
            fortalecer sua espiritualidade e transformar sua vida.
          </BooksSectionDescription>
          <Divider />
          {books.length > 0 ? (
            renderBooks()
          ) : (
            <BooksSectionTitle>
              Por enquanto não há livros cadastrados
            </BooksSectionTitle>
          )}
        </BooksSectionWrapper>
      </BooksSectionContainer>
    );
  };

  const renderBooks = (): ReactElement => {
    return (
      <>
        <StyledSlider {...bookSettings}>
          {books.map((book: any) => (
            <BooksHome key={book.id} book={book} />
          ))}
        </StyledSlider>
      </>
    );
  };

  return (
    <Screen showHeader={true}>
      <>
        {renderConfirmModal()}
        <Loading loading={loading} />
        {renderEvents()}
        <AdvertiseBanner />
        {renderBooksSection()}
      </>
    </Screen>
  );
};
