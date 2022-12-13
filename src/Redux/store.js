import { createStore } from "redux";
import { walletReducer } from "./reducers/reducers";

export const store = createStore(walletReducer);
