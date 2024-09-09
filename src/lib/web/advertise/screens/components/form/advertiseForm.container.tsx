import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Advertise, AdvertiseErrors } from "../../../types/types";
import { AdvertiseForm } from "./advertiseForm";
import ApplicationAdvertiseService from "../../../services/application-advertise-service";
import Client from "../../../../../commom/client/client";
import { advertiseSchema } from "../../../../../utils/schema/validation";
import { ValidationError } from "yup";
import { format, parse } from "date-fns";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { ClientResponse } from "../../../../../commom/client/client-response";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../commom/redux/application-slice";

interface Props {
  fetchAdvertises: () => Promise<void>;
  handleForm: () => void;
}

export const AdvertiseFormScreen = ({
  fetchAdvertises,
  handleForm,
}: Props): ReactElement => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState<Date | null>(null);

  const [endDate, setEndDate] = useState<Date | null>(null);

  const [advertise, setAdvertise] = useState<Advertise>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    file: null,
    show: true,
  });
  const [error, setError] = useState<AdvertiseErrors>({
    name: undefined,
    description: undefined,
    startDate: undefined,
    endDate: undefined,
    file: undefined,
  });

  const handleValidation = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await advertiseSchema.validate(advertise, {
        abortEarly: false,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (new Date(advertise.startDate) > new Date(advertise.endDate)) {
        toast.error("A data de término deve ser posterior à data de início");
      } else await onSubmit();

      dispatch(setLoading(false));
    } catch (error) {
      const validationError = error as ValidationError;

      // eslint-disable-next-line array-callback-return
      validationError.inner.map((error: ValidationError) => {
        handleErrors(error);
      });

      dispatch(setLoading(false));
    }
  };

  const handleNavigate = (): void => {
    handleForm();
  };

  const onSubmit = async (): Promise<void> => {
    const applicationAdvertise = new ApplicationAdvertiseService();
    const client = new Client();

    //@ts-expect-error
    const res: ClientResponse = await applicationAdvertise.createAdvertise(
      client,
      {
        name: advertise.name,
        description: advertise.description,
        startDate: advertise.startDate,
        endDate: advertise.endDate,
        file: advertise.file,
        show: true,
      },
    );

    if (res != null && res.hasStatus(200)) {
      toast.success("Aviso cadastrado com sucesso!");
      handleForm();
      await fetchAdvertises();
    } else {
      toast.error("Erro ao cadastrar o aviso!");
    }
  };

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setAdvertise({ ...advertise, [event.target.name]: event.target.value });
  };

  const handleTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setAdvertise({ ...advertise, [event.target.name]: event.target.value });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newFile = event.target.files?.[0];

    if (newFile) {
      setAdvertise({ ...advertise, file: newFile });
    }
  };

  const handleStartDate = (date: Value): void => {
    if (date instanceof Date) {
      setStartDate(date);
      setAdvertise({
        ...advertise,
        startDate: format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      });
    }
  };

  const handleEndDate = (date: Value): void => {
    if (date instanceof Date) {
      setEndDate(date);
      setAdvertise({
        ...advertise,
        endDate: format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      });
    }
  };

  return (
    <AdvertiseForm
      error={error}
      handleData={handleData}
      onSubmit={handleValidation}
      handleNavigate={handleNavigate}
      handleFileChange={handleFileChange}
      handleTextArea={handleTextArea}
      advertise={advertise}
      startDate={startDate}
      endDate={endDate}
      handleEndDate={handleEndDate}
      handleStartDate={handleStartDate}
    />
  );
};
