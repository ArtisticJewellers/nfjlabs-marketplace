import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const nftDataSlice = createSlice({
  name: "nftData",
  initialState: {
    nftData: [],
    filterNFTData: {},
  },
  reducers: {
    setNftData: (state, action) => {
      state.nftData = action.payload;
    },
    filterNFT: (state, action) => {
      state.filterNFTData = action.payload;
    },
  },
});

export const { setNftData, filterNFT } = nftDataSlice.actions;

export default nftDataSlice.reducer;
