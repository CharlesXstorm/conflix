/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const featureSlice = createSlice({
  name: "feature",
  initialState: { overflowValue: 'auto' },
  reducers: {
    setOverflow: (state, action) => {
      state.overflowValue = action.payload;
    }
  }
});

//Action creators are generated for each case reducer function
export const { setOverflow } = featureSlice.actions;

export default featureSlice.reducer;
