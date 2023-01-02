import { createStore } from "redux";
import { walletReducer } from "./reducers/reducers";
import { configureStore } from "@reduxjs/toolkit";
import nftDataReducer from "./reducers/nftReducer";
export const store = createStore(walletReducer);

export default configureStore({
  reducer: {
    nftData: nftDataReducer,
  },
});
