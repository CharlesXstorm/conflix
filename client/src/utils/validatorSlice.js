/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const validatorSlice = createSlice({
  name: "validator",
  initialState: { emailError: false, passwordError: false },
  reducers: {
    setEmailValidator: (state, action) => {
      state.emailError = action.payload;
    },
    setPasswordValidator: (state, action) => {
      state.passwordError = action.payload;
    }
  }
});

//Action creators are generated for each case reducer function
export const { setEmailValidator, setPasswordValidator } =
  validatorSlice.actions;

export default validatorSlice.reducer;
