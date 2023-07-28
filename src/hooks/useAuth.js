import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connectors";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { message } from "antd";
import { useState } from "react";
import { toHex } from "../utils/utility";

// import { ConnectWallet } from "../Redux/actions";
export const useAuth = () => {
  const [open, setOpen] = useState(false);
  const { activate, deactivate, library } = useWeb3React();
  const history = useHistory();

  const login = () => {
    try {
      activate(injected);
    } catch (error) {
      console.error(error);
    }
  };

  const switchNetwork = async (chainId) => {
    console.log(chainId);
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(parseInt(chainId)) }],
    });
  };

  const logout = async () => {
    // refreshState();
    localStorage.setItem("walletConnect", JSON.stringify({ isConnect: false }));
    deactivate();
  };
  return {
    login,
    logout,
    switchNetwork,
  };
};

export default useAuth;
