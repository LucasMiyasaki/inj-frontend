import { requiredField } from "../../../../../../utils/validation-messages";
import Yup from "../../../../../../utils/yup";

export const createBookValidation = Yup.object({
  name: Yup.string().required(requiredField),
  author: Yup.string().required(requiredField),
  publisher: Yup.string().required(requiredField),
  year: Yup.number().required(requiredField),
  type: Yup.string().required(requiredField),
  file: Yup.mixed().required(requiredField),
});
