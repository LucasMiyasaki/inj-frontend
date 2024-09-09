import React, { ReactElement, useState } from "react";
import { Screen } from "../../../../../commom/component/screen/screen";
import {
  Container,
  Animation,
  Details,
  Title,
  TabContainer,
} from "./typeList.styles";
import {
  Expenditure,
  ExpenditureType,
  ExpenditureTypeErrors,
} from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { TypeEditForm } from "./edit-form/type-edit-form";
import { Button } from "../../../../../commom/component/button/button";
import {
  Table,
  Td,
  Th,
} from "../../../../../commom/component/table/table.style";
import { Modal } from "../../../../../commom/component/modal/modal";

interface Props {
  expenditureList: Expenditure[];
  expenditureType: ExpenditureType;
  expenditureTypeList: ExpenditureType[];
  editMode: boolean;
  showDeleteDialog: boolean;
  errorType: ExpenditureTypeErrors;
  openEditForm: (type: ExpenditureType) => void;
  closeEditForm: () => void;
  openDeleteDialog: (e: ExpenditureType) => void;
  closeDeleteDialog: () => void;
  onUpdateType: () => Promise<void>;
  handleDataType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => Promise<void>;
  handleTypeList: () => void;
}

export const TypeList = ({
  expenditureType,
  expenditureList,
  expenditureTypeList,
  editMode,
  showDeleteDialog,
  errorType,
  openEditForm,
  closeEditForm,
  openDeleteDialog,
  closeDeleteDialog,
  handleDataType,
  onDelete,
  onUpdateType,
  handleTypeList,
}: Props): ReactElement => {
  const [erroDelete, setErroDelete] = useState(false);

  const handleDelete = (item: ExpenditureType): void => {
    let isEqual = false;
    expenditureList.forEach((expenditure) => {
      if (expenditure.expenditureTypeId === item.id) {
        isEqual = true;
      }
    });

    if (!isEqual) openDeleteDialog(item);
    else setErroDelete(true);
  };

  const renderData = (): ReactElement => {
    return (
      <TabContainer>
        <Title>Tipos de despesa</Title>
        <div style={{ marginTop: "4%", marginBottom: "4%" }}>
          <Button
            onPress={() => {
              handleTypeList();
            }}
            label="Voltar"
            backgroundColor="#DDDD"
            hasFixWidth={true}
          />
        </div>
        <Table>
          <tr>
            <Th>Nome</Th>
            <Th>Ações</Th>
          </tr>
          <tbody>
            {expenditureTypeList.map((item) => (
              <tr key={item.name}>
                <Td>{item.name}</Td>
                <Td>
                  <button
                    style={{
                      padding: "8px 8px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#ffa500",
                    }}
                    onClick={() => {
                      openEditForm(item);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>{" "}
                  <button
                    style={{
                      padding: "8px 8px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#FF0000",
                    }}
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TabContainer>
    );
  };

  const renderContent = (): ReactElement => {
    return (
      <>
        {editMode ? (
          <TypeEditForm
            expenditureType={expenditureType}
            errorType={errorType}
            handleDataType={handleDataType}
            onUpdateType={onUpdateType}
            closeEditForm={closeEditForm}
          />
        ) : (
          <></>
        )}
        <Modal
          showModal={showDeleteDialog}
          title="Deletar tipo de despesa"
          message="Deseja realmente deletar o tipo de despesa?"
          showPrimaryButton={true}
          onPrimaryButtonPress={closeDeleteDialog}
          primaryButtonLabel="Voltar"
          showSecondaryButton={true}
          onSecondaryButtonPress={async () => {
            await onDelete();
          }}
          secondaryButtonLabel="Deletar"
        />
        <Modal
          showModal={erroDelete}
          title="Não é possível deletar"
          message="Existe despesa(s) cadastrada(s) com este tipo. Se deseja deletar, é necessário excluir a despesa vinculada ao tipo de despesa"
          showPrimaryButton={true}
          onPrimaryButtonPress={() => {
            setErroDelete(false);
          }}
          primaryButtonLabel="Voltar"
          showSecondaryButton={false}
          secondaryButtonLabel="Deletar"
        />

        <Container>
          <Animation>
            <Details>{renderData()}</Details>
          </Animation>
        </Container>
      </>
    );
  };

  return renderContent();
};
