import { configureStore } from "@reduxjs/toolkit";
import dvWidthReducer from "./slice";

export default configureStore({
  reducer: {
    dvWidth: dvWidthReducer
  }
});
