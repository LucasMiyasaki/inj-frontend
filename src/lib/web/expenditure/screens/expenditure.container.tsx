import React, { ReactElement, useEffect, useState } from "react";
import {
  Expenditure,
  ExpenditureErrors,
  ExpenditureType,
  ExpenditureTypeErrors,
} from "../types/types";
import ApplicationExpenditureService from "../services/application-expenditure-service";
import Client from "../../../commom/client/client";
import { ExpenditureList } from "./expenditure";
import ApplicationExpenditureTypeService from "../services/application-expenditureType-service";
import {
  expenditurePayedDateSchema,
  expenditureSchema,
  expenditureTypeSchema,
  installmentsSchema,
} from "../../../utils/schema/validation";
import { ValidationError } from "yup";
import { format, parse, parseISO } from "date-fns";
import { isEmpty, isNil } from "lodash";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { ClientResponse } from "../../../commom/client/client-response";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../commom/redux/application-slice";

export const ExpenditureListScreen = (): ReactElement => {
  const dispatch = useDispatch();

  const [typeForm, setTypeForm] = useState(false);

  const [expenditureList, setExpenditureList] = useState<Expenditure[]>([]);

  const [expenditureTypeList, setExpenditureTypeList] = useState<
    ExpenditureType[]
  >([]);

  const fetchExpendituresTypes = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      const applicationExpenditureTypeService =
        new ApplicationExpenditureTypeService();
      const client = new Client();

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const expenditureData =
        await applicationExpenditureTypeService.getAllTypes(client);

      if (expenditureData != null) {
        setExpenditureTypeList(expenditureData);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching advertises:", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    void fetchExpendituresTypes();
  }, []);

  const formatDate = (date: string): string => {
    if (date.length > 0) {
      const dateObject: Date = parseISO(date);
      const newDate = new Date(
        dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000,
      );
      const formatedDate: string = format(newDate, "dd/MM/yy");

      return formatedDate;
    }

    return date;
  };

  const fetchExpenditures = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      const applicationExpenditureService = new ApplicationExpenditureService();
      const client = new Client();

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const expenditureData =
        await applicationExpenditureService.getAll(client);

      if (expenditureData != null) {
        setExpenditureList(expenditureData);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching advertises:", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    void fetchExpenditures();
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [expenditure, setExpenditure] = useState<Expenditure>({
    id: 0,
    description: "",
    value: null,
    installments: false,
    parcels: null,
    dueDate: "",
    fee: null,
    expenditureTypeId: 0,
    payedDate: "",
  });

  const [expenditureType, setExpenditureType] = useState<ExpenditureType>({
    id: 0,
    name: "",
  });

  const [deleteId, setDeleteId] = useState(0);

  const [editId, setEditId] = useState(0);

  const [error, setError] = useState<ExpenditureErrors>({
    value: undefined,
    parcels: undefined,
    dueDate: undefined,
    fee: undefined,
    expenditureTypeId: undefined,
    payedDate: undefined,
  });

  const [errorType, setErrorType] = useState<ExpenditureTypeErrors>({
    name: undefined,
  });

  const [payMode, setPaymode] = useState(false);

  const [date, setDate] = useState<Date | null>(null);

  const stringToDate = (date: string): Date => {
    const dateObject: Date = parseISO(date);
    return new Date(
      dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000,
    );
  };

  const openEditMode = (
    expend: Expenditure,
    expendType: ExpenditureType,
  ): void => {
    setEditMode(true);

    setExpenditure(expend);
    setExpenditureType(expendType);
    if (expend.id != null) setEditId(expend.id);

    setExpenditure((prev) => ({
      ...prev,
      dueDate: formatDate(expend.dueDate),
    }));

    setDate(stringToDate(expend.dueDate));
  };

  const closeEditMode = (): void => {
    setEditMode(false);
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const openDeleteDialog = (expend: Expenditure): void => {
    setShowDeleteDialog(true);

    if (expend.id != null) setDeleteId(expend.id);
  };
  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const [showDescription, setShowDescription] = useState(false);

  const openDescription = (expend: Expenditure): void => {
    setShowDescription(true);
    setExpenditure(expend);
  };

  const closeDescription = (): void => {
    setShowDescription(false);
  };

  const handleValidation = async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await expenditureSchema.validate(expenditure, {
        abortEarly: false,
      });

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
      if (expenditure.installments === true)
        await installmentsSchema.validate(expenditure, {
          abortEarly: false,
        });

      await onUpdate();
    } catch (error) {
      const validationError = error as ValidationError;

      // eslint-disable-next-line array-callback-return
      validationError.inner.map((error: ValidationError) => {
        handleErrors(error);
      });
    }
    dispatch(setLoading(false));
  };

  const openPayMode = (
    expend: Expenditure,
    expendType: ExpenditureType,
  ): void => {
    setPaymode(true);

    setDate(null);

    setExpenditure(expend);
    setExpenditureType(expendType);
    if (expend.id != null) setEditId(expend.id);

    setExpenditure((prev) => ({
      ...prev,
      dueDate: formatDate(expend.dueDate),
    }));
  };

  const openPayEdit = (
    expend: Expenditure,
    expendType: ExpenditureType,
  ): void => {
    setExpenditure(expend);
    setExpenditureType(expendType);
    if (expend.id != null) setEditId(expend.id);

    setExpenditure((prev) => ({
      ...prev,
      dueDate: formatDate(expend.dueDate),
    }));

    setExpenditure((prev) => ({
      ...prev,
      payedDate: null,
    }));
  };

  const closePayMode = (): void => {
    setPaymode(false);
  };

  const handleValidationType = async (): Promise<void> => {
    dispatch(setLoading(true));
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

      if (!found) await onSubmitType();
      else
        setErrorType((prev) => ({
          ...prev,
          name: "Tipo de despesa já cadastrado",
        }));
    } catch (error) {
      const validationError = error as ValidationError;

      // eslint-disable-next-line array-callback-return
      validationError.inner.map((error: ValidationError) => {
        handleErrorsType(error);
      });
    }
    dispatch(setLoading(false));
  };

  const onUpdate = async (): Promise<void> => {
    const applicationExpenditure = new ApplicationExpenditureService();
    const client = new Client();

    const dataObjeto = parse(expenditure.dueDate, "dd/MM/yy", new Date());
    const dateFormated = format(dataObjeto, "yyyy-MM-dd'T'HH:mm:ss'Z'");

    if (!expenditure.installments) {
      expenditure.fee = null;
      expenditure.parcels = null;
    }

    let parcel = null;
    if (expenditure.parcels != null) parcel = Number(expenditure.parcels);

    let date = null;
    let payedDateFormated = null;

    if (!isNil(expenditure.payedDate)) {
      date = parse(expenditure.payedDate, "dd/MM/yy", new Date());
      payedDateFormated = format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    }

    //@ts-expect-error
    const res: ClientResponse = await applicationExpenditure.updateExpenditure(
      client,
      {
        description: expenditure.description,
        value: expenditure.value,
        installments: expenditure.installments,
        parcels: parcel,
        dueDate: dateFormated,
        fee: expenditure.fee,
        expenditureTypeId: Number(expenditure.expenditureTypeId),
        payedDate: payedDateFormated,
      },
      editId,
    );

    if(res.hasStatus(200)) {
      toast.success("Despesa atualizada com sucesso!");
      setEditMode(false);
      setPaymode(false);
      await fetchExpenditures();
    }
    else {
      toast.error("Erro ao alterar a despesa!");
    }
  };

  const onSubmitType = async (): Promise<void> => {
    const applicationExpenditure = new ApplicationExpenditureTypeService();
    const client = new Client();

    //@ts-expect-error
    const res: ClientResponse = await applicationExpenditure.createExpenditureType(client, {
      name: expenditureType.name,
    });

    if(res.hasStatus(200)) {
      toast.success("Tipo de despesa cadastrado com sucesso!");
      handleTypeForm();
      await fetchExpendituresTypes();
    }
    else {
      toast.error("Erro ao cadastrar tipo de despesa!");
    }
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setExpenditure({ ...expenditure, [event.target.name]: event.target.value });
  };

  const handleDataType = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setErrorType((prev) => ({ ...errorType, [event.target.name]: undefined }));

    setExpenditureType({
      ...expenditureType,
      [event.target.name]: event.target.value,
    });
  };

  const handleRadio = (): void => {
    setExpenditure((prev) => ({
      ...prev,
      installments: !expenditure.installments,
    }));
  };

  const handleTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setExpenditure({ ...expenditure, [event.target.name]: event.target.value });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setExpenditure({ ...expenditure, [event.target.name]: event.target.value });
  };

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const handleErrorsType = (e: ValidationError): void => {
    setErrorType((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const handlePayMode = async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await expenditurePayedDateSchema.validate(expenditure, {
        abortEarly: false,
      });

      await onUpdate();
    } catch (error) {
      const validationError = error as ValidationError;

      // eslint-disable-next-line array-callback-return
      validationError.inner.map((error: ValidationError) => {
        handleErrors(error);
      });
    }
    dispatch(setLoading(false));
  };

  const onDelete = async (): Promise<void> => {
    dispatch(setLoading(true));
    const applicationExpenditure = new ApplicationExpenditureService();
    const client = new Client();

    //@ts-expect-error
    const res: ClientResponse = await applicationExpenditure.deleteExpenditure(client, deleteId);

    if(res.hasStatus(200)) {
      toast.success("Despesa deletada com sucesso!");
      setShowDeleteDialog(false);
      await fetchExpenditures();
    }
    else {
      toast.error("Erro ao deletar a despesa!");
    }
    dispatch(setLoading(false));
  };

  const handleDueDate = (date: Value): void => {
    if (date instanceof Date) {
      setDate(date);
      setExpenditure({ ...expenditure, dueDate: format(date, "dd/MM/yy") });
    }
  };

  const handlePayedDate = (date: Value): void => {
    if (date instanceof Date) {
      setDate(date);
      setExpenditure({ ...expenditure, payedDate: format(date, "dd/MM/yy") });
    }
  }

  const handleTypeForm = (): void => {
    setTypeForm(!typeForm);
  }

  return (
    <ExpenditureList
      expenditure={expenditure}
      expenditureType={expenditureType}
      expenditureList={expenditureList}
      expenditureTypeList={expenditureTypeList}
      editMode={editMode}
      error={error}
      errorType={errorType}
      openEditMode={openEditMode}
      closeEditMode={closeEditMode}
      openDeleteDialog={openDeleteDialog}
      closeDeleteDialog={closeDeleteDialog}
      showDeleteDialog={showDeleteDialog}
      onUpdate={handleValidation}
      onSubmitType={handleValidationType}
      handleData={handleData}
      handleDataType={handleDataType}
      handleRadio={handleRadio}
      handleTextArea={handleTextArea}
      handleSelect={handleSelect}
      onDelete={onDelete}
      showDescription={showDescription}
      openDescription={openDescription}
      closeDescription={closeDescription}
      payMode={payMode}
      handlePaymode={handlePayMode}
      openPaymode={openPayMode}
      closePaymode={closePayMode}
      openPayEdit={openPayEdit}
      handlePayEdit={onUpdate}
      fetchExpenditures={fetchExpenditures}
      fetchExpendituresTypes={fetchExpendituresTypes}
      date={date}
      handleDueDate={handleDueDate}
      handlePayedDate={handlePayedDate}
      typeForm={typeForm}
      handleTypeForm={handleTypeForm}
    />
  );
};
