import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Expenditure,
  ExpenditureErrors,
  ExpenditureType,
  ExpenditureTypeErrors,
} from "../../../types/types";
import {
  expenditureSchema,
  expenditureTypeSchema,
  installmentsSchema,
} from "../../../../../utils/schema/validation";
import { ValidationError } from "yup";
import ApplicationExpenditureService from "../../../services/application-expenditure-service";
import Client from "../../../../../commom/client/client";
import { Expenditures } from "./exenditure-form";
import ApplicationExpenditureTypeService from "../../../services/application-expenditureType-service";
import { format, parse } from "date-fns";
import { isNil } from "lodash";
import { ClientResponse } from "../../../../../commom/client/client-response";
import { Value } from "react-date-picker/dist/cjs/shared/types";
import { toast } from "react-toastify";

interface Props {
  handleForm: () => void;
  fetchExpenditures: () => Promise<void>;
  fetchExpendituresTypes: () => Promise<void>;
  expenditureTypeList: ExpenditureType[];
}

export const ExpenditureForm = ({
  handleForm,
  fetchExpenditures,
  fetchExpendituresTypes,
  expenditureTypeList,
}: Props): ReactElement => {
  const [expenditure, setExpenditure] = useState<Expenditure>({
    description: "",
    value: null,
    installments: false,
    parcels: null,
    dueDate: "",
    fee: null,
    expenditureTypeId: 0,
    payedDate: null,
  });

  const [error, setError] = useState<ExpenditureErrors>({
    value: undefined,
    parcels: undefined,
    dueDate: undefined,
    fee: undefined,
    expenditureTypeId: undefined,
    payedDate: undefined,
  });

  const [expenditureType, setExpenditureType] = useState<ExpenditureType>({
    name: "",
  });

  const [errorType, setErrorType] = useState<ExpenditureTypeErrors>({
    name: undefined,
  });

  const [date, setDate] = useState<Date | null>(null);

  const [showTypeList, setShowTypeList] = useState(false);

  useEffect(() => {
    void fetchExpendituresTypes();
  }, []);

  const handleValidation = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
      if (expenditure.installments === true)
        await installmentsSchema.validate(expenditure, {
          abortEarly: false,
        });
      else
        await expenditureSchema.validate(expenditure, {
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
  };

  const handleValidationType = async (): Promise<void> => {
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
  };

  const navigateBack = (): void => {
    handleForm();
  };

  const onSubmit = async (): Promise<void> => {
    const applicationExpenditure = new ApplicationExpenditureService();
    const client = new Client();

    let dataObjeto = parse(expenditure.dueDate, "dd/MM/yy", new Date());
    const dueDateFormated = format(dataObjeto, "yyyy-MM-dd'T'HH:mm:ss'Z'");

    let payedDateFormated = null;

    if(!isNil(expenditure.payedDate)) {
      dataObjeto = parse(expenditure.payedDate, "dd/MM/yy", new Date());
      payedDateFormated = format(dataObjeto, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    }

    const date = new Date();
    date.setHours(0, 0, 0, 0);

    let parcel = null;
    if (expenditure.parcels != null) parcel = Number(expenditure.parcels);

    let amount = null;
    if(expenditure.value != null) amount = Number(expenditure.value);

    //@ts-expect-error
    const res: ClientResponse = await applicationExpenditure.createExpenditure(client, {
      description: expenditure.description,
      value: amount,
      installments: expenditure.installments,
      parcels: parcel,
      dueDate: dueDateFormated,
      fee: expenditure.fee,
      expenditureTypeId: Number(expenditure.expenditureTypeId),
      payedDate: payedDateFormated,
    });

    if(res.hasStatus(200)) {
      toast.success("Despesa cadastrado com sucesso!");
      handleForm();
      await fetchExpenditures();
      await fetchExpendituresTypes();
    }
    else {
      toast.error("Erro ao cadastrar a despesa!", {autoClose: 2000});
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

  const handleDate = (date: Value): void => {
    if (date instanceof Date){
      setDate(date);
      setExpenditure({ ...expenditure, dueDate: format(date, "dd/MM/yy")});
    }
  };

  const [typeForm, setTypeForm] = useState(false);

  const handleTypeForm = (): void => {
    setTypeForm(!typeForm);
  }

  const handleTypeList = (): void => {
    setShowTypeList(!showTypeList);
  }

  return (
    <Expenditures
      error={error}
      handleData={handleData}
      onSubmit={handleValidation}
      handleNavigate={navigateBack}
      handleSelect={handleSelect}
      handleTextArea={handleTextArea}
      handleRadio={handleRadio}
      handleDate={handleDate}
      expenditure={expenditure}
      handleDataType={handleDataType}
      onSubmitType={handleValidationType}
      expenditureType={expenditureType}
      errorType={errorType}
      expenditureTypeList={expenditureTypeList}
      date={date}
      typeForm={typeForm}
      handleTypeForm={handleTypeForm}
      handleTypeList={handleTypeList}
      showTypeList={showTypeList}
    />
  );
};
