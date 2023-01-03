import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

import {
  BannerNft,
  FeatureNft,
  GetPopularCreators,
  SignIn,
  TrendingNft,
  UserDetails,
  WalletId,
} from "../../graphql/query";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { WALLET_ALERT } from "../../config/constant/alert";
import { MdVerified } from "react-icons/md";
import { FollowUser } from "../../graphql/mutations";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { ChainsInfo } from "../../config/config-chains";
import Navbar from "../../components/header/Navbar/Navbar";
import Typewriter from "typewriter-effect";
import jhumka from "../../assets/nfts/jhumka.gif";
import dolce from "../../assets/nfts/alessio/dolce.gif";
import ring2 from "../../assets/nfts/ring2.gif";
import Alert from "react-bootstrap/Alert";
import Sub_Cat_Card from "../../components/subCatCard/Sub_Cat_Card";

const Marketplace = () => {
  const [show, setShow] = useState(true);
  const { data: banner_nft } = useQuery(BannerNft, {
    variables: { popularCollection: "banner_nft" },
  });

  return (
    <div>
      <Header />
      {show && (
        <Alert
          style={{ textAlign: "center" }}
          variant="warning"
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>This Website Is Under Beta Version</Alert.Heading>
          <p>All NFTs You See Are The Demo NFTs</p>
        </Alert>
      )}
      {/* //HeaderMarketplace Collection*/}
      <div>
        <>
          <div>
            <div>
              <div className="hero__1 px-2">
                <div className="py-5 container">
                  <div className="row align-items-center justify-content-center md:justify-content-between">
                    <div className="col-lg-6">
                      <div className="hero__left space-y-20">
                        <div style={{ display: "flex" }}>
                          <h1
                            className="hero__title"
                            style={{ fontWeight: "700", marginRight: "10px" }}
                          >
                            All
                          </h1>
                          <h1
                            className="hero__title"
                            style={{ fontWeight: "700" }}
                          >
                            <Typewriter
                              options={{
                                strings: ["Jewellery", "Gems"],
                                autoStart: true,
                                loop: true,
                              }}
                            />
                          </h1>
                        </div>
                        <h1
                          className="hero__title"
                          style={{ fontWeight: "700", marginTop: "-22px" }}
                        >
                          One Platform 💎
                        </h1>
                        <p className="hero__text txt">
                          NFJLabs seeks to establish a bridge between the
                          jewellery industry and the NFT world.
                        </p>
                        <div
                          className="space-x-20 d-flex flex-md-row sm:space-y-20"
                          style={{ width: "100%", alignItems: "center" }}
                        >
                          <Link
                            to={"/explore/jewellery"}
                            className="btn btn-grad1 btn-border"
                            rel="noreferrer"
                          >
                            Jewellery
                          </Link>
                          <Link
                            to={"/explore/gems"}
                            className="btn btn-grad2 btn-border"
                            rel="noreferrer"
                            style={{ margin: "0 10px" }}
                          >
                            Gems <i class="ri-arrow-right-s-line"></i>
                          </Link>
                        </div>
                        <div>
                          We accept:{" "}
                          <img
                            width={18}
                            src="https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912"
                            alt="matic"
                            style={{ marginLeft: "5px" }}
                          ></img>
                          <img
                            width={18}
                            src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png"
                            alt="eth"
                            style={{ marginLeft: "5px" }}
                          ></img>
                          <img
                            width={18}
                            src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Binance-Coin-BNB-icon.png"
                            alt="bnb"
                            style={{ marginLeft: "5px" }}
                          ></img>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 align-items-center sectionMa"
                    >
                      <div className="mainHeroDiv">
                        <div className="mainImg1Div">
                          <div className="img1Div">
                            <Link
                              to={
                                "item/binance/0x890d7056337B8456550b3287725096815C3CCDD9/5"
                              }
                            >
                              <img
                                src={jhumka}
                                alt="image1hero"
                                className="ImageStyles"
                              />
                            </Link>
                            <div className="hidden1Div">
                              <h2>
                                Aleksandra{" "}
                                <MdVerified color="#009eee" size={20} />
                              </h2>
                              <span>The Avya Jhumka</span>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{ width: "50%" }}
                          className="mobileViewGayab"
                        >
                          <div className="img2Div">
                            <Link
                              to={
                                "item/binance/0x890d7056337B8456550b3287725096815C3CCDD9/11"
                              }
                            >
                              <img
                                src={dolce}
                                alt="image1hero"
                                className="ImageStyles"
                              />
                            </Link>
                            <div className="hidden2Div">
                              <h2>
                                @Aleesio.B{" "}
                                <MdVerified color="#009eee" size={15} />
                              </h2>
                              <span>Dolce Vita</span>
                            </div>
                          </div>
                          <div className="img3Div">
                            <Link
                              to={
                                "item/binance/0x890d7056337B8456550b3287725096815C3CCDD9/3"
                              }
                            >
                              <img
                                src={ring2}
                                alt="image1hero"
                                className="ImageStyles"
                              />
                            </Link>
                            <div className="hidden3Div">
                              <h2>
                                Aleksandra{" "}
                                <MdVerified color="#009eee" size={15} />
                              </h2>
                              <span>Basic Band</span>
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
        </>

        <div
          style={{
            background: "linear-gradient(180deg, #000 60%, #FFF 40%)",
            padding: " 30px 10px",
          }}
        >
          <div>
            <div className=" py-2 " style={{ margin: "0 30px" }}>
              <h3 style={{ color: "#8C52FF" }}>Trending Jewellery</h3>
              <p style={{ color: "white", marginBottom: "16px" }}>
                These are some of the most trending jewellery nfts on our NFJ
                marketplace.
              </p>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <TrendingNfts />
              </div>
            </div>
          </div>
        </div>
        {/* //Feature NFT  */}
        <div
          style={{
            background: "linear-gradient(180deg, #000 60%, #FFF 40%)",
            padding: "30px 0",
            // paddingBottom: "80px",
          }}
        >
          <div>
            <div className="py-2 mb-2" style={{ margin: "0 30px" }}>
              <h3 style={{ color: "#8C52FF" }}>Featured Gems Collections</h3>
              <p style={{ color: "white" }}>
                Top quality gems are featured on NFJ Marketplace
              </p>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <FeaturedNfts />
              </div>
            </div>
          </div>
        </div>

        {/* //Top Artist */}
        <div
          style={{
            background: "linear-gradient(180deg, #fff 50%, #000 50%)",
            padding: " 30px 10px",
          }}
        >
          <div>
            <div
              className=" py-5"
              style={{ textAlign: "end", margin: "0 30px" }}
            >
              <h3 style={{ color: "#000", fontWeight: "bold" }}>Top Artists</h3>
              <p style={{ color: "#000000ab", fontWeight: "bold" }}>
                The best artists in the world in one place, handpicked and{" "}
                <br></br> curated pieces just the way our clients like it.
              </p>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <TopArtist />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const FeaturedNfts = () => {
  const { data: featured_nft } = useQuery(FeatureNft, {
    variables: { popularCollection: "featured_nft" },
  });
  const subCatList = [
    {
      name: "Ruby",
      image:
        "https://gateway.ipfscdn.io/ipfs/QmcXb3RuFYNJksGsu12L5d32NqBZmkTEPCMSzbJzmaYig6/gp106823-3-041122.webp",
    },
    {
      name: "Sapphire",
      image:
        "https://gateway.ipfscdn.io/ipfs/QmPHNhv5SJ9AfFakG9xY1bZte1GCfW6XbZ2jTjavCVBK8D/Graphics.gif",
    },
    {
      name: "Emrald",
      image:
        "https://gateway.ipfscdn.io/ipfs/QmXFLTNy5f2HwFbXaJBsTZUx7etrZpjvqdJFvpRmZKxGDq/gp94696-3-160222%20(1).webp",
    },
    {
      name: "Diamond",
      image:
        "https://i.pinimg.com/736x/ce/1a/d9/ce1ad9fd2a1d0d54a30262cd25fe776c.jpg",
    },
    {
      name: "Pearl",
      image:
        "https://gateway.ipfscdn.io/ipfs/QmT1ehB7jUA2eZJFv4vEhhV5Q6Rh8X5kwJ2337Urw7iiny/Pearl.gif",
    },
    {
      name: "Opal",
      image:
        "https://gateway.ipfscdn.io/ipfs/QmT1ehB7jUA2eZJFv4vEhhV5Q6Rh8X5kwJ2337Urw7iiny/Pearl.gif",
    }
  ];
  return (
    <>
      <div>
        <Swiper
          slidesPerView={6}
          spaceBetween={70}
          slidesPerGroup={6}
          loop={false}
          loopFillGroupWithBlank={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <Swiper
            slidesPerView={3}
            spaceBetween={70}
            slidesPerGroup={3}
            loop={false}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {subCatList.map((val, index) => (
              <>
                <SwiperSlide index={index}>
                  <SubCategoryCard val={val} />
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </Swiper>
      </div>
    </>
  );
};

const TrendingNfts = () => {
  const { data: trending_nft } = useQuery(TrendingNft, {
    variables: { popularCollection: "trending_nft" },
  });
  console.log(trending_nft?.allTrendingNft);
  return (
    <>
      <div>
        <Swiper
          slidesPerView={6}
          spaceBetween={70}
          slidesPerGroup={6}
          loop={false}
          loopFillGroupWithBlank={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {trending_nft?.allTrendingNft?.trendingNft?.map((val, index) => (
            <>
              <SwiperSlide index={index}>
                <NftCard val={val} />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
};
const TopArtist = () => {
  const { data: artist } = useQuery(GetPopularCreators, {
    variables: { popularCollection: "top_creators" },
  });

  return (
    <>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={80}
          slidesPerGroup={4}
          loop={false}
          loopFillGroupWithBlank={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {artist?.allArtist?.users?.map((val, index) => (
            <>
              {val.isVerified && (
                <SwiperSlide index={index}>
                  <ArtistCard val={val} />
                </SwiperSlide>
              )}
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
};
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
      <div key={index} style={{ width: "100%" }}>
        <div className="" style={{ cursor: "pointer" }}>
          <div className="card__item" style={{ padding: "20px" }}>
            <div className="card_body space-y-10">
              <Link to={"/profile/" + data?.walletId?.address}>
                <div style={{ position: "relative" }}>
                  <div style={{ height: "100px" }}>
                    <img
                      src={val?.bg_image}
                      alt="backgroundImage"
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
                      alt="MainImage"
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
                {val.follower_list.filter((e) => e._id === userInfo?.user?._id)
                  .length > 0 ? (
                  <div
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
                    className="btn-grad btn-border "
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "10px",
                      background: "#f2edf0",
                      border: "1px solid #8C52FF !important",
                      color: "black",
                    }}
                  >
                    UnFollow
                  </div>
                ) : (
                  <div
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
                    className="btn-grad btn-border "
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "10px",
                      background: "#0a64bc",
                    }}
                  >
                    Follow
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function SubCategoryCard({ val }) {
  return (
    <div>
      <Link to={`/explore/gems/${val.name}`}>
        <div className="row mb-30_reset">
          <>
            <div
              className="col-lg-3 col-md-6 col-sm-6"
              style={{ maxWidth: "25rem", width: "100%" }}
            >
              <div className="card__item two">
                <div className="card_body space-y-10">
                  {/* =============== */}

                  <div className="card_head">
                    <img src={val.image} alt="nftimage" />
                  </div>
                  {/* =============== */}
                  <h6 className="card_title">{val.name}</h6>
                </div>
              </div>
            </div>
          </>
        </div>
      </Link>
    </div>
  );
}

function NftCard({ val }) {
  const { data: userInfo } = useQuery(SignIn, {
    variables: { walletAddress: val.ownerAddress },
  });

  return (
    <div>
      <div className="row mb-30_reset">
        <>
          <div
            className="col-lg-3 col-md-6 col-sm-6"
            style={{ maxWidth: "25rem", width: "100%" }}
          >
            <div className="card__item two">
              <div className="card_body space-y-10">
                {/* =============== */}

                <div className="card_head">
                  <Link
                    to={`/item/${val.network}/${ChainsInfo[val.chainId].NFT_ADDRESS
                      }/${val.tokenId}`}
                  >
                    <img src={val.imageUrl} alt="nftimage" />
                  </Link>
                </div>
                {/* =============== */}
                <h6 className="card_title">{val.name}</h6>
                <span
                  className="txt_sm"
                  style={{
                    color: "#000",
                    fontSize: "10px",
                  }}
                >
                  {val.category}
                </span>

                <div className="card_footer d-block space-y-10">
                  <div className="card_footer d-block space-y-10">
                    <div className="card_footer justify-content-between">
                      <div className="">
                        <p
                          className="txt_sm d-flex flex-column"
                          style={{ margin: 0 }}
                        >
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
                        </p>
                      </div>
                      <div>
                        <div
                          className="py-2  gap-2"
                          style={{ alignItems: "center" }}
                        >
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <img
                              src={userInfo?.signIn?.user?.avatar_url}
                              alt=""
                              style={{
                                borderRadius: "100%",
                                width: "44px",
                                height: "42px",
                                marginRight: "12px",
                                objectFit: "cover",
                              }}
                            ></img>

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
                                  @{userInfo?.signIn?.user?.username}
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
          </div>
        </>
      </div>
    </div>
  );
}
export default Marketplace;
