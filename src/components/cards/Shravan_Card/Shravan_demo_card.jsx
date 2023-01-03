import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ChainsInfo } from "../../../config/config-chains";

function SearchNFTData({ searchNFTData }) {
  return (
    <div style={{ width: "100%" }}>
      <div className="row mb-30_reset InnerDivCards">
        <div
          className="col-lg-3 col-md-6 col-sm-6"
          style={{ minWidth: "25rem", maxWidth: "25rem", width: "100%" }}
        >
          <div className="card__item two">
            <div className="card_body space-y-10">
              {/* =============== */}

              <div className="card_head">
                <Link
                  to={`/item/${searchNFTData.network}/${ChainsInfo[searchNFTData.chainId].NFT_ADDRESS
                    }/${searchNFTData.tokenId}`}
                >
                  <img src={searchNFTData.imageUrl} alt="nftimage" />
                </Link>
                {/*
                 */}
              </div>
              {/* =============== */}
              <h6 className="card_title">{searchNFTData.name}</h6>

              <div className="card_footer d-block space-y-10">
                <div className="card_footer d-block space-y-10">
                  <div className="card_footer justify-content-between">
                    <div className="">
                      <p
                        className="txt_sm d-flex flex-column"
                        style={{ margin: 0 }}
                      >
                        {searchNFTData.isListed ? (
                          <>
                            {" "}
                            <span
                              style={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              Price:
                            </span>
                            <span
                              className="txt_sm"
                              style={{
                                color: "#000",
                                fontSize: "10px",
                              }}
                            >
                              {searchNFTData.price}{" "}
                              {
                                ChainsInfo[searchNFTData.chainId]
                                  .CURRENCY_SYMBOL
                              }
                            </span>
                          </>
                        ) : (
                          <span
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            Not Listed
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <div
                        className="py-2 d-flex gap-2"
                        style={{ alignItems: "center" }}
                      >
                        {/* Hidden  */}
                        {/* <div>
                          <img
                            src={searchNFTData?.ownerUserId[0]?.avatar_url}
                            alt=""
                            width="40px"
                            height="40px"
                            style={{
                              borderRadius: "9999px",
                              objectFit: "cover",
                            }}
                          ></img>
                        </div> */}

                        <Link to={"/profile/" + searchNFTData.ownerAddress}>
                          <div>
                            <div
                              style={{
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              Artist
                            </div>
                            {/* Hidden */}
                            {/* <div
                              style={{
                                color: "#000",
                                fontSize: "10px",
                              }}
                            >
                              @{searchNFTData?.ownerUserId[0]?.username}
                            </div> */}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchNFTData;
