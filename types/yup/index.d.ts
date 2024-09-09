/* eslint-disable @typescript-eslint/method-signature-style */
// types/yup/index.d.ts

import * as yup from "yup";

declare module "yup" {
  interface StringSchema {
    cpf(message?: string): StringSchema;
    phone(message?: string): StringSchema;
    alphanumericAppPassword(message?: string): StringSchema;
    dateTime(message?: string): StringSchema;
    date(message?: string): StringSchema;
  }

  interface NumberSchema {
    notZero(message?: string): NumberSchema;
  }
}
