import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = (): UserState => ({
  currentUser: undefined,
});

const expirationTime = 3600;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.currentUser = action.payload.data;
    },
    clearUserData: (state) => {
      state.currentUser = undefined;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
  timeout: expirationTime,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUserData, clearUserData } = userSlice.actions;
export default persistedReducer;
