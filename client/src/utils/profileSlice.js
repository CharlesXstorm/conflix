/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "account",
  initialState: { profile: null,data: null },
  reducers: {
    setProfile: (state, action) => {
      state.profile = { ...action.payload };
    },
    setData: (state, action) => {
      state.data =  action.payload ;
    }
  }
});

//Action creators are generated for each case reducer function
export const { setProfile, setData } = profileSlice.actions;

export default profileSlice.reducer;
