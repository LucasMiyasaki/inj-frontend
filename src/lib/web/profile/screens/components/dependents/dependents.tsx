import { AddOutlined } from "@mui/icons-material";
import { noop } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Client from "../../../../../commom/client/client";
import { setLoading } from "../../../../../commom/redux/application-slice";
import ApplicationDependentsService from "../../../../../services/application-dependents-service";
import { Dependent } from "../../../../../services/types/dependent-types";
import { User } from "../../../../login/entities/user";
import {
  AddDependent,
  AddDependentLabel,
  Container,
  DependentsContent,
  DependentsDescription,
  DependentsNotFound,
  DependentsTitle,
  DependentsWrapper,
  FormAnimation,
  InfoAnimation,
  TopDependentWrapper,
  Wrapper,
} from "./dependents.styles";
import { DependentForm } from "./form/dependent-form";

export const Dependents = (): ReactElement => {
  const dispatch = useDispatch();

  const [createMode, setCreateMode] = useState(false);
  const [dependent, setDependent] = useState<Dependent>({
    name: "",
    observation: "",
  });
  const [dependents, setDependents] = useState<Dependent[]>([]);

  const openCreateMode = (): void => setCreateMode(true);
  const closeCreateMode = (): void => setCreateMode(false);

  const dependentService = new ApplicationDependentsService();
  const client = new Client();

  useEffect(() => {
    getDependents().catch(noop);
  }, []);

  const getDependents = async (): Promise<void> => {
    dispatch(setLoading(true));

    try {
      const dependents = await dependentService.getAllDependents(client);
      console.log(dependents);

      setDependents(dependents);
    } catch (error) {}

    dispatch(setLoading(false));
  };

  const onSubmit = async (): Promise<void> => {
    dispatch(setLoading(true));

    try {
      await dependentService.createDependent(client, dependent);
      closeCreateMode();
      getDependents().catch(noop);
    } catch (error) {}

    dispatch(setLoading(false));
  };

  const handleData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDependent({ ...dependent, [e.target.name]: e.target.value });
  };

  const renderDependents = (): ReactElement => {
    if (dependents && dependents.length !== 0) {
      return (
        <DependentsWrapper>
          {dependents.map((depedent: Dependent) => (
            <>{renderDependentContent(depedent)}</>
          ))}
        </DependentsWrapper>
      );
    }

    return (
      <DependentsNotFound>Nenhum dependente encontrado</DependentsNotFound>
    );
  };

  const renderDependentContent = (dependent?: Dependent): ReactElement => {
    return (
      <DependentsContent>
        <TopDependentWrapper>
          <DependentsTitle>{dependent?.name}</DependentsTitle>
        </TopDependentWrapper>
        <DependentsDescription>{dependent?.observation}</DependentsDescription>
      </DependentsContent>
    );
  };

  const renderAddDependentButton = (): ReactElement | undefined => {
    return (
      <AddDependent onClick={openCreateMode}>
        <AddOutlined />
        <AddDependentLabel>Adicionar dependente</AddDependentLabel>
      </AddDependent>
    );
  };

  const renderContent = (): ReactElement => {
    if (createMode) {
      return (
        <FormAnimation>
          <Wrapper>
            <DependentForm
              dependent={dependent}
              closeCreateMode={closeCreateMode}
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
              {renderAddDependentButton()}
              {renderDependents()}
            </Wrapper>
          </InfoAnimation>
        </>
      );
    }
  };

  return (
    <>
      <Container>{renderContent()}</Container>
    </>
  );
};
