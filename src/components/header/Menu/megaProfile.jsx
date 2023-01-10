import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "../../../views/pages/account/UserProfile";

const RightMenu = [
  {
    icon: "edit",
    title: "Edit Profile",
    link: "/edit-profile",
  },
  {
    icon: "user",
    title: "View Profile",
    link: "/user-profile",
  },
  {
    icon: "upload",
    title: "Create NFT",
    link: "/upload",
  },
  {
    icon: "user",
    title: "Complete KYC",
    link: "/kyc",
  },
  {
    icon: "user",
    title: "My Collections",
    link: "/collections",
  },
];

function MegaProfile() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 space-y-10">
          {RightMenu.map((val, i) => (
            <li key={i}>
              <Link to={val.link}>
                <i className={`ri-${val.icon}-line`} />
                {val.title}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MegaProfile;
