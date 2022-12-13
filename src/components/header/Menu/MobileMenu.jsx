import React from "react";
import { Link } from "react-router-dom";
const Menu = [
  {
    title: "Explore",
    link: "/explore",
  },
  { title: "Artists", link: "/artists" },
];
function MobileMenu() {
  return (
    <div>
      <div className="header__mobile__menu space-y-40">
        <ul className="d-flex space-y-20">
          {Menu.map((val, i) => (
            <li key={i}>
              <Link to={val.link} className="color_black">
                {val.title}
              </Link>
            </li>
          ))}

          <a
            href="https://mv.ibentos.com/rnd/artGallary2022/"
            target="_blank"
            className="color_black"
            rel="noreferrer"
          >
            Metaverse
          </a>
        </ul>
        <div className="space-y-20">
          <div className="header__search in_mobile w-full">
            <input
              type="text"
              placeholder="Search"
              style={{ paddingLeft: "50px" }}
            />
            <button className="header__result">
              <i className="ri-search-line" />
            </button>
          </div>

          <Link
            to="/connect-wallet"
            className="btn btn-grad btn-sm"
            style={{ cursor: "pointer" }}
          >
            Connect wallet
          </Link>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
