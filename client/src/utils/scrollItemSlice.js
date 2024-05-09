/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const scrollItemSlice = createSlice({
  name: "item",
  initialState: { itemInfo: null },
  reducers: {
    setItemInfo: (state, action) => {
      state.itemInfo = { ...action.payload };
    }
  }
});

//Action creators are generated for each case reducer function
export const { setItemInfo } = scrollItemSlice.actions;

export default scrollItemSlice.reducer;
