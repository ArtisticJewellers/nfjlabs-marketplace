import React from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ChainsInfo } from "../../config/config-chains";

const CardProfile = ({ creatorData }) => {
  return (
    <div className="row mb-30_reset">
      {creatorData?.nfts?.map((val, i) => (
        <>
          {val.isApproved && (
            <div
              className="col-lg-3 col-md-6 col-sm-6"
              key={i}
              style={{ maxWidth: "21rem", width: "100%" }}
            >
              <div className="card__item four">
                <div className="card_body space-y-10">
                  {/* =============== */}

                  <div className="card_head">
                    <Link
                      to={`/item/${val.network}/${ChainsInfo[val.chainId].NFT_ADDRESS
                        }/${val.tokenId}`}
                    >
                      <img src={val.imageUrl} alt="nftimage" />
                    </Link>
                    {/*
                   */}
                  </div>
                  {/* =============== */}
                  <h6 className="card_title text-capitalize">{val.name}</h6>
                  <p>
                    {" "}
                    {/* {val.userInfo[0].firstname === undefined
                        ? "No name"
                        : val.userInfo[0].firstname}{" "}
                      {val.userInfo[0].lastname === undefined
                        ? ""
                        : val.userInfo[0].lastname} */}
                  </p>
                  <div className="card_footer d-block space-y-10">
                    <div className="card_footer d-block space-y-10">
                      <div className="card_footer justify-content-between">
                        <div className="">
                          <p className="txt_sm d-flex flex-column">
                            <span
                              style={{
                                color: "#808080",
                                fontSize: "12px",
                              }}
                            >
                              Price:
                            </span>
                            <span
                              className="txt_sm"
                              style={{
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              {val.price}{" "}
                              {ChainsInfo[val.chainId].CURRENCY_SYMBOL}
                            </span>
                          </p>
                        </div>
                        <div>
                          <div
                            className="py-2 d-flex gap-2"
                            style={{ alignItems: "center" }}
                          >
                            <div>
                              <img
                                src={creatorData.avatar_url}
                                alt=""
                                width="40px"
                                height="40px"
                                style={{
                                  borderRadius: "9999px",
                                  objectFit: "cover",
                                }}
                              ></img>
                            </div>

                            <div>
                              <div
                                style={{
                                  color: "#808080",
                                  fontSize: "12px",
                                }}
                              >
                                <div>Artist</div>
                                <div style={{ color: "black" }}>
                                  @{creatorData.username}
                                </div>
                              </div>
                              <div
                                style={{
                                  color: "#000",
                                  fontSize: "10px",
                                }}
                              >
                                {/* @{val.userInfo[0].username} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="hr" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default CardProfile;
