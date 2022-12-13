import React from "react";

function HeroMarketplace() {
  return (
    <div>
      <div>
        <div className="hero__1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="hero__left space-y-20">
                  <h1 className="hero__title">
                    Collect Non-Fungible Jewellery 💎.
                  </h1>
                  <p className="hero__text txt">
                    Artistic Jewellers seeks to establish a bridge between the
                    jewellery industry and the NFT world.
                  </p>
                  <div className="space-x-20 d-flex flex-column flex-md-row sm:space-y-20">
                    <a className="btn btn-primary btn-grad" href="/marketplace">
                      Download Pitch-Deck
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 align-items-center">
                <img
                  className="img-fluid "
                  id="img_js"
                  src="https://artistic.uniqdevs.com/assets/Card.7c8d887b.png"
                  alt="img"
                  width="400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="hero_marketplace bg_white">
        <div className="container">
          <h1 className="text-center">NFT Marketplace</h1>
        </div>
      </div> */}
    </div>
  );
}

export default HeroMarketplace;
