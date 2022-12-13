import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_white.svg";

function Footer() {
  return (
    <div
      className=""
      style={{
        marginTop: "100px",
      }}
    >
      <footer className="footer__1" style={{ marginTop: "0" }}>
        <div className=" container px-5">
          <div className="row " style={{ marginBottom: "100px" }}>
            <div className="col-lg-6 space-y-20 ">
              <h2 style={{ color: "white", lineHeight: 1.4 }}>
                Learn More About Non-Fungible
                <br /> Jewellery & The
                <br /> NFJLabs!
              </h2>
            </div>
            <div
              className="col-lg-6"
              style={{ textAlign: "center", alignSelf: "center" }}
            >
              <a href="https://nfjlabs.com/" target="_blank">
                <span className=" btn btn-grad btn-tran">
                  Visit Our Webiste
                </span>
              </a>
            </div>
          </div>
        </div>
        <div
          className=""
          style={{
            padding: "5px",
            margin: "50px 0 ",
            background: "linear-gradient(90deg, #4B2BE9,#E70FD1, #F0F442)",
          }}
        >
          { }{" "}
        </div>
        <div className="container px-5">
          <div className="row">
            <div className="col-lg-6 space-y-20">
              <div className="footer__logo">
                <Link to="/">
                  <img src={logo} alt="logo" id="logo_js_f" width="150" />
                </Link>
              </div>

              <div>
                <ul className="footer__social space-x-10 mb-40">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100085564748795"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-facebook-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/nfjlabs"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-twitter-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/nfjlabs/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="ri-instagram-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=iwiSv0bwuJE"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="ri-youtube-line" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <h6 className="footer__title" style={{ color: "#E20EF9" }}>
                Marketplace
              </h6>
              <ul className="footer__list">
                <li>
                  <Link to="/explore" style={{ color: "white" }}>
                    Explore{" "}
                  </Link>
                </li>
                <li>
                  <Link to="live-auctions" style={{ color: "white" }}>
                    {" "}
                    Live Auctions
                  </Link>
                </li>
                <li>
                  <Link to="/artists" style={{ color: "white" }}>
                    {" "}
                    Artists
                  </Link>
                </li>{" "}
                <li>
                  <a
                    href="https://mv.ibentos.com/rnd/artGallary2022/"
                    style={{ color: "white" }}
                    target="_blank"
                  >
                    Metaverse
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-6">
              <h6 className="footer__title" style={{ color: "#E20EF9" }}>
                Company
              </h6>
              <ul className="footer__list">
                <li>
                  <Link to="/privacy" style={{ color: "white" }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" style={{ color: "white" }}>
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/contact" style={{ color: "white" }}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" style={{ color: "white" }}>
                    Faqs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="copyright text-center" style={{ color: "white" }}>
            2022 © NFJ Labs{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
