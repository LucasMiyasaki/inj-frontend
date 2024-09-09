import { isEmpty, noop } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Client from "../../../../../commom/client/client";
import { setLoading } from "../../../../../commom/redux/application-slice";
import ApplicationUserService from "../../../../../services/application-user-service";
import { User, UserStatus } from "../../../../../services/types/user-types";
import {
  Container,
  InfoAnimation,
  UserContainer,
  UserInfo,
  UsersContent,
  UsersDocument,
  UsersEmail,
  UsersLabel,
  UsersLabelWrapper,
  UsersPhone,
  UsersNotFound,
  UsersTitle,
  UsersWrapper,
  Row,
  UserStatusLabel,
  ButtonWrapper,
  UserStatusTitle,
  Column,
} from "./user.styles";
import { formatToPhone } from "../../../../../utils/formatter/format-phone";
import {
  AccountCircleOutlined,
  BlockOutlined,
  CheckCircleOutline,
  RadioButtonUncheckedOutlined,
} from "@mui/icons-material";
import { Divider } from "../../../../../commom/component/divider/divider";
import { Button } from "../../../../../commom/component/button/button";

interface Props {
  isAdmin: boolean;
}

export const Users = ({ isAdmin }: Props): ReactElement => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState<User[] | undefined>([]);

  const usersService = new ApplicationUserService();
  const client = new Client();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUsers();

    console.log(users);
  }, []);

  const pendingUsers = users?.filter(
    (user) => user.status === UserStatus.PENDING,
  );

  const activeUsers = users?.filter(
    (user) => user.status === UserStatus.ACTIVE,
  );

  const blockedUsers = users?.filter(
    (user) => user.status === UserStatus.BLOCKED,
  );

  const approveUser = async (id: number): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await usersService.approveUser(client, id).then(async () => {
        dispatch(setLoading(false));

        await getUsers();
      });
    } catch (error) {
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const blockUser = async (id: number): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await usersService.blockUser(client, id).then(async () => {
        dispatch(setLoading(false));

        await getUsers();
      });
    } catch (error) {
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getUsers = async (): Promise<void> => {
    dispatch(setLoading(true));
    await usersService
      .getAllUsers(client)
      .then(async (data) => {
        dispatch(setLoading(false));
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setUsers(data?.data);
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const renderUsers = (): ReactElement => {
    return (
      <>
        <Column>
          <UserStatusTitle status={UserStatus.PENDING}>
            Pendentes
          </UserStatusTitle>
          <UsersWrapper>
            {pendingUsers?.map((user) => renderUserContent(user))}
          </UsersWrapper>
          <Divider />

          <UserStatusTitle status={UserStatus.ACTIVE}>Ativos</UserStatusTitle>
          <UsersWrapper>
            {activeUsers?.map((user) => renderUserContent(user))}
          </UsersWrapper>
          <Divider />
          <UserStatusTitle status={UserStatus.BLOCKED}>
            Bloqueados
          </UserStatusTitle>
          <UsersWrapper>
            {blockedUsers?.map((user) => renderUserContent(user))}
          </UsersWrapper>
        </Column>
      </>
    );
  };

  const renderUserStatus = (user: User): ReactElement => {
    return (
      <>
        <UsersLabelWrapper>
          {user?.status === UserStatus.ACTIVE ? (
            <CheckCircleOutline
              sx={{
                color: "#03CE48",
              }}
            />
          ) : user?.status === UserStatus.PENDING ? (
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
          <UserStatusLabel status={user?.status as UserStatus}>
            {user?.status === UserStatus.ACTIVE
              ? "Ativo"
              : user?.status === UserStatus.PENDING
                ? "Pendente"
                : "Bloqueado"}
          </UserStatusLabel>
        </UsersLabelWrapper>
      </>
    );
  };

  const renderUserContent = (user: User): ReactElement => {
    if (!isEmpty(user)) {
      return (
        <>
          <UsersContent key={user.id}>
            <UserInfo>
              <Row>
                <UsersLabelWrapper>
                  <AccountCircleOutlined />
                  <UsersTitle>{user.name}</UsersTitle>
                </UsersLabelWrapper>
                {renderUserStatus(user)}
              </Row>

              <UsersLabelWrapper>
                <UsersLabel>Telefone:</UsersLabel>
                <UsersPhone>{formatToPhone(user?.phone)}</UsersPhone>
              </UsersLabelWrapper>

              <UsersLabelWrapper>
                <UsersLabel>E-mail:</UsersLabel>
                <UsersEmail>{user.email}</UsersEmail>
              </UsersLabelWrapper>

              <UsersLabelWrapper>
                <UsersLabel>Documento:</UsersLabel>
                <UsersDocument>{user.document}</UsersDocument>
              </UsersLabelWrapper>
            </UserInfo>
            <Divider />
            {renderOptions(user)}
          </UsersContent>
        </>
      );
    }

    return <UsersNotFound>Nenhum usuário encontrado</UsersNotFound>;
  };

  const renderOptions = (user: User): ReactElement => {
    return (
      <>
        {user.status === UserStatus.PENDING ? (
          <>
            <ButtonWrapper>
              <Button
                label="Aprovar"
                onPress={async () => await approveUser(Number(user.id))}
                backgroundColor="#03CE48"
                hasFixWidth={false}
              />
              <Button
                label="Bloquear"
                onPress={async () => await blockUser(Number(user.id))}
                backgroundColor="#FF5757"
                hasFixWidth={false}
              />
            </ButtonWrapper>
          </>
        ) : user.status === UserStatus.ACTIVE ? (
          <>
            <ButtonWrapper>
              <Button
                label="Bloquear"
                onPress={async () => await blockUser(Number(user.id))}
                backgroundColor="#FF5757"
                hasFixWidth={false}
              />
            </ButtonWrapper>
          </>
        ) : (
          <>
            <ButtonWrapper>
              <Button
                label="Desbloquear"
                onPress={async () => await approveUser(Number(user.id))}
                backgroundColor="#03CE48"
                hasFixWidth={false}
              />
            </ButtonWrapper>
          </>
        )}
      </>
    );
  };

  const renderContent = (): ReactElement => {
    return (
      <InfoAnimation>
        <UserContainer>{renderUsers()}</UserContainer>
      </InfoAnimation>
    );
  };

  return <Container>{renderContent()}</Container>;
};
