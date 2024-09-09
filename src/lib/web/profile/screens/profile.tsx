import React, { ChangeEvent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Loading } from "../../../commom/component/loading/loading";
import { Modal } from "../../../commom/component/modal/modal";
import { Screen } from "../../../commom/component/screen/screen";
import { autoSingleStyle } from "../../../utils/auto-single-styles";
import { User } from "../../login/entities/user";
import { UpdateUser, UpdateUserErrors } from "../types";
import { Events } from "./components/events/events";
import { PersonalData } from "./components/personal-data/personal-data";
import {
  Container,
  MessageBold,
  MessageNormal,
  SettingsWrapper,
  Wrapper,
  Tabs,
} from "./profile.styles";
import { Books } from "./components/books/books";
import { Users } from "./components/user/user";
import { Dependents } from "./components/dependents/dependents";
import { AdvertaiseListScreen } from "../../advertise/screens/components/advertise-list/advertise-list.container";
import { ExpenditureListScreen } from "../../expenditure/screens/expenditure.container";
import { IncomeListScreen } from "../../income/screens/income.container";
import { RecordScreen } from "../../record/record.container";

interface Props {
  handleTabClick: (value: number) => void;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
  handleValidationToUpdate: () => Promise<void>;
  onDeleteUser: () => Promise<void>;
  showDeleteDialog: boolean;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
  currentUser: User | undefined;
  activeTab: number;
  error: UpdateUserErrors;
  user: UpdateUser;
  isLoading: boolean;
  handleLogout: () => Promise<void>;
  next: boolean;
  handleNext: () => void;
}

export const Profile = ({
  currentUser,
  error,
  user,
  activeTab,
  handleTabClick,
  handleValidationToUpdate,
  handleData,
  isLoading,
  closeDeleteDialog,
  onDeleteUser,
  openDeleteDialog,
  showDeleteDialog,
  handleLogout,
  next,
  handleNext,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const renderSettings = (): ReactElement | undefined => {
    if (next) {
      if (activeTab === 1) {
        return <AdvertaiseListScreen />;
      } else if (activeTab === 2) {
        return <ExpenditureListScreen />;
      } else if (activeTab === 3) {
        return <IncomeListScreen />;
      } else {
        return <RecordScreen />;
      }
    } else {
      if (activeTab === 1) {
        return (
          <PersonalData
            handleValidation={handleValidationToUpdate}
            handleData={handleData}
            currentUser={currentUser}
            error={error}
            user={user}
            openDeleteDialog={openDeleteDialog}
          />
        );
      } else if (activeTab === 3) {
        return (
          <Events
            isAdmin={currentUser?.type === "ADMIN"}
            currentUser={currentUser}
          />
        );
      } else if (activeTab === 4) {
        return <Users isAdmin={currentUser?.type === "ADMIN"} />;
      } else if (activeTab === 5) {
        return <Books isAdmin={currentUser?.type === "ADMIN"} />;
      } else if (activeTab === 6) {
        return <Dependents />;
      }
    }

    return <></>;
  };

  return (
    <Screen showHeader={true}>
      <>
        <Modal
          showModal={showDeleteDialog}
          title={t("profile.personalData.delete.title")}
          message={autoSingleStyle(
            t("profile.personalData.delete.message"),
            "*",
            MessageNormal,
            MessageBold,
          )}
          showPrimaryButton={true}
          onPrimaryButtonPress={closeDeleteDialog}
          primaryButtonLabel={t("profile.personalData.delete.button.back")}
          showSecondaryButton={true}
          onSecondaryButtonPress={async () => {
            await onDeleteUser();
          }}
          secondaryButtonLabel={t("profile.personalData.delete.button.delete")}
        />
        <Loading loading={isLoading} />
        <Container>
          <Wrapper>
            <Tabs
              isAdmin={currentUser?.type === "ADMIN"}
              logout={handleLogout}
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              next={next}
              handleNext={handleNext}
            />
            <SettingsWrapper>{renderSettings()}</SettingsWrapper>
          </Wrapper>
        </Container>
      </>
    </Screen>
  );
};
