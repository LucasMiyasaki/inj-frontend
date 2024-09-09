import React, { ReactElement, useState } from "react";
import { ValidationError } from "yup";
import Client from "../../../commom/client/client";
import {
  firstUserSchema,
  secondUserSchema,
} from "../../../utils/schema/validation";
import ApplicationOnboardingService from "../../../services/application-onboarding-service";
import { Onboarding } from "./onboarding";
import { User, UserErrors } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../redux/types";
import { setLoading } from "../../../commom/redux/application-slice";

export const OnboardingScreen = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: ReduxState) => state.application.isLoading,
  );

  const [section, setSection] = useState(0);
  const [user, setUser] = useState<User>({
    document: "",
    phone: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<UserErrors>({
    document: undefined,
    phone: undefined,
    email: undefined,
    name: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const stepArray = (): Array<{ label: string; selected: boolean }> => [
    {
      label: "1",
      selected: section === 0,
    },
    {
      label: "2",
      selected: section === 1,
    },
    {
      label: "3",
      selected: section === 2,
    },
  ];

  const handleValidation = async (): Promise<void> => {
    try {
      let validateUser;
      if (section === 0) {
        validateUser = await firstUserSchema.validate(user, {
          abortEarly: false,
        });
      } else {
        validateUser = await secondUserSchema.validate(user, {
          abortEarly: false,
        });
      }

      if (validateUser) {
        if (section === 1) {
          await onSubmit();
        } else {
          handleSection(1);
        }
      }
    } catch (error) {
      const validationError = error as ValidationError;

      if (validationError.message !== "User not created") {
        // eslint-disable-next-line array-callback-return
        validationError.inner.map((error: ValidationError) => {
          handleErrors(error);
        });
      }
      else {
        handleSection(-1);
      }
    }
  };

  const navigateToHome = (): void => {
    navigate("/");
  };

  const onSubmit = async (): Promise<void> => {
    const onboarding = new ApplicationOnboardingService();
    const client = new Client();

    dispatch(setLoading(true));

    await onboarding
      .createUser(client, {
        document: user.document.replace(/\D/g, ""),
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone.replace(/\D/g, ""),
      })
      .then(() => {
        handleSection(1);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleErrors = (e: ValidationError): void => {
    setError((prev) => ({ ...prev, [String(e.path)]: e.message }));
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError({ ...error, [event.target.name]: undefined });

    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSection = (value: number): void => {
    if (section + value > 2) {
      setSection(section);
    } else if (section + value <= 2 && section + value > 0) {
      setSection(section + 1);
    } else {
      if (section === 0) {
        navigate(-1);
      } else {
        setSection(0);
      }
    }
  };

  return (
    <Onboarding
      steps={stepArray()}
      error={error}
      handleData={handleData}
      handleSection={handleSection}
      handleValidation={handleValidation}
      section={section}
      user={user}
      handleNavigate={navigateToHome}
      isLoading={isLoading}
    />
  );
};
