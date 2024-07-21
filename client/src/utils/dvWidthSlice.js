/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export const dvWidthSlice = createSlice({
  name: "dvWidth",
  initialState: {
    isMobile: false,
    isTablet: false,
    isPC: false,
    dvWidth: 0,
    bodyHeight:0
  },
  reducers: {
    getWidth: (state, action) => {
      switch (action.payload > 0) {
        case action.payload <= 500:
          return { isMobile: true, isTablet: false, isPC: false, dvWidth:action.payload };
        case action.payload > 500 && action.payload < 1024:
          return { isMobile: false, isTablet: true, isPC: false, dvWidth:action.payload };
        case action.payload >= 1024:
          return { isMobile: false, isTablet: false, isPC: true, dvWidth:action.payload };
        default:
          return;
      }
    },
    setBodyHeight: (state,action) => {
      state.bodyHeight = action.payload
    }

    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // }
  }
});

//Action creators are generated for each case reducer function
export const { getWidth,setBodyHeight } = dvWidthSlice.actions;

export default dvWidthSlice.reducer;
