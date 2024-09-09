import { requiredField } from "../../../../../../utils/validation-messages";
import Yup from "../../../../../../utils/yup";

export const createEventValidation = Yup.object({
  name: Yup.string().required(requiredField),
  capacity: Yup.number().required(requiredField),
  description: Yup.string().required(requiredField),
  startDate: Yup.string().required(requiredField),
  endDate: Yup.string().required(requiredField),
});
