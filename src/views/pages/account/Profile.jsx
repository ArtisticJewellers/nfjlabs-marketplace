import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { Tabs } from "react-tabs";
import useDocumentTitle from "../../../components/useDocumentTitle";
import { Link, useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { truncateAddress } from "../../../utils/utility";
import { useLazyQuery } from "@apollo/client";
import { GetNftsOfUser, UserDetails } from "../../../graphql/query";
import { ChainsInfo } from "../../../config/config-chains";
import { MdVerified } from "react-icons/md";

const Profile = () => {
  useDocumentTitle("NFJ Labs-Marketplace");
  const [creatorData, setCreatorData] = useState([]);
  const { address } = useParams();
  const [userInfo] = useLazyQuery(UserDetails);

  useEffect(() => {
    userInfo({
      variables: {
        walletAddress: address,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.user !== null) setCreatorData(res.data.user);
    });
  }, []);
  return (
    <div>
      <Header />
      <>
        <HeroProfile address={address} creatorData={creatorData} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-7 order-md-0 order-1">
              <SidebarProfile creatorData={creatorData} />
            </div>
            <div className="col-lg-9 col-md-12 order-md-1 order-0">
              <div className="profile__content">
                <div className="d-flex justify-content-between">
                  <Tabs className="space-x-10">
                    <div className="d-flex  justify-content-between"></div>
                    <div className="mt-4  tab-content">
                      <CardProfile creatorData={creatorData} />
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <Footer />
    </div>
  );
};

const HeroProfile = ({ address, creatorData }) => {
  console.log(creatorData);

  return (
    <div className="mb-100">
      <div className="hero__profile">
        <div className="cover">
          <img src={creatorData?.bg_image} alt="ImgPreview" />
        </div>
        <div className="infos">
          <div className="container">
            <div className="row flex-wrap align-items-center justify-content-between sm:space-y-50">
              <div className="col-md-auto mr-20">
                <div className="avatars d-flex space-x-20 align-items-center">
                  <div className="avatar_wrap">
                    <img
                      className="avatar avatar-lg"
                      src={creatorData?.avatar_url}
                      alt="avatar"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h5>@{creatorData?.username}</h5>
                    {creatorData?.isVerified && (
                      <MdVerified
                        color="#009eee"
                        size={20}
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-auto">
                <div className="d-sm-flex flex-wrap align-items-center space-x-20 mb-20_reset d-sm-block">
                  <div className="mb-20">
                    <div className="copy">
                      <span className="color_text">
                        {truncateAddress(address)}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap align-items-center space-x-20">
                    <div className="mb-20"></div>
                    <div className="mb-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SidebarProfile = ({ creatorData }) => {
  console.log(creatorData);
  return (
    <div className="profile__sidebar">
      <div className="space-y-40">
        <div className="space-y-10">
          <h5>About me</h5>
          <div className="box space-y-20">
            <p>{creatorData?.about_details}</p>
            <div className="row">
              <div className="col-6">
                <span className="txt_sm color_text">Creations</span>
                <h4>
                  {creatorData?.nfts?.length ? creatorData?.nfts?.length : 0}
                </h4>
              </div>{" "}
              <div className="col-6">
                <span className="txt_sm color_text">Follower</span>
                <h4>
                  {creatorData?.follower_list?.length
                    ? creatorData?.follower_list?.length
                    : 0}
                </h4>
              </div>
              <div className="col-6">
                <span className="txt_sm color_text">Following</span>
                <h4>
                  {creatorData?.following_list?.length
                    ? creatorData?.following_list?.length
                    : 0}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-10">
          <h5>Follow me</h5>
          <div className="box">
            <ul className="social_profile space-y-10 overflow-hidden">
              {creatorData?.facebookUrl && (
                <li>
                  <a
                    href={creatorData?.facebookUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="ri-facebook-line" />
                    <span className="color_text">facebook</span>
                  </a>
                </li>
              )}
              {creatorData?.twitterUrl && (
                <li>
                  <a
                    href={creatorData?.twitterUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="ri-twitter-line" />
                    <span className="color_text">Twitter</span>
                  </a>
                </li>
              )}{" "}
              {creatorData?.websiteUrl && (
                <li>
                  <a
                    href={creatorData?.websiteUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="ri-website" />
                    <span className="color_text">Website</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
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
                      to={`/item/${val.network}/${
                        ChainsInfo[val.chainId].NFT_ADDRESS
                      }/${val.tokenId}`}
                    >
                      <img alt="nftimage" src={val.imageUrl} />
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
                                <div
                                  style={{
                                    color: "#808080",
                                    fontSize: "12px",
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
        </>
      ))}
    </div>
  );
};
export default Profile;
