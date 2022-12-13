import { store } from "../store";

export const ConnectWallet = (address) => {
  store.dispatch({
    type: "CONNECT_WALLET",
    status: true,
  });
  console.log(store.getState());
};

export const DisconnectWallet = () => {
  store.dispatch({
    type: "DISCONNECT_WALLET",
    status: false,
  });
};

export const WalletProvider = (provider) => {
  store.dispatch({
    type: "WALLET_PROVIDER",
    provider: provider,
  });
};

export const IsNetwokrCorrect = (status) => {
  store.dispatch({
    type: "IS_NETWOKR_CORRECT",
    status: status,
  });
};
