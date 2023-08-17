import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ChainsInfo } from "../../config/config-chains";
import { isImage } from "../../utils/utility";

const CardProfile = ({ creatorData, ownedNFTs }) => {

  const Card = ({ val, i }) => {
    const [isVideo, setisVideo] = useState();
    useEffect(() => {
      const _isVideo = async () => {
        if (await isImage(val?.imageUrl)) {
          setisVideo(false);
        } else {
          setisVideo(true);
        }
      };
      _isVideo();
    }, []);
return (  <>
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
              {isVideo ? (<video
                // className="item_img"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={val.imageUrl}
                autoPlay="autoplay"
                loop="true"
              ></video>) :
                (<img
                  src={val.imageUrl}
                  alt="nftimage"
                />)
              }
            </Link>
            {/*
           */}
          </div>
          {/* =============== */}
          <h6 className="card_title">{val.name}</h6>
          <p></p>
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
                        src={creatorData?.avatar_url}
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
                        {val.ownerAddress == val.creatorAddress ? <div
                          style={{
                            color: "#808080",
                            fontSize: "12px",
                          }}
                        >
                          Artist
                        </div> : <div
                          style={{
                            color: "#808080",
                            fontSize: "12px",
                          }}
                        >
                          Owner
                        </div>}

                        <div
                          style={{
                            color: "#000",
                            fontSize: "10px",
                          }}
                        >
                          @{creatorData?.username}
                        </div>
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
  )}
</>)
  }
  return (
    <div className="row mb-30_reset">
      {/* {creatorData?.nfts?.map((val, i) => (
        <>
          {val.isApproved && (
            <div
              className="col-lg-3 col-md-6 col-sm-6"
              key={i}
              style={{ maxWidth: "21rem", width: "100%" }}
            >
              <div className="card__item four">
                <div className="card_body space-y-10">

                  <div className="card_head">
                    <Link
                      to={`/item/${val.network}/${ChainsInfo[val.chainId].NFT_ADDRESS
                        }/${val.tokenId}`}
                    >
                      {val.imageUrl?.includes(".mp4") ? (<video
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        src={val.imageUrl}
                        autoPlay="autoplay"
                        loop="true"
                      ></video>) :
                        (<img
                          src={val.imageUrl}
                          alt="nftimage"
                        />)
                      }
                    </Link>
                  </div>
                  <h6 className="card_title text-capitalize">{val.name}</h6>
                  <p>
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
          )}
        </>
      ))} */}


      {ownedNFTs?.getNftsOfUser?.map((val, i) => (
      <Card val={val} i={i}/>
      ))}
    </div>
  );
};

export default CardProfile;
