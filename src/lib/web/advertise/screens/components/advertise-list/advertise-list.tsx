import React, { ChangeEvent, ReactElement } from "react";
import { format, parseISO } from "date-fns";
import { Advertise, AdvertiseErrors } from "../../../types/types";
import { AdvertiseEditForm } from "../edit-form/advertise-edit-form";
import { AdvertiseFormScreen } from "../form/advertiseForm.container";
import { Details, TabContainer, Title } from "./advertise-list.styles";
import {
  Table,
  Td,
  Th,
} from "../../../../../commom/component/table/table.style";
import { Modal } from "../../../../../commom/component/modal/modal";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../commom/component/button/button";

interface Props {
  advertise: Advertise;
  advertiseList: Advertise[];
  editMode: boolean;
  showDeleteDialog: boolean;
  showDescription: boolean;
  error: AdvertiseErrors;
  openEditMode: (ad: Advertise) => void;
  closeEditMode: () => void;
  openDeleteDialog: (e: Advertise) => void;
  openDescription: (e: Advertise) => void;
  closeDescription: () => void;
  closeDeleteDialog: () => void;
  onUpdate: () => Promise<void>;
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: () => Promise<void>;
  showForm: boolean;
  fetchAdvertises: () => Promise<void>;
  startDate: Date | null;
  endDate: Date | null;
  handleStartDate: (e: Value) => void;
  handleEndDate: (e: Value) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleForm: () => void;
  handleShow: (e: Advertise) => Promise<void>;
}

export const AdvertiseList = ({
  advertiseList,
  advertise,
  showForm,
  openDeleteDialog,
  closeDeleteDialog,
  closeDescription,
  closeEditMode,
  startDate,
  endDate,
  editMode,
  error,
  fetchAdvertises,
  handleData,
  handleStartDate,
  handleEndDate,
  handleTextArea,
  onDelete,
  onUpdate,
  openDescription,
  openEditMode,
  showDeleteDialog,
  showDescription,
  handleFileChange,
  handleForm,
  handleShow,
}: Props): ReactElement => {
  const navigate = useNavigate();

  const formatDate = (date: string): string => {
    if (date.length > 0) {
      const dateObject: Date = parseISO(date);
      const newDate = new Date(
        dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000,
      );
      const formatedDate: string = format(newDate, "dd/MM/yyyy - HH:mm");

      return formatedDate;
    }

    return date;
  };

  const showDetail = (id: number): void => {
    navigate("/advertise/" + id);
  };

  const renderData = (): ReactElement => {
    return (
      <TabContainer>
        {showForm ? (
          <AdvertiseFormScreen
            fetchAdvertises={fetchAdvertises}
            handleForm={handleForm}
          />
        ) : (
          <></>
        )}
        <Title>Avisos</Title>

        <div style={{ marginTop: "4%" }}>
          <Button
            onPress={handleForm}
            label="Novo aviso"
            backgroundColor="#f6ab67"
            pressedBackgroundColor="#f9c799"
            hasFixWidth={true}
          />
        </div>

        <Table style={{ marginTop: "30px" }}>
          <tr>
            <Th>Imagem</Th>
            <Th>Nome</Th>
            <Th>Data Inicial</Th>
            <Th>Data Final</Th>
            <Th>Ações</Th>
            <Th>Mostrar</Th>
          </tr>
          <tbody>
            {advertiseList.map((item, index) => (
              <tr key={index}>
                <Td style={{ padding: "0", width: "0" }}>
                  <img
                    src={"http://localhost:3344/images/advertise/" + item.url}
                    style={{ height: "90px" }}
                    onClick={() => {
                      showDetail(item.id ?? 0);
                    }}
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>{formatDate(item.startDate)}</Td>
                <Td>{formatDate(item.endDate)}</Td>
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
                <Td>
                  {item.show ? (
                    <button
                      style={{
                        padding: "8px 8px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#33B864",
                      }}
                      onClick={async () => {
                        await handleShow(item);
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
                      onClick={async () => {
                        await handleShow(item);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-app"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z" />
                      </svg>
                    </button>
                  )}
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
          title="Deletar Aviso"
          message="Deseja realmente deletar o aviso?"
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
          {<>{advertise.description}</>}
        </Modal>
        {editMode ? (
          <AdvertiseEditForm
            error={error}
            advertise={advertise}
            handleData={handleData}
            handleValidation={onUpdate}
            closeEditMode={closeEditMode}
            handleFileChange={handleFileChange}
            handleTextArea={handleTextArea}
            startDate={startDate}
            endDate={endDate}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
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
