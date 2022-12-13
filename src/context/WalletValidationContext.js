import React, { useContext } from "react";

export const WalletValidationContext = React.createContext();
export const useWalletValidation = () => useContext(WalletValidationContext);
