import { isCPF, isPhone } from "brazilian-values";
import * as Yup from "yup";
import {
  invalidDocument,
  invalidPhone,
  maxPasswordLength,
  minPasswordLength,
  passwordWithoutNumberDigit,
  passwordWithoutSpecialCharacter,
  passwordWithoutUppercaseLetter,

  invalidDate
} from "./validation-messages";
import PasswordValidator from "password-validator";

const passwordValidate = new PasswordValidator();

Yup.addMethod(Yup.string, "cpf", function (message: string = invalidDocument) {
  return this.test("cpf", message, (value = "") => isCPF(value));
});

Yup.addMethod(Yup.string, "phone", function (message: string = invalidPhone) {
  return this.test("phone", message, (value = "") => isPhone(value));
});

Yup.addMethod(Yup.string, "alphanumericAppPassword", function () {
  return this.min(8, minPasswordLength)
    .max(128, maxPasswordLength)
    .test("contains-digit", passwordWithoutNumberDigit, function (value) {
      return passwordValidate
        .has()
        .digits(1)
        .validate(value ?? "") as boolean;
    })
    .test(
      "contains-uppercase-letter",
      passwordWithoutUppercaseLetter,
      function (value) {
        return passwordValidate
          .has()
          .uppercase()
          .validate(value ?? "") as boolean;
      }
    )
    .test(
      "contains-special-character",
      passwordWithoutSpecialCharacter,
      function (value) {
        return passwordValidate
          .has()
          .symbols(1)
          .validate(value ?? "") as boolean;
      }
    );
});

Yup.addMethod(Yup.string, "dateTime", function (message = invalidDate) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return this.test("dateTime", message, function (value = "") {
    const dateTimeRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{2}\s([01][0-9]|2[0-3]):([0-5][0-9])$/;
    return dateTimeRegex.test(value);
  });
});

Yup.addMethod(Yup.string, "date", function (message = invalidDate) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return this.test("date", message, function (value = "") {
    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{2}$/;
    return dateRegex.test(value);
  });
});

Yup.addMethod(Yup.number, "notZero", function (message = "Campo obrigatório") {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return this.test("notZero", message, function (value) {
    return value !== 0;
  });
});

export default Yup;
