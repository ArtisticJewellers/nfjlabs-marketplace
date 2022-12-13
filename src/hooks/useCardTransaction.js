import React from "react";
import transakSDK from "@transak/transak-sdk";
import { useWeb3React } from "@web3-react/core";

function useCardTransaction() {
  const { account, active } = useWeb3React();
  const initCardTransaction = () => {
    let transak = new transakSDK({
      apiKey: "4fcd6904-706b-4aff-bd9d-77422813bbb7", // Your API Key (Required)
      environment: "STAGING", // STAGING/PRODUCTION (Required)
      walletAddress: account, // Your customer wallet address
      themeColor: "000000", // App theme color in hex
      email: "", // Your customer email address (Optional)
      redirectURL: "",
      widgetHeight: "550px",
      widgetWidth: "450px",
    });
    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data);
    });

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
      transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });
  };

  return { initCardTransaction };
}

export default useCardTransaction;
