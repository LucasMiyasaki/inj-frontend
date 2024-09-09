import { createSlice } from "@reduxjs/toolkit";
import { ApplicationState } from "./types";

const initialState = (): ApplicationState => ({
  isLoading: false,
  isModalLoading: false,
});

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setModalLoading: (state, action) => {
      state.isModalLoading = action.payload;
    },
  },
});

export const { setLoading, setModalLoading } = applicationSlice.actions;
export default applicationSlice.reducer;
