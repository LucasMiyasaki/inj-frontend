import {
  BlockOutlined,
  CheckCircleOutline,
  RadioButtonUncheckedOutlined,
} from "@mui/icons-material";
import { isNil } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Client from "../../../../../../commom/client/client";
import { Button } from "../../../../../../commom/component/button/button";
import { Divider } from "../../../../../../commom/component/divider/divider";
import { Modal } from "../../../../../../commom/component/modal/modal";
import { ModalType } from "../../../../../../commom/component/modal/types";
import { setModalLoading } from "../../../../../../commom/redux/application-slice";
import ApplicationSubscriptionService from "../../../../../../services/application-subscription-service";
import {
  CancelRequestStatus,
  PaymentStatusTypes,
} from "../../../../../../services/types/subscription-types";
import { Event } from "../../../../types";
import {
  ButtonWrapper,
  CancelTitle,
  EventsInfoContainer,
  EventsInfoContent,
  EventsInfoDependents,
  EventsInfoNotFound,
  EventsInfoTitle,
  EventsInfoTopWrapper,
  PaymentMethodLabel,
  PaymentStatusLabel,
  PaymentStatusWrapper,
} from "./event-info.styles";
import { translatePaymentType } from "../../../../../../utils/translate-payment-type";

interface Props {
  showModal: boolean;
  event?: Event;
  closeModal: () => void;
}

export const EventInfo = ({
  showModal,
  event,
  closeModal,
}: Props): ReactElement => {
  const dispatch = useDispatch();
  const subscriptionService = new ApplicationSubscriptionService();
  const client = new Client();

  const [subscriptions, setSubscriptions] = useState([]);
  const [triggerRender, setTriggerRender] = useState(false);

  const clearSubscription = (): void => setSubscriptions([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleSubscriptions();
  }, [showModal, triggerRender]);

  const handleSubscriptions = async (): Promise<void> => {
    try {
      dispatch(setModalLoading(true));
      const subscriptions = await subscriptionService.getSubscriptionByEventId(
        client,
        Number(event?.id),
      );

      if (subscriptions) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setSubscriptions(subscriptions);
      }
    } catch (error) {
      dispatch(setModalLoading(false));
    } finally {
      dispatch(setModalLoading(false));
    }
  };

  const approveCancelSubscription = async (
    subscriptionId: number,
  ): Promise<void> => {
    try {
      dispatch(setModalLoading(true));
      await subscriptionService.approveCancelSubscription(
        client,
        subscriptionId,
      );
      setTriggerRender(!triggerRender);
    } catch (error) {
      dispatch(setModalLoading(false));
    } finally {
      dispatch(setModalLoading(false));
    }
  };

  const confirmPayment = async (subscriptionId: number): Promise<void> => {
    try {
      dispatch(setModalLoading(true));
      await subscriptionService.confirmPayment(client, subscriptionId);
      setTriggerRender(!triggerRender);
    } catch (error) {
      dispatch(setModalLoading(false));
    } finally {
      dispatch(setModalLoading(false));
    }
  };

  const rejectPayment = async (subscriptionId: number): Promise<void> => {
    try {
      dispatch(setModalLoading(true));
      await subscriptionService.rejectPayment(client, subscriptionId);
      setTriggerRender(!triggerRender);
    } catch (error) {
      dispatch(setModalLoading(false));
    } finally {
      dispatch(setModalLoading(false));
    }
  };

  const renderSubscriptions = (): ReactElement => {
    if (subscriptions.length !== 0) {
      return (
        <EventsInfoContainer>
          {subscriptions.map((subscription: any) => (
            <>
              {subscription.cancelRequestStatus !==
                CancelRequestStatus.APPROVED && (
                <EventsInfoContent key={subscription.id}>
                  <div>
                    <EventsInfoTopWrapper>
                      <EventsInfoTitle>
                        {subscription.user.name}
                      </EventsInfoTitle>
                      {renderPaymentStatus(subscription)}
                    </EventsInfoTopWrapper>
                    {renderDependents(subscription)}
                    <PaymentMethodLabel>
                      Método de pagamento:{" "}
                      {translatePaymentType(String(subscription.payment))}
                    </PaymentMethodLabel>
                  </div>
                  {renderSubscriptionStatus(subscription)}

                  {renderSubscriptionCancel(subscription)}
                </EventsInfoContent>
              )}
            </>
          ))}
        </EventsInfoContainer>
      );
    }

    return (
      <EventsInfoNotFound>Nenhuma inscrição encontrada</EventsInfoNotFound>
    );
  };

  const renderPaymentStatus = (subscription: any): ReactElement | undefined => {
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
  };

  const renderDependents = (subscription: any): ReactElement | undefined => {
    if (!isNil(subscription.dependent?.name)) {
      return (
        <EventsInfoDependents>
          Dependente: {subscription.dependent?.name}
        </EventsInfoDependents>
      );
    }
  };

  const renderSubscriptionStatus = (subscription: any): ReactElement => {
    if (subscription.status === PaymentStatusTypes.PENDING) {
      return (
        <ButtonWrapper>
          <Button
            label="Confirmar Inscrição"
            onPress={async () => await confirmPayment(Number(subscription.id))}
            backgroundColor="#03CE48"
            hasFixWidth={false}
          />
          <Button
            label="Bloquear Inscrição"
            onPress={async () => await rejectPayment(Number(subscription.id))}
            backgroundColor="#FF5757"
            hasFixWidth={false}
          />
        </ButtonWrapper>
      );
    }

    return <></>;
  };

  const renderSubscriptionCancel = (subscription: any): ReactElement => {
    if (subscription.cancelRequestStatus === CancelRequestStatus.PENDING) {
      return (
        <>
          <Divider />
          <CancelTitle>
            O usuário solicitou o cancelamento da inscrição
          </CancelTitle>
          <Button
            label="Cancelar Inscrição"
            onPress={async () =>
              await approveCancelSubscription(Number(subscription.id))
            }
            backgroundColor="#D0D0D0"
            hasFixWidth={false}
          />
        </>
      );
    }

    return <></>;
  };

  return (
    <Modal
      showModal={showModal}
      title={String(event?.name)}
      message={`Inscrições do Evento: ${event?.name}`}
      onPrimaryButtonPress={() => {
        closeModal();
        clearSubscription();
      }}
      primaryButtonLabel="Fechar"
      showPrimaryButton={true}
      type={ModalType.large}
    >
      {renderSubscriptions()}
    </Modal>
  );
};
