import { invalidEmail, positive, requiredField } from "../validation-messages";
import Yup from "../yup";

export const firstUserSchema = Yup.object({
  email: Yup.string().email(invalidEmail).required(requiredField),
  document: Yup.string().cpf().required(requiredField),
  phone: Yup.string().phone().required(requiredField),
});

export const secondUserSchema = Yup.object({
  name: Yup.string().required(requiredField),
  password: Yup.string().alphanumericAppPassword().required(requiredField),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem corresponder")
    .required(requiredField),
});

export const loginSchema = Yup.object({
  email: Yup.string().email(invalidEmail).required(requiredField),
  password: Yup.string().alphanumericAppPassword().required(requiredField),
});

export const advertiseSchema = Yup.object({
  startDate: Yup.string().required(requiredField),
  endDate: Yup.string().required(requiredField),
  name: Yup.string().required(requiredField),
  description: Yup.string().required(requiredField),
  file: Yup.string().required(requiredField).nullable()
});

export const updateAdvertiseSchema = Yup.object({
  startDate: Yup.string().required(requiredField),
  endDate: Yup.string().required(requiredField),
  name: Yup.string().required(requiredField),
  description: Yup.string().required(requiredField)
});

export const expenditureSchema = Yup.object({
  expenditureTypeId: Yup.number().notZero().required(requiredField),
  value: Yup.number().positive(positive).required(requiredField).nullable(),
  dueDate: Yup.string().date().required(requiredField),
})

export const expenditurePayedDateSchema = Yup.object({
  payedDate: Yup.string().date().required(requiredField).nullable()
})

export const installmentsSchema = Yup.object({
  fee: Yup.number().positive(positive).nullable(),
  dueDate: Yup.string().date().required(requiredField),
  parcels: Yup.number().notZero().required(requiredField).nullable(),
  expenditureTypeId: Yup.number().notZero().required(requiredField),
  value: Yup.number().positive(positive).required(requiredField).nullable()
})

export const expenditureTypeSchema = Yup.object({
  name: Yup.string().required(requiredField),
})

export const updateUserData = Yup.object({
  email: Yup.string().email(invalidEmail).notRequired(),
  phone: Yup.string().notRequired(),
});

export const incomeSchema = Yup.object({
  amount: Yup.number().positive(positive).required(requiredField).nullable(),
  date: Yup.string().date().required(requiredField),
  type: Yup.string().required(requiredField),
})