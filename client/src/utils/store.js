import { configureStore } from "@reduxjs/toolkit";
import deviceInfoReducer from "./deviceInfoSlice";
import profileReducer from "./profileSlice";
import validatorReducer from "./validatorSlice";
import featureReducer from "./featureSlice";

export default configureStore({
  reducer: {
    deviceInfo: deviceInfoReducer,
    account: profileReducer,
    validator: validatorReducer,
    feature: featureReducer
  }
});

