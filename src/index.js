import React, { useContext } from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import LoadingProvider from "./provider/LoadingProvider";
import WalletValidationProvider from "./provider/WalletValidationProvider";

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000; // frequency provider is polling
  return library;
}
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  // uri: "http://192.168.0.101:5000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <WalletValidationProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </WalletValidationProvider>
      </ApolloProvider>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById("root")
);
