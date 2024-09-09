import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Income, IncomeErrors } from "../../../types/types";
import { ValidationError } from "yup";
import ApplicationIncomeService from "../../../services/application-income-service";
import Client from "../../../../../commom/client/client";
import { Incomes } from "./income-form";
import { format, parse } from "date-fns";
import { incomeSchema } from "../../../../../utils/schema/validation";
import { ClientResponse } from "../../../../../commom/client/client-response";
import { toast } from "react-toastify";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../commom/redux/application-slice";

interface Props {
  handleForm: () => void;
  fetchIncomes: () => Promise<void>;
}

export const IncomeForm = ({
  handleForm,
  fetchIncomes,
}: Props): ReactElement => {
  const dispatch = useDispatch();
  const [income, setIncome] = useState<Income>({
    id: 0,
    description: "",
    amount: null,
    type: "",
    date: "",
  });

  const [error, setError] = useState<IncomeErrors>({
    amount: undefined,
    type: undefined,
    date: undefined,
  });

  const [date, setDate] = useState<Date | null>(null);

  const handleValidation = async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      await incomeSchema.validate(income, {
        abortEarly: false,
      });

      await onSubmit();
    } catch (error) {
      const validationError = error as ValidationError;

      // eslint-disable-next-line array-callback-return
      validationError.inner.map((error: ValidationError) => {
        handleErrors(error);
      });
    }
    dispatch(setLoading(false));
  };

  const navigateBack = (): void => {
    handleForm();
  };

  const onSubmit = async (): Promise<void> => {
    const applicationIncome = new ApplicationIncomeService();
    const client = new Client();

    const dataObjeto = parse(income.date, "dd/MM/yy", new Date());
    const dateFormated = format(dataObjeto, "yyyy-MM-dd'T'HH:mm:ss'Z'");

    //@ts-expect-error
    const res: ClientResponse = await applicationIncome.createIncome(client, {
      description: income.description,
      amount: Number(income.amount),
      type: income.type,
      date: dateFormated,
    });

    if (res.hasStatus(200)) {
      toast.success("Receita cadastrada com sucesso!");
      handleForm();
      await fetchIncomes();
    } else {
      toast.error("Erro ao cadastrar a receita!");
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

  const handleDate = (date: Value): void => {
    if(date instanceof Date) {
      setDate(date);
      setIncome({ ...income, date: format(date, "dd/MM/yy")});
    }
  }

  return (
    <Incomes
      error={error}
      handleData={handleData}
      onSubmit={handleValidation}
      handleNavigate={navigateBack}
      handleSelect={handleSelect}
      handleTextArea={handleTextArea}
      income={income}
      date={date}
      handleDate={handleDate}
    />
  );
};
