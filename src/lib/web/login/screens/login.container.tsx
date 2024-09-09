import { isNil } from "lodash";
import React, { ChangeEvent, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import Client from "../../../commom/client/client";
import { setLoading } from "../../../commom/redux/application-slice";
import { ReduxState } from "../../../redux/types";
import { loginSchema } from "../../../utils/schema/validation";
import ApplicationUserService from "../../../services/application-user-service";
import { setUserData } from "../redux/user-slice";
import ApplicationLoginService from "../services/application-login-service";
import { UserLogin, UserLoginErros } from "../types/types";
import { Login } from "./login";

export const LoginScreen = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = new ApplicationLoginService();
  const applicationUser = new ApplicationUserService();
  const client = new Client();

  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const isLoading = useSelector(
    (state: ReduxState) => state.application.isLoading,
  );
  const [error, setError] = useState<UserLoginErros>({
    email: undefined,
    password: undefined,
  });

  const isDisabled = (): boolean => {
    return isNil(user.email) || isNil(user.password);
  };

  const handleData = (e: ChangeEvent<HTMLInputElement>): void => {
    setError((prev) => ({ ...prev, [e.target.name]: undefined }));
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const handleValidation = async (): Promise<void> => {
    try {
      await loginSchema.validate(user, {
        abortEarly: false,
      });

      await onSubmit();
    } catch (error) {
      const validationError = error as ValidationError;

      console.log(validationError.message);

      if (
        validationError.message !== "Request failed with status code 401" &&
        validationError.message !== "Request failed with status code 400"
      ) {
        // eslint-disable-next-line array-callback-return
        validationError.inner.map((error: ValidationError) => {
          handleErrors(error);
        });
      }
    }
  };

  const onSubmit = async (): Promise<void> => {
    dispatch(setLoading(true));

    await login
      .login(client, user)
      .then(async () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const data = await applicationUser.getUserData(client);

        dispatch(setUserData(data));
        dispatch(setLoading(false));

        navigate("/");
      })
      .catch((error) => {
        dispatch(setLoading(false));
        throw error;
      });
  };

  return (
    <Login
      user={user}
      error={error}
      loading={isLoading}
      onSubmit={handleValidation}
      handleData={handleData}
      isButtonDisabled={isDisabled()}
    />
  );
};
