import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userReducer from "../lib/web/login/redux/user-slice";
import applicationReducer from "../lib/commom/redux/application-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
