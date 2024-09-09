import React, { ReactElement, useState } from "react";
import {
  Details,
  Title,
  Label,
  TabContainer,
  Row,
  Container,
  Animation,
  Wrapper,
  InputContainer,
  DatePicker,
} from "./expenditure.style";
import {
  Expenditure,
  ExpenditureErrors,
  ExpenditureType,
  ExpenditureTypeErrors,
} from "../types/types";
import { Table, Th, Td } from "../../../commom/component/table/table.style";
import { ExpenditureEditForm } from "./components/edit-form/expenditure-edit-form";
import { Modal } from "../../../commom/component/modal/modal";
import { format, parseISO } from "date-fns";
import { Button } from "../../../commom/component/button/button";
import { ExpenditureForm } from "./components/form/expenditure-form.container";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { ErrorText } from "./components/form-field/form-field.styles";

interface Props {
  expenditure: Expenditure;
  expenditureType: ExpenditureType;
  expenditureList: Expenditure[];
  expenditureTypeList: ExpenditureType[];
  editMode: boolean;
  showDeleteDialog: boolean;
  showDescription: boolean;
  error: ExpenditureErrors;
  errorType: ExpenditureTypeErrors;
  openEditMode: (expend: Expenditure, type: ExpenditureType) => void;
  closeEditMode: () => void;
  openDeleteDialog: (e: Expenditure) => void;
  openDescription: (e: Expenditure) => void;
  closeDescription: () => void;
  closeDeleteDialog: () => void;
  onUpdate: () => Promise<void>;
  onSubmitType: () => Promise<void>;
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDataType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadio: () => void;
  handleTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDelete: () => Promise<void>;
  handlePaymode: () => void;
  openPaymode: (expend: Expenditure, expendType: ExpenditureType) => void;
  closePaymode: () => void;
  payMode: boolean;
  handlePayEdit: () => Promise<void>;
  openPayEdit: (expend: Expenditure, expendType: ExpenditureType) => void;
  fetchExpenditures: () => Promise<void>;
  fetchExpendituresTypes: () => Promise<void>;
  date: Date | null;
  handleDueDate: (e: Value) => void;
  handlePayedDate: (e: Value) => void;
  typeForm: boolean;
  handleTypeForm: () => void;
}

export const ExpenditureList = ({
  expenditure,
  expenditureType,
  expenditureList,
  expenditureTypeList,
  editMode,
  showDeleteDialog,
  error,
  errorType,
  openEditMode,
  closeEditMode,
  openDeleteDialog,
  closeDeleteDialog,
  openDescription,
  closeDescription,
  showDescription,
  onUpdate,
  onSubmitType,
  handleData,
  handleDataType,
  handleRadio,
  handleTextArea,
  handleSelect,
  onDelete,
  handlePaymode,
  openPaymode,
  closePaymode,
  payMode,
  handlePayEdit,
  openPayEdit,
  fetchExpenditures,
  date,
  handleDueDate,
  handlePayedDate,
  fetchExpendituresTypes,
  handleTypeForm,
  typeForm,
}: Props): ReactElement => {
  const [showForm, setShowForm] = useState(false);

  const handleForm = (): void => {
    setShowForm(!showForm);
  };

  const [payEdit, setPayEdit] = useState(false);

  const formatDate = (date: string): string => {
    if (date.length > 0) {
      const dateObject: Date = parseISO(date);
      const newDate = new Date(
        dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000,
      );
      const formatedDate: string = format(newDate, "dd/MM/yyyy");

      return formatedDate;
    }

    return date;
  };

  const sortedExpenditureList = expenditureList.slice().sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA.getTime() - dateB.getTime();
  });

  const renderData = (): ReactElement => {
    return (
      <TabContainer>
        {showForm ? (
          <ExpenditureForm
            fetchExpenditures={fetchExpenditures}
            fetchExpendituresTypes={fetchExpendituresTypes}
            handleForm={handleForm}
            expenditureTypeList={expenditureTypeList}
          />
        ) : (
          <></>
        )}
        <Title>Despesas</Title>
        <div style={{ marginTop: "4%" }}>
          <Button
            onPress={handleForm}
            label="Nova Despesa"
            backgroundColor="#f6ab67"
            pressedBackgroundColor="#f9c799"
            hasFixWidth={true}
          />
        </div>

        <>
          <div style={{ marginTop: "3%" }}>
            <Table>
              <tr>
                <Th>Tipo</Th>
                <Th>Valor</Th>
                <Th>Parcelas</Th>
                <Th>Juros</Th>
                <Th>Vencimento</Th>
                <Th>Pago</Th>
                <Th>Ações</Th>
              </tr>
              <tbody>
                {sortedExpenditureList.map((item, index) => (
                  <tr key={index}>
                    <Td>
                      {
                        expenditureTypeList.find(
                          (type) => type.id === item.expenditureTypeId,
                        )?.name
                      }
                    </Td>
                    <Td>{"R$" + item.value}</Td>
                    <Td>{item.parcels ?? "-"}</Td>
                    <Td>{item.fee ? item.fee + "%" : "-"}</Td>
                    <Td>
                      {item.dueDate ? formatDate(String(item.dueDate)) : "-"}
                    </Td>
                    <Td>
                      {item.payedDate ? (
                        <button
                          style={{
                            padding: "8px 8px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#33B864",
                          }}
                          onClick={() => {
                            setPayEdit(true);
                            const type = expenditureTypeList.find(
                              (type) => type.id === item.expenditureTypeId,
                            );
                            if (type != null) openPayEdit(item, type);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-check-lg"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          style={{
                            padding: "8px 8px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#DDDDDD",
                          }}
                          onClick={() => {
                            const type = expenditureTypeList.find(
                              (type) => type.id === item.expenditureTypeId,
                            );
                            if (type != null) openPaymode(item, type);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-clock-history"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </button>
                      )}
                    </Td>
                    <Td>
                      {!item.payedDate ? (
                        <>
                          <button
                            style={{
                              padding: "8px 8px",
                              borderRadius: "8px",
                              border: "none",
                              backgroundColor: "#ffa500",
                            }}
                            onClick={() => {
                              const type = expenditureTypeList.find(
                                (type) => type.id === item.expenditureTypeId,
                              );
                              if (type != null) openEditMode(item, type);
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
                              openDeleteDialog(item);
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
                          </button>{" "}
                        </>
                      ) : (
                        <></>
                      )}
                      {item.description ? (
                        <button
                          style={{
                            padding: "8px 8px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#DDDDDD",
                          }}
                          onClick={() => {
                            openDescription(item);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-three-dots"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                          </svg>
                        </button>
                      ) : (
                        <></>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      </TabContainer>
    );
  };

  const renderContent = (): ReactElement => {
    return (
      <>
        <Modal
          showModal={showDeleteDialog}
          title="Deletar Despesa"
          message="Deseja realmente deletar a despesa?"
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
          showModal={showDescription}
          title="Descrição"
          message={
            expenditure.description
              ? String(expenditure.description)
              : "Nenhuma descrição"
          }
          showPrimaryButton={true}
          onPrimaryButtonPress={closeDescription}
          primaryButtonLabel="Voltar"
          showSecondaryButton={false}
        />
        <Modal
          showModal={payMode}
          title="Marcar como pago"
          message={""}
          showPrimaryButton={true}
          onPrimaryButtonPress={closePaymode}
          primaryButtonLabel="Voltar"
          showSecondaryButton={true}
          onSecondaryButtonPress={handlePaymode}
          secondaryButtonLabel="Registrar"
        >
          <Wrapper>
            <Label>Data</Label>
            <InputContainer>
              <DatePicker
                value={date}
                onChange={handlePayedDate}
                clearIcon=""
                format="dd/MM/yyyy"
              />
            </InputContainer>
            <ErrorText>{error.payedDate}</ErrorText>
          </Wrapper>
        </Modal>
        <Modal
          showModal={payEdit}
          title="Desmarcar como pago?"
          message={""}
          showPrimaryButton={true}
          onPrimaryButtonPress={() => {
            setPayEdit(false);
          }}
          primaryButtonLabel="Voltar"
          showSecondaryButton={true}
          secondaryButtonLabel="Desmarcar"
          onSecondaryButtonPress={async () => {
            await handlePayEdit();
            setPayEdit(false);
          }}
        />
        {editMode ? (
          <ExpenditureEditForm
            expenditure={expenditure}
            expenditureType={expenditureType}
            expenditureTypeList={expenditureTypeList}
            error={error}
            errorType={errorType}
            handleData={handleData}
            handleRadio={handleRadio}
            handleDataType={handleDataType}
            handleSelect={handleSelect}
            handleTextArea={handleTextArea}
            onUpdate={onUpdate}
            onSubmitType={onSubmitType}
            closeEditMode={closeEditMode}
            date={date}
            handleDate={handleDueDate}
            typeForm={typeForm}
            handleTypeForm={handleTypeForm}
          />
        ) : (
          <></>
        )}
        <Details>{renderData()}</Details>
      </>
    );
  };

  return renderContent();
};
