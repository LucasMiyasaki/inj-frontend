import React, { ReactElement, useEffect, useState } from "react";
import { Income, IncomeErrors } from "../types/types";
import ApplicationIncomeService from "../services/application-income-service";
import Client from "../../../commom/client/client";
import { ValidationError } from "yup";
import { format, parse, parseISO } from "date-fns";
import { incomeSchema } from "../../../utils/schema/validation";
import { IncomeList } from "./income";
import { ClientResponse } from "../../../commom/client/client-response";
import { toast } from "react-toastify";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../commom/redux/application-slice";

export const IncomeListScreen = (): ReactElement => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const handleForm = (): void => {
    setShowForm(!showForm);
  };

  const [incomeList, setIncomeList] = useState<Income[]>([]);

  const [date, setDate] = useState<Date | null>(null);

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

  const fetchIncomes = async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      const applicationIncomeService = new ApplicationIncomeService();
      const client = new Client();

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const incomeData = await applicationIncomeService.getAll(client);

      if (incomeData != null) {
        setIncomeList(incomeData);
      }
    } catch (error) {
      console.error("Error fetching advertises:", error);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    void fetchIncomes();
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [income, setIncome] = useState<Income>({
    id: 0,
    description: "",
    amount: null,
    type: "TITHE",
    date: "",
  });

  const [deleteId, setDeleteId] = useState(0);

  const [editId, setEditId] = useState(0);

  const [error, setError] = useState<IncomeErrors>({
    amount: undefined,
    type: undefined,
    date: undefined,
  });

  const stringToDate = (date: string): Date => {
    const dateObject: Date = parseISO(date);
    return new Date(
      dateObject.valueOf() + dateObject.getTimezoneOffset() * 60 * 1000,
    );
  };

  const openEditMode = (inc: Income): void => {
    setEditMode(true);

    setIncome(inc);
    if (inc.id != null) setEditId(inc.id);

    setIncome((prev) => ({
      ...prev,
      date: formatDate(inc.date),
    }));

    setDate(stringToDate(inc.date));
  };
  const closeEditMode = (): void => {
    setEditMode(false);
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const openDeleteDialog = (inc: Income): void => {
    setShowDeleteDialog(true);

    if (inc.id != null) setDeleteId(inc.id);
  };
  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const [showDescription, setShowDescription] = useState(false);

  const openDescription = (inc: Income): void => {
    setShowDescription(true);
    setIncome(inc);
  };

  const closeDescription = (): void => {
    setShowDescription(false);
  };

  const handleValidation = async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await incomeSchema.validate(income, {
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

  const onUpdate = async (): Promise<void> => {
    const applicationIncome = new ApplicationIncomeService();
    const client = new Client();

    const dataObjeto = parse(income.date, "dd/MM/yy", new Date());
    const dateFormated = format(dataObjeto, "yyyy-MM-dd'T'HH:mm:ss'Z'");

    //@ts-expect-error
    const res: ClientResponse = await applicationIncome.updateIncome(
      client,
      {
        description: income.description,
        amount: Number(income.amount),
        type: income.type,
        date: dateFormated,
      },
      editId,
    );

    if (res.hasStatus(200)) {
      toast.success("Receita alterado com sucesso!");
      setEditMode(false);
      await fetchIncomes();
    } else {
      toast.error("Erro ao alterar a receita!");
    }
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setIncome({ ...income, [event.target.name]: event.target.value });
  };

  const handleTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setIncome({ ...income, [event.target.name]: event.target.value });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setIncome({ ...income, [event.target.name]: event.target.value });
  };

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const onDelete = async (): Promise<void> => {
    dispatch(setLoading(true));
    const applicationIncome = new ApplicationIncomeService();
    const client = new Client();

    //@ts-expect-error
    const res: ClientResponse = await applicationIncome.deleteIncome(
      client,
      deleteId,
    );

    if (res.hasStatus(200)) {
      toast.success("Receita deletado com sucesso!");
      await fetchIncomes();
    } else {
      toast.error("Erro ao deletar receita!");
    }

    setShowDeleteDialog(false);
    dispatch(setLoading(false));
  };

  const handleDate = (date: Value): void => {
    if(date instanceof Date) {
      setDate(date);
      setIncome({ ...income, date: format(date, "dd/MM/yy")});
    }
  }

  return (
    <IncomeList
      income={income}
      incomeList={incomeList}
      editMode={editMode}
      error={error}
      openEditMode={openEditMode}
      closeEditMode={closeEditMode}
      openDeleteDialog={openDeleteDialog}
      closeDeleteDialog={closeDeleteDialog}
      showDeleteDialog={showDeleteDialog}
      onUpdate={handleValidation}
      handleData={handleData}
      handleTextArea={handleTextArea}
      handleSelect={handleSelect}
      onDelete={onDelete}
      showDescription={showDescription}
      openDescription={openDescription}
      closeDescription={closeDescription}
      showForm={showForm}
      handleForm={handleForm}
      fetchIncomes={fetchIncomes}
      date={date}
      handleDate={handleDate}
    />
  );
};
