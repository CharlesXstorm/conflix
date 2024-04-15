import { configureStore } from "@reduxjs/toolkit";
import dvWidthReducer from "./dvWidthSlice";
import profileReducer from "./profileSlice";

export default configureStore({
  reducer: {
    dvWidth: dvWidthReducer,
    profile: profileReducer
  }
});
