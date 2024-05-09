import { configureStore } from "@reduxjs/toolkit";
import dvWidthReducer from "./dvWidthSlice";
import profileReducer from "./profileSlice";
import validatorSlice from "./validatorSlice";
import scrollItemSlice from "./scrollItemSlice";

export default configureStore({
  reducer: {
    dvWidth: dvWidthReducer,
    account: profileReducer,
    validator: validatorSlice,
    item: scrollItemSlice
  }
});
