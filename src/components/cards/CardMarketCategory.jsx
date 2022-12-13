import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";

function CardMarketCategory({ category }) {
  const [NFTData, setNFTData] = useState([]);

  return (
    <div>
      <div className="row mb-30_reset">
        {NFTData.map(
          (val, i) =>
            val.isApproved &&
            !val.isAuction && (
              <>
                {" "}
                <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                  <div className="card__item four">
                    <div className="card_body space-y-10">
                      {/* =============== */}
                      <div className="creators space-x-10">
                        <div className="avatars space-x-3">
                          <Link to="profile">
                            <img
                              src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80`}
                              alt="Avatar"
                              className="avatar avatar-sm"
                            />
                          </Link>
                          <Link to="profile">
                            <p className="avatars_name txt_xs">0x23454</p>
                          </Link>
                        </div>
                        <div className="avatars space-x-3">
                          <Link to="profile">
                            <img
                              src={`https://t4.ftcdn.net/jpg/02/67/40/21/360_F_267402109_jZvsqRQUvSxohAOmcUt549jlapqoRHM0.jpg`}
                              alt="Avatar"
                              className="avatar avatar-sm"
                            />
                          </Link>
                          <Link to="profile">
                            <p className="avatars_name txt_xs">0x23454</p>
                          </Link>
                        </div>
                      </div>
                      <div className="card_head">
                        <Link>
                          <img
                            src={`https://ipfs.io/ipfs/${val.image}`}
                            alt="nftimage"
                          />
                        </Link>
                        {/*
                         */}
                      </div>
                      {/* =============== */}
                      <h6 className="card_title">{val.nftName}</h6>
                      <div className="card_footer d-block space-y-10">
                        <div className="card_footer justify-content-between">
                          <div className="creators">
                            <p className="txt_sm"> {val.stock} in stock</p>
                          </div>
                          <Link to="#">
                            <p className="txt_sm">
                              Price:
                              <span
                                className="color_green
                                           txt_sm"
                              >
                                {val.price} ETH
                              </span>
                            </p>
                          </Link>
                        </div>
                        {/* <div className="hr" /> */}
                        <div
                          className="d-flex
           align-items-center
           space-x-10
           justify-content-between"
                        >
                          <Link>
                            <div className="btn btn-sm btn-primary btn-grad">
                              Buy NFT
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
        )}
      </div>
    </div>
  );
}

export default CardMarketCategory;
