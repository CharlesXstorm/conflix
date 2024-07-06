/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "account",
  initialState: { profile: null, data: null, watchList: [], focus: {} },
  reducers: {
    setProfile: (state, action) => {
      state.profile = { ...action.payload };
    },
    setWatchList: (state, action) => {
      state.watchList = [...action.payload];
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFocus: (state, action) => {
      state.focus = action.payload;
    }
  }
});

//Action creators are generated for each case reducer function
export const { setProfile, setData, setWatchList,setFocus } = profileSlice.actions;

export default profileSlice.reducer;
