import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div>
      <Result
        status="success"
        title="Successfully Minted NFT"
        subTitle="Go to home page and check your newly minted nft."
        extra={[
          <Link to="/">
            <span className="btn btn-grad btn-border">Go Home</span>
          </Link>,
        ]}
      />
    </div>
  );
}

export default Success;
