import React, { ReactElement } from "react";
import { Details, Title, TabContainer } from "./income.styles";
import { Income, IncomeErrors } from "../types/types";
import { Table, Th, Td } from "../../../commom/component/table/table.style";
import { IncomeEditForm } from "./components/edit-form/income-edit-form";
import { Modal } from "../../../commom/component/modal/modal";
import { format, parseISO } from "date-fns";
import { Button } from "../../../commom/component/button/button";
import { IncomeForm } from "./components/form/income-form.container";
import { Value } from "react-date-picker/dist/cjs/shared/types";

interface Props {
  income: Income;
  incomeList: Income[];
  editMode: boolean;
  showDeleteDialog: boolean;
  showDescription: boolean;
  error: IncomeErrors;
  openEditMode: (inc: Income) => void;
  closeEditMode: () => void;
  openDeleteDialog: (e: Income) => void;
  openDescription: (e: Income) => void;
  closeDescription: () => void;
  closeDeleteDialog: () => void;
  onUpdate: () => Promise<void>;
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDelete: () => Promise<void>;
  showForm: boolean;
  handleForm: () => void;
  fetchIncomes: () => Promise<void>;
  date: Date | null;
  handleDate: (e: Value) => void;
}

export const IncomeList = ({
  income,
  incomeList,
  editMode,
  showDeleteDialog,
  error,
  openEditMode,
  closeEditMode,
  openDeleteDialog,
  closeDeleteDialog,
  openDescription,
  closeDescription,
  showDescription,
  onUpdate,
  handleData,
  handleTextArea,
  handleSelect,
  onDelete,
  showForm,
  handleForm,
  fetchIncomes,
  date,
  handleDate,
}: Props): ReactElement => {
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

  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const incomePerDate: { [date: string]: Income[] } = {};

  incomeList.forEach((inc) => {
    if (!incomePerDate[inc.date]) incomePerDate[inc.date] = [];

    incomePerDate[inc.date].push(inc);
  });

  const translate = (e: string): string => {
    if (e === "TITHE") return "Dizimo";
    if (e === "DONATION") return "Oferta";
    return "Outro";
  };

  const renderData = (): ReactElement => {
    return (
      <TabContainer>
        {showForm ? (
          <IncomeForm handleForm={handleForm} fetchIncomes={fetchIncomes} />
        ) : (
          <></>
        )}
        <Title>Receita</Title>
        <div style={{ marginTop: "4%" }}>
          <Button
            onPress={handleForm}
            label="Nova Receita"
            backgroundColor="#f6ab67"
            pressedBackgroundColor="#f9c799"
            hasFixWidth={true}
          />
        </div>

        <Table style={{ marginTop: "30px" }}>
          <tr>
            <Th>Tipo</Th>
            <Th>Valor</Th>
            <Th>Data</Th>
            <Th>Ações</Th>
          </tr>
          <tbody>
            {incomeList.map((item, index) => (
              <tr key={index}>
                <Td>{translate(item.type)}</Td>
                <Td>{"R$" + item.amount}</Td>
                <Td>{formatDate(item.date)}</Td>
                <Td style={{ width: "15%" }}>
                  {item.description !== "" && item.description ? (
                    <>
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
                      </button>{" "}
                    </>
                  ) : (
                    <></>
                  )}
                  <button
                    style={{
                      padding: "8px 8px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#ffa500",
                    }}
                    onClick={() => {
                      openEditMode(item);
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
        <Modal
          showModal={showDeleteDialog}
          title="Deletar Receita"
          message="Deseja realmente deletar a receita?"
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
          message={""}
          showPrimaryButton={true}
          onPrimaryButtonPress={closeDescription}
          primaryButtonLabel="Voltar"
          showSecondaryButton={false}
        >
          {
            <>
              {income.description
                ? String(income.description)
                : "Nenhuma descrição"}
            </>
          }
        </Modal>
        {editMode ? (
          <IncomeEditForm
            income={income}
            error={error}
            handleData={handleData}
            handleSelect={handleSelect}
            handleTextArea={handleTextArea}
            onUpdate={onUpdate}
            closeEditMode={closeEditMode}
            date={date}
            handleDate={handleDate}
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
