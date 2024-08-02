import { configureStore } from "@reduxjs/toolkit";
import dvWidthReducer from "./dvWidthSlice";
import profileReducer from "./profileSlice";
import validatorReducer from "./validatorSlice";
import featureReducer from "./featureSlice";

export default configureStore({
  reducer: {
    dvWidth: dvWidthReducer,
    account: profileReducer,
    validator: validatorReducer,
    feature: featureReducer
  }
});

