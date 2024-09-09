import { ApplicationState } from "../commom/redux/types";
import { UserState } from "../web/login/redux/types";

export interface ReduxState {
  user: UserState;
  application: ApplicationState;
}
