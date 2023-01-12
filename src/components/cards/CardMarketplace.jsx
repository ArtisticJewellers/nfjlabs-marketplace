import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ChainsInfo } from "../../config/config-chains";

function CardMarketplace({ FilterData, searchNFTData }) {
  return (
    <div style={{ width: "100%" }}>
      <div className="row mb-30_reset InnerDivCards">
        {FilterData?.filterNfts?.map((val, i) => (
          <>
            {val.isApproved && !val.isMarketPlace && (
              <div
                className="col-lg-3 col-md-6 col-sm-6"
                key={i}
                style={{ minWidth: "25rem", maxWidth: "25rem", width: "100%" }}
              >
                <div className="card__item two">
                  <div className="card_body space-y-10">
                    {/* =============== */}

                    <div className="card_head">
                      <Link
                        to={`/item/${val.network}/${
                          ChainsInfo[val.chainId].NFT_ADDRESS
                        }/${val.tokenId}`}
                      >
                        {val?.imageUrl?.includes(".mp4") ? (
                          <video
                            // className="item_img"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                            src={val?.imageUrl || searchNFTData.imageUrl}
                            autoPlay="autoplay"
                            loop="true"
                          ></video>
                        ) : (
                          <img
                            src={val?.imageUrl || searchNFTData?.imageUrl}
                            alt="nftimage"
                          />
                        )}
                      </Link>
                      {/*
                       */}
                    </div>
                    {/* =============== */}
                    <h6 className="card_title">{val.name}</h6>

                    <div className="card_footer d-block space-y-10">
                      <div className="card_footer d-block space-y-10">
                        <div className="card_footer justify-content-between">
                          <div className="">
                            <p
                              className="txt_sm d-flex flex-column"
                              style={{ margin: 0 }}
                            >
                              {val.isListed ? (
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
                                    {val.price}{" "}
                                    {ChainsInfo[val.chainId].CURRENCY_SYMBOL}
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
                              <div>
                                <img
                                  src={val?.ownerUserId[0]?.avatar_url}
                                  alt=""
                                  width="40px"
                                  height="40px"
                                  style={{
                                    borderRadius: "9999px",
                                    objectFit: "cover",
                                  }}
                                ></img>
                              </div>

                              <Link to={"/profile/" + val.ownerAddress}>
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
                                  <div
                                    style={{
                                      color: "#000",
                                      fontSize: "10px",
                                    }}
                                  >
                                    @{val?.ownerUserId[0]?.username}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* <div className="hr" /> */}
                      </div>
                      {/* <div className="hr" /> */}
                      {/* <div
                          className="d-flex
           align-items-center
           space-x-10
           justify-content-between"
                        >
                          <Link
                            to={`/item/${getNetworkByChainID(
                              val.chainID
                            )}/${ArtisticJeweller}/${val._id}/${val.nftToken}`}
                          >
                            <div
                              className="btn btn-sm "
                              style={{ backgroundColor: "#4b2be9" }}
                            >
                              Buy NFT
                            </div>
                          </Link>
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default CardMarketplace;
