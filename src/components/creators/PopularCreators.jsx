import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import { MdVerified } from "react-icons/md";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GetPopularCreators, UserDetails, WalletId } from "../../graphql/query";
import { FollowUser } from "../../graphql/mutations";
import { WALLET_ALERT } from "../../config/constant/alert";

function PopularCreators() {
  const { data: getPopularCreators } = useQuery(GetPopularCreators, {
    variables: {
      popularCollection: "top_creators",
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section__creators my-100">
      <div className="container">
        <div className="">
          <div className="section_head mb-30">
            <h2 className="section__title text-center">Popular Artists</h2>
          </div>
          <div className="section__body">
            <div className="row mb-20_reset justify-content-start">
              {getPopularCreators?.allArtist?.users?.map((val, index) => (
                <>
                  <ArtistCard index={index} val={val} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ArtistCard = ({ index, val }) => {
  const { account, active } = useWeb3React();
  const { data: userInfo } = useQuery(UserDetails, {
    skip: !active,
    variables: {
      walletAddress: account,
    },
  });
  const [followUser] = useMutation(FollowUser);
  const { data } = useQuery(WalletId, {
    variables: { walletId: val.wallets[0]._id },
  });

  return (
    <>
      <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 mb-20" key={index}>
        <div className="" style={{ cursor: "pointer" }}>
          <div
            className="card__item 
 "
            style={{ padding: "20px" }}
          >
            <div className="card_body space-y-10">
              <Link to={"/profile/" + data?.walletId?.address}>
                <div style={{ position: "relative" }}>
                  <div style={{ height: "100px" }}>
                    <img
                      src={val?.bg_image}
                      alt="dasd"
                      width={"100%"}
                      height={"120px"}
                      style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    ></img>
                  </div>

                  <div
                    style={{
                      height: "100px",
                      width: "100px",
                      margin: "0px auto",
                      position: "relative",
                      // right: "calc(20px + 31%)",
                      top: "-22px",
                      border: "4px solid white",
                      borderRadius: "999px",
                    }}
                  >
                    <img
                      src={val?.avatar_url}
                      alt="dasd"
                      width={"100%"}
                      height={"100%"}
                      style={{
                        objectFit: "cover",
                        borderRadius: "999px",
                      }}
                    ></img>
                  </div>
                </div>
              </Link>
              <div style={{ textAlign: "center", marginTop: "-10px" }}>
                <>
                  <Link to={"/profile/" + data?.walletId?.address}>
                    <div
                      style={{
                        color: "#828282",
                        margin: "5px",
                        marginBottom: "20px",
                      }}
                    >
                      @{val?.username}{" "}
                      {val?.isVerified && (
                        <MdVerified color="#009eee" size={20} />
                      )}
                    </div>
                  </Link>
                </>
                <div
                  className="d-flex justify-content-between py-2"
                  style={{ fontSize: "10px" }}
                >
                  <span>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                      {val?.nfts?.length}
                    </span>{" "}
                    NFTs
                  </span>
                  <span>
                    <span style={{ fontWeight: "bold" }}>
                      {val?.follower_list?.length
                        ? val?.follower_list?.length
                        : 0}
                    </span>{" "}
                    followers
                  </span>
                </div>
                {val.follower_list.filter(
                  (e) => e._id === userInfo?.user?._id
                ).length > 0
                  ? (<div
                    onClick={() => {
                      if (active) {
                        followUser({
                          variables: {
                            followId: val?._id,
                            userId: userInfo?.user?._id,
                          },
                          refetchQueries: [
                            {
                              query: GetPopularCreators,
                              variables: {
                                popularCollection: "top_creators",
                              },
                            },
                            {
                              query: UserDetails,
                              variables: {
                                walletAddress: account,
                              },
                            },
                          ],
                        }).then((res) => console.log(res.data));
                      } else {
                        WALLET_ALERT();
                      }
                    }}
                    className="btn-grad btn-border"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "10px",
                      background: "#f2edf0",
                      border: "1px solid #8C52FF !important",
                      color: "black"
                    }}
                  >
                    UnFollow
                  </div>)
                  : (<div
                    onClick={() => {
                      if (active) {
                        followUser({
                          variables: {
                            followId: val?._id,
                            userId: userInfo?.user?._id,
                          },
                          refetchQueries: [
                            {
                              query: GetPopularCreators,
                              variables: {
                                popularCollection: "top_creators",
                              },
                            },
                            {
                              query: UserDetails,
                              variables: {
                                walletAddress: account,
                              },
                            },
                          ],
                        }).then((res) => console.log(res.data));
                      } else {
                        WALLET_ALERT();
                      }
                    }}
                    className="btn-grad btn-border"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "10px",
                      background: "#8C52FF",
                    }}
                  >
                    Follow
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCreators;
