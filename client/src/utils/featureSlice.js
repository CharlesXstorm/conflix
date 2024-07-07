/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const featureSlice = createSlice({
  name: "feature",
  initialState: { overflowValue: 'auto', focus: {},search:""  },
  reducers: {
    setOverflow: (state, action) => {
      state.overflowValue = action.payload;
    },
    setFocus: (state, action) => {
      state.focus = action.payload;
    },
    setSearch: (state,action)=>{
      state.search = action.payload;
    }
  }
});

//Action creators are generated for each case reducer function
export const { setOverflow,setFocus, setSearch } = featureSlice.actions;

export default featureSlice.reducer;
