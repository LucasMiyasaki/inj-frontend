import { isEmpty } from "lodash";
import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import Client from "../../../commom/client/client";
import { setLoading } from "../../../commom/redux/application-slice";
import { ReduxState } from "../../../redux/types";
import { updateUserData } from "../../../utils/schema/validation";
import { clearUserData, setUserData } from "../../login/redux/user-slice";
import ApplicationUserService from "../../../services/application-user-service";
import { UpdateUser, UpdateUserErrors } from "../types";
import { Profile } from "./profile";

export const ProfileScreen = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: ReduxState) => state.user.currentUser,
  );
  const isLoading = useSelector(
    (state: ReduxState) => state.application.isLoading,
  );

  const [activeTab, setActiveTab] = useState(1);
  const [next, setNext] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [user, setUser] = useState<UpdateUser>({
    name: "",
    document: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState<UpdateUserErrors>({
    name: undefined,
    document: undefined,
    phone: undefined,
    email: undefined,
  });

  const openDeleteDialog = (): void => setShowDeleteDialog(true);
  const closeDeleteDialog = (): void => setShowDeleteDialog(false);

  const handleData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError({ ...error, [event.target.name]: undefined });
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const handleTabClick = (tabNumber: number): void => {
    setActiveTab(tabNumber);
  };

  const handleValidation = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      if (!isEmpty(user.email) || !isEmpty(user.phone)) {
        console.log(user);

        await updateUserData.validate(user, {
          abortEarly: false,
        });
      }

      await onSubmit();
    } catch (error) {
      const validationError = error as ValidationError;

      dispatch(setLoading(false));

      // eslint-disable-next-line array-callback-return
      validationError.inner.map((error: ValidationError) => {
        handleErrors(error);
      });
    }
  };

  const onDeleteUser = async (): Promise<void> => {
    const userApplication = new ApplicationUserService();
    const client = new Client();

    dispatch(setLoading(true));

    await userApplication
      .deleteUser(client)
      .then(() => {
        dispatch(clearUserData());
        navigate("/login");
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };

  const onSubmit = async (): Promise<void> => {
    const userApplication = new ApplicationUserService();
    const client = new Client();

    const request = {
      name: isEmpty(user.name) ? currentUser?.name : user.name,
      email: isEmpty(user.email) ? currentUser?.email : user.email,
      phone: isEmpty(user.phone) ? currentUser?.phone : user.phone,
    };

    await userApplication.updateUser(client, request).then(async () => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const data = await userApplication.getUserData(client);

      dispatch(setUserData(data));
      dispatch(setLoading(false));
      navigate("/");
    });
  };

  const handleLogout = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));

      dispatch(clearUserData());
      localStorage.removeItem("jsonWebToken");
      navigate("/login");
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
    }
  };

  const handleNext = (): void => {
    setNext(!next);
    setActiveTab(1);
  }

  return (
    <Profile
      handleValidationToUpdate={handleValidation}
      handleData={handleData}
      onDeleteUser={onDeleteUser}
      openDeleteDialog={openDeleteDialog}
      closeDeleteDialog={closeDeleteDialog}
      showDeleteDialog={showDeleteDialog}
      error={error}
      isLoading={isLoading}
      user={user}
      currentUser={currentUser}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
      handleLogout={handleLogout}
      next={next}
      handleNext={handleNext}
    />
  );
};
