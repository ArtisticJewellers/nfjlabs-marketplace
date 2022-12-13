import React from "react";
import {
  ExclamationCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import "./style.css";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex" }}>
        {/* LOGO */}
        <div className="logo">
          <h1 style={{ fontSize: "20px" }}>NFJ Logo</h1>
        </div>

        {/* Change Netowrk */}
        <div>
          <div
            id="pc_changeNetwork"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ExclamationCircleIcon height={27} />
            <h1 className="network-name" style={{ fontSize: "14px" }}>
              Not supported
            </h1>
            <ChevronDownIcon height={27} />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {/* Search */}
        <MagnifyingGlassCircleIcon height={30} />

        {/* Notification and Profile */}
        <div>
          <UserCircleIcon height={30} />
          <Bars3Icon height={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
