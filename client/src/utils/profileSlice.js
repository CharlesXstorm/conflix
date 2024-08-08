/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "account",
  initialState: { profile: null, data: null},
  reducers: {
    setProfile: (state, action) => {
      state.profile = { ...action.payload };
    },
    setWatchList: (state, action) => {
      state.profile = {...state.profile, watchList: [...action.payload]};
    },
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

//Action creators are generated for each case reducer function
export const { setProfile, setData, setWatchList } = profileSlice.actions;

export default profileSlice.reducer;
