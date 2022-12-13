import { useWeb3React } from "@web3-react/core";
import { Dropdown, Menu, Space } from "antd";
import React from "react";
import useAuth from "../hooks/useAuth";
import { toHex } from "../utils/utility";
import eth from "../assets/icon/eth.svg";
import polygon from "../assets/icon/polygon.png";
import bnb from "../assets/icon/bnb.svg";


function SwitchNetwork({ url, networkName }) {
  const { switchNetwork } = useAuth();
  const menu = (
    <Menu
      selectable
      style={{ marginTop: "26px", marginLeft: "8px", padding: "8px" }}
      defaultSelectedKeys={[80001]}
      onClick={async (key) => {
        switchNetwork(key.key);
      }}
      items={[
        {
          label: <div> <img src={eth} style={{ width: "25px", marginRight: "5px" }} /> Ethereum</div>,
          key: 5,
        },
        {
          label: <div> <img src={polygon} style={{ width: "25px", marginRight: "5px" }} />Polygon</div>,
          key: 80001,
        },
        {
          label: <div> <img src={bnb} style={{ width: "25px", marginRight: "8px" }} />Binance</div>,
          key: 97,
        },
      ]}
    />
  );
  return (
    <div>
      {" "}
      <Dropdown overlay={menu} trigger={["click"]}>
        <div>
          <img
            src={url}
            alt={"networkImg"}
            width="30"
            style={{ margin: "0 10px" }}
          />
          <span>{networkName}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" /></svg>
        </div>
      </Dropdown>
    </div>
  );
}

export default SwitchNetwork;
