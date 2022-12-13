import { useLazyQuery, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import React, { Children, useState } from "react";
import { WalletValidationContext } from "../context/WalletValidationContext";
import { SignIn } from "../graphql/query";
function WalletValidationProvider({ children }) {
  const { active, account } = useWeb3React();
  const [isVerify, setVerify] = useState(false);
  const { data: signIn } = useQuery(SignIn, {
    skip: !active,
    variables: {
      walletAddress: account,
    },
  });
  return (
    <>
      <WalletValidationContext.Provider
        value={{
          isVerify: isVerify,
          checkVerification: async () => {
            const check = signIn?.signIn;
            console.log(check);
            return check;
          },
        }}
      >
        {children}
      </WalletValidationContext.Provider>
    </>
  );
}

export default WalletValidationProvider;
