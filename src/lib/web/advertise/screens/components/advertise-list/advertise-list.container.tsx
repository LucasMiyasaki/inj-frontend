import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationAdvertiseService from "../../../services/application-advertise-service";
import Client from "../../../../../commom/client/client";
import { AdvertiseErrors, Advertise } from "../../../types/types";
import { updateAdvertiseSchema } from "../../../../../utils/schema/validation";
import { format, parse, parseISO } from "date-fns";
import { ValidationError } from "yup";
import { ClientResponse } from "../../../../../commom/client/client-response";
import { toast } from "react-toastify";
import { AdvertiseList } from "./advertise-list";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../commom/redux/application-slice";

export const AdvertaiseListScreen = (): ReactElement => {
  const dispatch = useDispatch();

  const [advertiseList, setAdvertiseList] = useState<Advertise[]>([]);

  const fetchAdvertises = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      const applicationAdvertiseService = new ApplicationAdvertiseService();
      const client = new Client();

      //@ts-expect-error
      const advertises: Advertise[] =
        await applicationAdvertiseService.getAllAdvertises(client);

      if (advertises != null) {
        // Ordena os advertises pelo nome
        advertises.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        setAdvertiseList(advertises);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error fetching advertises:", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    void fetchAdvertises();
  }, []);

  const [advertise, setAdvertise] = useState<Advertise>({
    id: 0,
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

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [id, setId] = useState(0);

  const [startDate, setStartDate] = useState<Date | null>(null);

  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showDescription, setShowDescrition] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const openDeleteDialog = (advertise: Advertise): void => {
    setId(advertise.id ?? 0);
    setShowDeleteDialog(true);
  };
  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const handleValidation = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      await updateAdvertiseSchema.validate(advertise, {
        abortEarly: false,
      });

      if (new Date(advertise.startDate) > new Date(advertise.endDate)) {
        toast.error("A data de término deve ser posterior à data de início");
      } else {
        await onUpdate();
        await fetchAdvertises();
      }

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

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const onUpdate = async (): Promise<void> => {
    const applicationAdvertise = new ApplicationAdvertiseService();
    const client = new Client();

    if (id != null) {
      //@ts-expect-error
      const res: ClientResponse = await applicationAdvertise.updateAdvertise(
        client,
        {
          name: advertise.name,
          description: advertise.description,
          startDate: advertise.startDate,
          endDate: advertise.endDate,
          file: advertise.file,
          show: advertise.show,
        },
        id,
      );

      if (res != null && res.hasStatus(200)) {
        toast.success("Aviso atualizado com sucesso!");
        setEditMode(false);
        await fetchAdvertises();
      } else {
        toast.error("Erro ao atualizar o aviso!");
      }
    }
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setAdvertise({
      ...advertise,
      [event.target.name]: event.target.value,
    });
  };

  const handleTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setError((prev) => ({ ...error, [event.target.name]: undefined }));

    setAdvertise({
      ...advertise,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newFile = event.target.files?.[0];

    if (newFile) {
      setAdvertise({ ...advertise, file: newFile });
    }
  };

  const onDelete = async (): Promise<void> => {
    dispatch(setLoading(true));

    if (id != null) {
      const applicationAdvertise = new ApplicationAdvertiseService();
      const client = new Client();

      //@ts-expect-error
      const res: ClientResponse = await applicationAdvertise.deleteAdvertise(
        client,
        id,
      );

      if (res != null && res.hasStatus(200)) {
        toast.success("Aviso excluido com sucesso!");
      } else {
        toast.error("Erro ao excluir o aviso!");
      }

      await fetchAdvertises();
      
      setShowDeleteDialog(false);
    }

    dispatch(setLoading(false));
  };

  const closeDescription = (): void => {
    setShowDescrition(false);
  };

  const closeEditMode = (): void => {
    setEditMode(false);
  };

  const openEditMode = (ad: Advertise): void => {
    console.log(ad);

    setAdvertise(ad);

    if (ad.id != null) setId(ad.id);

    setStartDate(new Date(ad.startDate));
    setEndDate(new Date(ad.endDate));

    setEditMode(true);
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

  const openDescription = (ad: Advertise): void => {
    setAdvertise(ad);
    setShowDescrition(true);
  };

  const handleForm = (): void => {
    setShowForm(!showForm);
  };

  const handleShow = async (ad: Advertise): Promise<void> => {
    setAdvertise({
      ...advertise,
      description: ad.description,
      endDate: ad.endDate,
      file: ad.file,
      id: ad.id,
      name: ad.name,
      show: !ad.show,
      startDate: ad.startDate,
      url: ad.url,
    });

    if (ad.id != null) setId(ad.id);

    setShouldUpdate(true);
  };

  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));

    if (shouldUpdate) {
      const aux = async (): Promise<void> => {
        await onUpdate();
      };

      void aux();
      setShouldUpdate(false);
    }

    dispatch(setLoading(false));
  }, [advertise, id]);

  return (
    <AdvertiseList
      advertise={advertise}
      advertiseList={advertiseList}
      closeDeleteDialog={closeDeleteDialog}
      closeDescription={closeDescription}
      closeEditMode={closeEditMode}
      editMode={editMode}
      error={error}
      fetchAdvertises={fetchAdvertises}
      handleData={handleData}
      handleFileChange={handleFileChange}
      handleTextArea={handleTextArea}
      onDelete={onDelete}
      onUpdate={handleValidation}
      openDeleteDialog={openDeleteDialog}
      openEditMode={openEditMode}
      startDate={startDate}
      endDate={endDate}
      handleStartDate={handleStartDate}
      handleEndDate={handleEndDate}
      openDescription={openDescription}
      showDeleteDialog={showDeleteDialog}
      showDescription={showDescription}
      showForm={showForm}
      handleForm={handleForm}
      handleShow={handleShow}
    />
  );
};
