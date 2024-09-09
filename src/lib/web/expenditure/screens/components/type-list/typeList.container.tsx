import React, { ReactElement, useEffect, useState } from "react";
import {
  Expenditure,
  ExpenditureType,
  ExpenditureTypeErrors,
} from "../../../types/types";
import Client from "../../../../../commom/client/client";
import ApplicationExpenditureTypeService from "../../../services/application-expenditureType-service";
import { expenditureTypeSchema } from "../../../../../utils/schema/validation";
import { ValidationError } from "yup";
import { TypeList } from "./typeList";
import ApplicationExpenditureService from "../../../services/application-expenditure-service";
import { ClientResponse } from "../../../../../commom/client/client-response";
import { toast } from "react-toastify";
import { isEmpty, isNil } from "lodash";

interface Props {
  handleTypeList: () => void;
}

export const TypeListScreen = ({
  handleTypeList,
}:Props): ReactElement => {
  const [expenditureTypeList, setExpenditureTypeList] = useState<
    ExpenditureType[]
  >([]);

  const [expenditureList, setExpenditureList] = useState<Expenditure[]>([]);

  const fetchExpendituresTypes = async (): Promise<void> => {
    try {
      const applicationExpenditureTypeService =
        new ApplicationExpenditureTypeService();
      const client = new Client();

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const expenditureData = await applicationExpenditureTypeService.getAllTypes(client);

      if (expenditureData != null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setExpenditureTypeList(expenditureData);
      }
    } catch (error) {
      console.error("Error fetching advertises:", error);
    }
  };

  useEffect(() => {
    void fetchExpendituresTypes();
  }, []);

  const fetchExpenditures = async (): Promise<void> => {
    try {
      const applicationExpenditureService =
        new ApplicationExpenditureService();
      const client = new Client();

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const expenditureData = await applicationExpenditureService.getAll(client);

      if (expenditureData != null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setExpenditureList(expenditureData);
      }
    } catch (error) {
      console.error("Error fetching advertises:", error);
    }
  };

  useEffect(() => {
    void fetchExpenditures();
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [expenditureType, setExpenditureType] = useState<ExpenditureType>({
    id: 0,
    name: "",
  });

  const [deleteId, setDeleteId] = useState(0);

  const [editId, setEditId] = useState(0);

  const [errorType, setErrorType] = useState<ExpenditureTypeErrors>({
    name: undefined,
  });

  const openEditMode = (expendType: ExpenditureType): void => {
    setEditMode(true);

    setExpenditureType(expendType);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (expendType.id != null) setEditId(expendType.id);
  };

  const closeEditMode = (): void => {
    setEditMode(false);
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const openDeleteDialog = (expend: ExpenditureType): void => {
    setShowDeleteDialog(true);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (expend.id != null) setDeleteId(expend.id);
  };
  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const handleValidation = async (): Promise<void> => {
    try {
      await expenditureTypeSchema.validate(expenditureType, {
        abortEarly: false,
      });

      let found = false;
      expenditureTypeList.forEach((type) => {
        if (type.name === expenditureType.name) {
          found = true;
        }
      });

      if (!found) await onUpdate();
      else
        setErrorType((prev) => ({
          ...prev,
          name: "Tipo de despesa já cadastrado com este nome",
        }));
    } catch (error) {
      const validationError = error as ValidationError;

      // eslint-disable-next-line array-callback-return
      validationError.inner.map((error: ValidationError) => {
        handleErrorsType(error);
      });
    }
  };

  const onUpdate = async (): Promise<void> => {
    const applicationExpenditure = new ApplicationExpenditureTypeService();
    const client = new Client();

    //@ts-expect-error
    const res: ClientResponse = await applicationExpenditure.updateExpenditureType(
      client,
      expenditureType,
      editId,
    );

    if(!isEmpty(res) && res.hasStatus(200)) {
      toast.success("Tipo de despesa atualizado com sucesso!");
      closeEditMode();
      await fetchExpendituresTypes();
    }
    else {
      toast.error("Erro ao atualizar o tipo de despesa!");
    }
  };

  const handleDataType = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setErrorType((prev) => ({ ...errorType, [event.target.name]: undefined }));

    setExpenditureType({
      ...expenditureType,
      [event.target.name]: event.target.value,
    });
  };

  const handleErrorsType = (e: ValidationError): void => {
    setErrorType((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const onDelete = async (): Promise<void> => {
    const applicationExpenditure = new ApplicationExpenditureTypeService();
    const client = new Client();

    //@ts-expect-error
    const res: ClientResponse = await applicationExpenditure.deleteExpenditureType(client, deleteId);

    if(!isEmpty(res) && res.hasStatus(200)) {
      toast.success("Tipo de despesa excluido com sucesso!");
      closeDeleteDialog();
      await fetchExpendituresTypes();
    }
    else {
      toast.error("Erro ao excluir tipo de despesa!");
    }
  };

  return (
    <TypeList
      expenditureType={expenditureType}
      expenditureTypeList={expenditureTypeList}
      expenditureList={expenditureList}
      editMode={editMode}
      errorType={errorType}
      openEditForm={openEditMode}
      closeEditForm={closeEditMode}
      openDeleteDialog={openDeleteDialog}
      closeDeleteDialog={closeDeleteDialog}
      showDeleteDialog={showDeleteDialog}
      onUpdateType={handleValidation}
      handleDataType={handleDataType}
      onDelete={onDelete}
      handleTypeList={handleTypeList}
    />
  );
};
