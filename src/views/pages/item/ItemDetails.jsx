import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { Link, useParams } from "react-router-dom";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button, DatePicker, Form, Input, Modal, Tabs } from "antd";
import useDocumentTitle from "../../../components/useDocumentTitle";
import "reactjs-popup/dist/index.css";
import Loading from "../../../components/Loading/Loading";
import CounterComponent from "../../../components/CountDown/Counter";
import useNFT from "../../../hooks/useNFT";
import useStorage from "../../../hooks/useStorage";
import {
  decimalToInt,
  getIPFSLink,
  truncateAddress,
} from "../../../utils/utility";

import { useWeb3React } from "@web3-react/core";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GetAllNfts,
  GetNftDetails,
  GetNftTrans,
  NftUpdate,
  SignIn,
} from "../../../graphql/query";
import { ChainsInfo } from "../../../config/config-chains";
import { getNetworkChainID } from "../../../utils/utility";
import { useLoading } from "../../../context/LoadingContext";
import {
  BUY_NFT_ALERT,
  CANCEL_BID_ALERT,
  PLACE_BID_ALERT,
  PLACE_BID_AMOUNT_ALERT,
  PUT_AUCTION_ALERT,
  PUT_SALE_ALERT,
  REMOVE_AUCTION_ALERT,
  REMOVE_SALE_ALERT,
  SOMTHING_WENT_WRONG_ALERT,
  TOKEN_SUFFICIENT_AMOUNT_ALERT,
  WALLET_ALERT,
} from "../../../config/constant/alert";
import {
  CreateTrans,
  NftOwnerUpdate,
  NftListed,
} from "../../../graphql/mutations";
import { TransStatus } from "../../../config/constant/enum";
import moment from "moment";
import Badge from "react-bootstrap/Badge";

// Random component
const ItemDetails = () => {
  useDocumentTitle("Item Details");
  const [saleDetails, setSaleDetails] = useState({});
  const [auctionDetails, setAuctionDetails] = useState({});
  const [AllBiddres, setAllBiddres] = useState([]);
  const { network, address, tokenId } = useParams();
  const { showLoading, hideLoading } = useLoading();

  const {
    getNftTokenIdData,
    putOnAuction,
    putOnSale,
    approveNFT,
    auctionDataset,
    SaleDataset,
    removeFromSale,
    cancelAuction,
    bidCancelByUser,
    purchaseNFT,
    placeBid,
    approveToken,
    getAllBidders,
    getTokenBalance,
  } = useNFT();

  let blockURL = "";
  if (ChainsInfo[getNetworkChainID(network)].CHAIN_ID == 1) {
    blockURL = "https://etherscan.io/";
  } else if (ChainsInfo[getNetworkChainID(network)].CHAIN_ID == 137) {
    blockURL = "https://polygonscan.com/";
  } else if (ChainsInfo[getNetworkChainID(network)].CHAIN_ID == 80001) {
    blockURL = "https://mumbai.polygonscan.com/";
  } else if (ChainsInfo[getNetworkChainID(network)].CHAIN_ID == 5) {
    blockURL = "https://goerli.etherscan.io/";
  } else if (ChainsInfo[getNetworkChainID(network)].CHAIN_ID == 97) {
    blockURL = "https://testnet.bscscan.com/";
  } else {
    blockURL = "https://bscscan.com/";
  }

  const { downloadJSONOnIpfs } = useStorage();
  const [metaData, setMetaData] = useState({});
  const { account, active } = useWeb3React();
  const [nftUpdate] = useMutation(NftUpdate);
  const [nftOwnerUpdate] = useMutation(NftOwnerUpdate);
  const [createTrans] = useMutation(CreateTrans);
  const [nftListed] = useMutation(NftListed);
  const [UsdPrice, setUsdPrice] = useState(0);
  const [readMore, setReadMore] = useState(false);

  const { data: nftDetails } = useQuery(GetNftDetails, {
    variables: { contractAddress: address, tokenId: parseInt(tokenId) },
  });

  const { data: signIn } = useQuery(SignIn, {
    skip: !nftDetails?.getNftDetails,
    variables: { walletAddress: nftDetails?.getNftDetails?.creatorAddress },
  });
  const { data: signInWalletAddress } = useQuery(SignIn, {
    skip: !active,
    variables: { walletAddress: account },
  });
  const { data: signInOwner } = useQuery(SignIn, {
    skip: !nftDetails?.getNftDetails,
    variables: { walletAddress: nftDetails?.getNftDetails?.ownerAddress },
  });
  const { data: getNftTrans } = useQuery(GetNftTrans, {
    skip: !nftDetails,
    variables: {
      nftId: nftDetails?.getNftDetails?._id,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (nftDetails?.getNftDetails?.chainId) {
      fetch(
        "https://cex.io/api/last_price/" +
        ChainsInfo[nftDetails?.getNftDetails?.chainId]?.CURRENCY_SYMBOL +
        "/USD"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUsdPrice(parseFloat(data.lprice));
        })
        .catch((err) => console.log(err));
    }
  });

  useEffect(() => {
    getNftTokenIdData(tokenId, network).then(async (res) => {
      let data = await downloadJSONOnIpfs(res.jsonData);
      setMetaData({
        ...data,
        creatorAddress: res.nftCreator,
        ipfsLink: res.jsonData,
      });
    });
  }, []);

  useEffect(() => {
    auctionDataset(tokenId, network).then((data) => {
      setAuctionDetails(data);
    });
    SaleDataset(tokenId, network).then((data) => {
      // console.log(data);
      setSaleDetails(data);
    });

    getAllBidders(tokenId, network).then((data) => {
      setAllBiddres(data);
    });
  }, []);

  const TabPanelFrom = ({ metaData }) => {
    return (
      <>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `Properties`,
              key: "1",
              children: (
                <>
                  <div>
                    <>
                      <div className="d-flex gap-3 flex-wrap ">
                        <>
                          {metaData?.properties?.map((item, key) => (
                            <>
                              <div
                                className="border py-3 px-4  border-primary rounded min-w-10"
                                style={{
                                  background: "#15b2e50f",
                                  border: "1px solid rgb(21, 178, 229)",
                                  textAlign: "center",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#15b2e5",
                                    fontSize: "16px",
                                  }}
                                >
                                  {item.key}
                                </div>
                                <div style={{ color: "#353840" }}>
                                  {" "}
                                  {item.value}
                                </div>
                              </div>{" "}
                            </>
                          ))}
                        </>
                      </div>
                    </>
                  </div>
                </>
              ),
            },
            {
              label: `History`,
              key: "2",
              children: (
                <>
                  <div>
                    <div className="d-flex  align-center my-4">
                      <div className="ml-2">
                        {getNftTrans?.getNftTrans?.map((val, i) => (
                          <div key={i} className="mt-2">
                            <span style={{ fontWeight: "bold" }}>
                              {TransStatus[val.transactionType]}{" "}
                            </span>
                            by{" "}
                            <a href="/" target="_blank" rel="noreferrer">
                              <span style={{ fontWeight: "bold" }}>
                                <img
                                  src={val?.buyerId?.avatar_url}
                                  width="40px"
                                  height="40px"
                                  style={{ borderRadius: "999px" }}
                                />{" "}
                                {val?.buyerId?.username}
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ),
            },
            {
              label: `Offers`,
              key: "3",
              children: `No Offers`,
            },
            {
              label: `Certificates`,
              key: "4",
              children: (
                <>
                  <div>
                    <>
                      <div className="d-flex gap-3 flex-wrap ">
                        <>
                          {metaData?.certificates?.map((item, key) => (
                            <>
                              <a href={item.image} target={"_blank"}>
                                <div
                                  className="border py-3 px-4  border-primary rounded min-w-10"
                                  style={{
                                    background: "#15b2e50f",
                                    border: "1px solid rgb(21, 178, 229)",
                                    textAlign: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#15b2e5",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                </div>
                              </a>
                            </>
                          ))}
                        </>
                      </div>
                    </>
                  </div>
                </>
              ),
            },
            {
              label: `Unlockable`,
              key: "5",
              children: (
                <>
                  {account === nftDetails?.getNftDetails?.ownerAddress ? (
                    <div>
                      {account === nftDetails?.getNftDetails?.ownerAddress
                        ? nftDetails?.getNftDetails?.unlockableContent
                        : ""}
                    </div>
                  ) : (
                    "Only owner of this nft can view the unlockable content"
                  )}
                </>
              ),
            },
          ]}
        />
      </>
    );
  };
  const PutAuctionModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <span
          onClick={showModal}
          className=" btn btn-border  btn-grad btn-tran"
          style={{
            color: "#fff",
            borderRadius: "999px",
          }}
        >
          Put On Auction
        </span>
        <Modal
          title="Edit Auction Details"
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <div>
              <div style={{ fontSize: "16px", color: "#000" }}>
                {/* Put {"NFT 001"} over the marketplace */}
                <div>
                  <Form
                    layout="vertical"
                    initialValues={{
                      price: "0.001",
                    }}
                    onFinish={(value) => {
                      showLoading();

                      approveNFT(tokenId)
                        .send({ from: account })
                        .then(() => {
                          putOnAuction(tokenId, value.price, value.date)
                            .send({
                              from: account,
                            })
                            .then(async () => {
                              await nftListedFun(
                                true,
                                nftDetails?.getNftDetails?._id
                              );
                              await nftUpdateInfo(
                                parseFloat(value.price),
                                nftDetails?.getNftDetails?._id,
                                true
                              ).then(() => {
                                PUT_AUCTION_ALERT();
                              });
                              await transCreate(
                                "put_on_auction",
                                signInWalletAddress?.signIn?.user?._id,
                                signInOwner?.signIn?.user?._id,
                                nftDetails?.getNftDetails?._id
                              );
                              hideLoading();
                            })
                            .catch(() => hideLoading());
                        })
                        .catch(() => hideLoading());
                    }}
                  >
                    <div className="space-y-10">
                      <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the price of NFT ",
                          },
                        ]}
                      >
                        <Input
                          placeholder={"0.0001 WMATIC"}
                          className="form-control"
                          type="number"
                        ></Input>
                      </Form.Item>{" "}
                      <Form.Item
                        label="End Date"
                        name="date"
                        rules={[
                          {
                            required: true,
                            message: "Please enter end date of auction ",
                          },
                        ]}
                      >
                        <DatePicker
                          disabledDate={(current) => {
                            let customDate = moment()
                              .add(1, "days")
                              .format("YYYY-MM-DD");
                            return (
                              current &&
                              current < moment(customDate, "YYYY-MM-DD")
                            );
                          }}
                        />
                      </Form.Item>
                      <Form.Item style={{ marginTop: "20px" }}>
                        <Button htmlType="submit">Submit</Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  const PutMarketplaceModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <span
          onClick={showModal}
          className=" btn btn-border  btn-grad btn-tran"
          style={{
            color: "#fff",
            borderRadius: "999px",
          }}
        >
          Put On Sale
        </span>
        <Modal
          title="Edit NFT Details"
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <div>
              <div style={{ fontSize: "16px", color: "#000" }}>
                <div>
                  <Form
                    layout="vertical"
                    initialValues={{ price: "0.001" }}
                    onFinish={(value) => {
                      showLoading();
                      approveNFT(tokenId)
                        .send({ from: account })
                        .then((res) => {
                          putOnSale(tokenId, value.price)
                            .send({
                              from: account,
                            })
                            .then(async () => {
                              await nftListedFun(
                                true,
                                nftDetails?.getNftDetails?._id
                              );
                              await nftUpdateInfo(
                                parseFloat(value.price),
                                nftDetails?.getNftDetails?._id,
                                false
                              ).then(() => {
                                PUT_SALE_ALERT();
                              });
                              await transCreate(
                                "put_on_sale",
                                signInWalletAddress?.signIn?.user?._id,
                                signInOwner?.signIn?.user?._id,
                                nftDetails?.getNftDetails?._id
                              );
                              hideLoading();
                            })
                            .catch(() => {
                              hideLoading();
                            });
                        })
                        .catch(() => {
                          hideLoading();
                        });
                    }}
                  >
                    <div className="space-y-10">
                      <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the price of NFT",
                          },
                        ]}
                      >
                        <Input
                          placeholder={"0.0001 WMATIC"}
                          className="form-control"
                          type="number"
                        // min={MIN_PRICE}
                        ></Input>
                      </Form.Item>{" "}
                      <Form.Item style={{ marginTop: "20px" }}>
                        <Button htmlType="submit">Submit</Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  const PlaceBidModal = ({ auctionDetails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <span
          onClick={showModal}
          className=" btn btn-border  btn-grad btn-tran"
          style={{
            color: "#fff",
            borderRadius: "999px",
          }}
        >
          Place Bid
        </span>
        <Modal
          title="Place Bid"
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <div>
              <div style={{ fontSize: "16px", color: "#000" }}>
                <div>
                  <Form
                    layout="vertical"
                    initialValues={{ price: "0.001" }}
                    onFinish={async (value) => {
                      if (active) {
                        if (
                          parseInt(auctionDetails.highestBid) /
                          Math.pow(10, 18) <
                          parseFloat(value.price)
                        ) {
                          showLoading();
                          if (
                            parseInt(
                              await getTokenBalance(
                                network,
                                ChainsInfo[nftDetails?.getNftDetails?.chainId]
                                  ?.WRAP_TOKEN
                              )
                            ) >
                            Math.pow(10, 18) * parseFloat(value.price)
                          ) {
                            await approveToken(value.price)
                              .send({ from: account })
                              .then(async (res) => {
                                await placeBid(tokenId, value.price)
                                  .then(async () => {
                                    await nftUpdateInfo(
                                      parseFloat(value.price),
                                      nftDetails?.getNftDetails?._id,
                                      true
                                    ).then(() => {
                                      PLACE_BID_ALERT();
                                    });
                                    await transCreate(
                                      "place_bid",
                                      signInWalletAddress?.signIn?.user?._id,
                                      signInOwner?.signIn?.user?._id,
                                      nftDetails?.getNftDetails?._id
                                    );
                                    hideLoading();
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    hideLoading();
                                  });
                              })
                              .catch((err) => {
                                console.log(err);
                                hideLoading();
                              });
                          } else {
                            TOKEN_SUFFICIENT_AMOUNT_ALERT();
                            hideLoading();
                          }
                        } else {
                          PLACE_BID_AMOUNT_ALERT();
                          hideLoading();
                        }
                      } else {
                        WALLET_ALERT();
                        hideLoading();
                      }
                    }}
                  >
                    <div className="space-y-10">
                      <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the price of NFT ",
                          },
                        ]}
                      >
                        <Input
                          placeholder={"0.0001 WMATIC"}
                          className="form-control"
                          type="number"
                        // min={MIN_PRICE}
                        ></Input>
                      </Form.Item>{" "}
                      <Form.Item style={{ marginTop: "20px" }}>
                        <Button htmlType="submit">Submit</Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  const nftUpdateInfo = (price, nftId, isMarketPlace) => {
    return nftUpdate({
      variables: {
        price: price,
        nftId: nftId,
        isMarketPlace: isMarketPlace,
      },
      refetchQueries: [
        {
          query: GetAllNfts,
        },
        {
          query: GetNftDetails,
          variables: { contractAddress: address, tokenId: parseInt(tokenId) },
        },
      ],
    });
  };

  const nftListedFun = (isListed, nftId) => {
    return nftListed({
      variables: {
        isListed: isListed,
        nftId: nftId,
      },
      refetchQueries: [
        {
          query: GetAllNfts,
        },
        {
          query: GetNftDetails,
          variables: { contractAddress: address, tokenId: parseInt(tokenId) },
        },
      ],
    });
  };

  const handleReadMore = () => setReadMore(!readMore);

  const transCreate = (type, buyerId, sellerId, nftId) => {
    return createTrans({
      variables: {
        transactionType: type,
        buyerId: buyerId,
        sellerId: sellerId,
        nftId: nftId,
      },
      refetchQueries: [
        {
          query: GetAllNfts,
        },
        {
          query: GetNftTrans,
          variables: { nftId: nftId },
        },
      ],
    });
  };
  return (
    <>
      <Header />
      <div style={{ background: "white" }}>
        <div
          className="container"
          style={{
            padding: "60px 5px",
          }}
        >
          {/* <Link to="/explore" className="btn btn-white btn-sm my-40">
          Back to home
        </Link> */}
          {false ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="item_details my-10 ">
              <div
                className="row sm:space-y-20"
                style={{ justifyContent: "center", gap: "25px" }}
              >
                <div className="col-md-4">
                  <div>
                    <div className="shadow-lg item_img p-3">
                      <img
                        className="item_img"
                        src={metaData?.external_link}
                        alt={metaData?.title}
                      />
                    </div>
                    <div className="my-4">
                      <div>
                        {/* <h3>Description:</h3>
                      <p>{metaData?.description}</p> */}
                      </div>
                      <div className="my-4">
                        <ul
                          style={{
                            fontWeight: "500",
                            color: "#766767",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <li className="d-flex justify-content-between mr-4">
                            <div>Metadata: </div>
                            <a
                              href={getIPFSLink(metaData?.ipfsLink)}
                              target="_blank"
                              alt="metadata"
                            >
                              https://ipfs.com/{metaData?.title?.slice(0, 5)}...
                            </a>
                          </li>
                          <li className="d-flex justify-content-between mr-4">
                            <div>Contract Address: </div>
                            <a
                              href={`${blockURL}address/${address}`}
                              target="_blank"
                            >
                              {truncateAddress(address)}
                            </a>
                          </li>
                          <li className="d-flex justify-content-between mr-4">
                            <div>TokenID: </div>
                            <a
                              href={`${blockURL}token/${address}?a=${tokenId}`}
                              target="_blank"
                            >
                              {tokenId}
                            </a>
                          </li>
                          <li className="d-flex justify-content-between mr-4">
                            <div>Token Standard:</div> <div>ERC-721</div>
                          </li>
                          <li className="d-flex justify-content-between mr-4">
                            <div>Blockchain:</div>
                            <span className="capitalize">{network}</span>{" "}
                          </li>
                          <li className="d-flex justify-content-between mr-4">
                            <div>Royalty:</div>
                            <span className="capitalize">5%</span>{" "}
                          </li>
                          {/* <li className="d-flex justify-content-between mr-4">
                            <div>External Link:</div>
                            <a href={metaData?.extLink} target="_blank">
                              {metaData?.extLink?.slice(0, 10)}...
                            </a>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  {/* title */}
                  <div>
                    {/* tags */}
                    {nftDetails?.getNftDetails?.tags?.map((e) => (
                      <Badge
                        bg="warning"
                        text="dark"
                        style={{ margin: "0 10px 10px 0" }}
                      >
                        {e}
                      </Badge>
                    ))}
                  </div>
                  {/* ex unlockable content */}
                  {/* <div>
                  {account === nftDetails?.getNftDetails?.ownerAddress
                    ? nftDetails?.getNftDetails?.unlockableContent
                    : ""}
                </div> */}
                  <div className="space-y-20">
                    <h3>{metaData?.title}</h3>
                    <div>
                      {readMore
                        ? metaData?.description
                        : metaData?.description?.slice(0, 80) + "...."}
                      <a
                        style={{ color: "red" }}
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "show less" : "read more"}
                      </a>
                    </div>
                    <div>
                      {" "}
                      <p
                        className=""
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Price:
                        <br />
                        <span
                          style={{
                            color: "#1B9F07",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          {auctionDetails.started &&
                            decimalToInt(auctionDetails.highestBid).toFixed(4) +
                            " "}
                          {saleDetails.forSale &&
                            decimalToInt(saleDetails.price).toFixed(4) + " "}
                          {
                            ChainsInfo[getNetworkChainID(network)]
                              .CURRENCY_SYMBOL
                          }
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          $
                          {auctionDetails.started &&
                            (
                              decimalToInt(auctionDetails.highestBid).toFixed(
                                4
                              ) * UsdPrice.toFixed(2)
                            ).toFixed(2)}{" "}
                          {saleDetails.forSale &&
                            (
                              decimalToInt(saleDetails.price).toFixed(4) *
                              UsdPrice.toFixed(2)
                            ).toFixed(2)}{" "}
                          USD
                        </span>
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      {auctionDetails.started && (
                        <p>
                          <div
                            style={{
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "start",
                              marginBottom: "10px",
                            }}
                          >
                            <i class="ri-timer-fill"></i>
                            <span>Auction ending in:</span>
                          </div>{" "}
                          <CounterComponent
                            endDate={parseInt(auctionDetails?.endAt)}
                          />
                        </p>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "50px" }}>
                      <div
                        className="avatars space-x-5"
                        style={{ marginBottom: 8 }}
                      >
                        <div className="media">
                          <Link
                            to={
                              "/profile/" +
                              nftDetails?.getNftDetails?.ownerAddress
                            }
                          >
                            <div className="badge">
                              <img
                                className="badge"
                                src="https://gateway.ipfscdn.io/ipfs/QmQE4KLmCE7JqfFwgqDduH1i5Xmhmo4aoMb3xFHtnoFy8d/avatar_1.png"
                                alt="ImgPreview"
                              />
                            </div>
                            <img
                              alt="Avatar"
                              src={signInOwner?.signIn?.user?.avatar_url}
                              className="avatar avatar-sm"
                              width={20}
                            />
                          </Link>
                        </div>
                        <div>
                          <Link
                            to={
                              "/profile/" +
                              nftDetails?.getNftDetails?.ownerAddress
                            }
                          >
                            <div>
                              <p
                                className="avatars_name color_black"
                                style={{ margin: 0 }}
                              >
                                Owner
                              </p>
                              <p
                                className="avatars_name"
                                style={{ margin: 0, color: "#707070" }}
                              >
                                @{signInOwner?.signIn?.user?.username}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="avatars space-x-5"
                        style={{ marginBottom: 8 }}
                      >
                        <div className="media">
                          <Link
                            to={
                              "/profile/" +
                              nftDetails?.getNftDetails?.creatorAddress
                            }
                          >
                            <div className="badge">
                              <img
                                className="badge"
                                src="https://gateway.ipfscdn.io/ipfs/QmQE4KLmCE7JqfFwgqDduH1i5Xmhmo4aoMb3xFHtnoFy8d/avatar_1.png"
                                alt="ImgPreview"
                              />
                            </div>

                            <img
                              alt="Avatar"
                              src={signIn?.signIn?.user?.avatar_url}
                              className="avatar avatar-sm"
                              width={20}
                            />
                          </Link>
                        </div>
                        <div>
                          <Link
                            to={
                              "/profile/" +
                              nftDetails?.getNftDetails?.creatorAddress
                            }
                          >
                            <div>
                              <p
                                className="avatars_name color_black"
                                style={{ margin: 0 }}
                              >
                                Artist
                              </p>
                              <p
                                className="avatars_name"
                                style={{ margin: 0, color: "#707070" }}
                              >
                                @{signIn?.signIn?.user?.username}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ display: "flex", justifyContent: "center", alignItems: "center", alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                        <a
                          target="_blank"
                          href={getIPFSLink(metaData?.external_link)}
                          rel="noreferrer"
                          style={{
                            border: "1px solid black",
                            padding: "8px 20px",
                            borderRadius: "999px",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            margin: "10px 10px 10px 0"
                          }}
                        >
                          <div>
                            <img
                              width={30}
                              src={
                                process.env.PUBLIC_URL +
                                "/img/icons/ipfs-share.svg"
                              }
                              alt="dashghg"
                            />
                          </div>
                          <div style={{ fontBold: "10px", color: "black" }}>
                            View On IPFS
                          </div>
                        </a>
                        <a
                          target="_blank"
                          href={getIPFSLink(metaData?.extLink)}
                          rel="noreferrer"
                          style={{
                            border: "1px solid black",
                            padding: "8px 20px",
                            borderRadius: "999px",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <img
                              width={30}
                              src={
                                process.env.PUBLIC_URL +
                                "/img/icons/ipfs-share.svg"
                              }
                              alt="dashghg"
                            />
                          </div>
                          <div style={{ fontBold: "10px", color: "black" }}>
                            External Link
                          </div>
                        </a>
                      </div>
                      {nftDetails?.getNftDetails?.ownerAddress === account && (
                        <>
                          {saleDetails.forSale ||
                            auctionDetails.started ||
                            auctionDetails.ended ? (
                            saleDetails.forSale ? (
                              <span
                                onClick={() => {
                                  // console.log(tokenId);
                                  showLoading();
                                  removeFromSale(tokenId)
                                    .send({ from: account })
                                    .then(async () => {
                                      await nftListedFun(
                                        false,
                                        nftDetails?.getNftDetails?._id
                                      );
                                      await nftUpdateInfo(
                                        0.0,
                                        nftDetails?.getNftDetails?._id,
                                        false
                                      ).then(() => {
                                        REMOVE_SALE_ALERT();
                                      });
                                      await transCreate(
                                        "remove_on_sale",
                                        signInWalletAddress?.signIn?.user?._id,
                                        signInOwner?.signIn?.user?._id,
                                        nftDetails?.getNftDetails?._id
                                      );
                                      hideLoading();
                                    })
                                    .catch(() => {
                                      hideLoading();
                                    });
                                }}
                                className=" btn btn-border  btn-grad btn-tran"
                                style={{
                                  color: "#fff",
                                  borderRadius: "999px",
                                }}
                              >
                                Remove From Sale
                              </span>
                            ) : (
                              <>
                                {auctionDetails.started && (
                                  <span
                                    onClick={() => {
                                      showLoading();
                                      cancelAuction(tokenId)
                                        .send({ from: account })
                                        .then(async () => {
                                          await nftListedFun(
                                            false,
                                            nftDetails?.getNftDetails?._id
                                          );
                                          await nftUpdateInfo(
                                            0.0,
                                            nftDetails?.getNftDetails?._id,
                                            false
                                          ).then(() => REMOVE_AUCTION_ALERT());
                                          await transCreate(
                                            "remove_on_auction",
                                            signInWalletAddress?.signIn?.user
                                              ?._id,
                                            signInOwner?.signIn?.user?._id,
                                            nftDetails?.getNftDetails?._id
                                          );
                                          hideLoading();
                                        })
                                        .catch(() => {
                                          hideLoading();
                                        });
                                    }}
                                    className=" btn btn-border  btn-grad btn-tran"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "999px",
                                    }}
                                  >
                                    Remove From Auction
                                  </span>
                                )}
                                {auctionDetails.ended && (
                                  <span
                                    onClick={() => {
                                      showLoading();
                                      cancelAuction(tokenId)
                                        .send({ from: account })
                                        .then(async () => {
                                          await nftListedFun(
                                            false,
                                            nftDetails?.getNftDetails?._id
                                          );
                                          await nftUpdateInfo(
                                            0.0,
                                            nftDetails?.getNftDetails?._id,
                                            false
                                          ).then(() => REMOVE_AUCTION_ALERT());
                                          await transCreate(
                                            "remove_on_auction",
                                            signInWalletAddress?.signIn?.user
                                              ?._id,
                                            signInOwner?.signIn?.user?._id,
                                            nftDetails?.getNftDetails?._id
                                          );
                                          hideLoading();
                                        })
                                        .catch(() => {
                                          hideLoading();
                                        });
                                    }}
                                    className=" btn btn-border  btn-grad btn-tran"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "999px",
                                    }}
                                  >
                                    Remove From Auction
                                  </span>
                                )}
                              </>
                            )
                          ) : (
                            <>
                              {" "}
                              <div>
                                <PutAuctionModal />
                              </div>
                              <div>
                                <PutMarketplaceModal
                                  nftDetails={nftDetails?.getNftDetails}
                                />
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {nftDetails?.getNftDetails?.ownerAddress !== account && (
                        <>
                          {(saleDetails.forSale || auctionDetails.started) &&
                            (saleDetails.forSale ? (
                              <span
                                onClick={async () => {
                                  if (active) {
                                    showLoading();
                                    await purchaseNFT(
                                      tokenId,
                                      nftDetails?.getNftDetails?.price
                                    )
                                      .then(async (res) => {
                                        await nftListedFun(
                                          false,
                                          nftDetails?.getNftDetails?._id
                                        );
                                        await nftUpdateInfo(
                                          0.0,
                                          nftDetails?.getNftDetails?._id,
                                          false
                                        ).then(() => REMOVE_AUCTION_ALERT());
                                        await nftOwnerUpdate({
                                          variables: {
                                            ownerAddress: account,
                                            nftId:
                                              nftDetails?.getNftDetails?._id,
                                          },
                                          refetchQueries: [
                                            {
                                              query: GetNftDetails,
                                              variables: {
                                                contractAddress: address,
                                                tokenId: parseInt(tokenId),
                                              },
                                            },
                                          ],
                                        }).then((res) => {
                                          BUY_NFT_ALERT();
                                        });
                                        await transCreate(
                                          "purchase_nft",
                                          signInWalletAddress?.signIn?.user
                                            ?._id,
                                          signInOwner?.signIn?.user?._id,
                                          nftDetails?.getNftDetails?._id
                                        );
                                        hideLoading();
                                      })
                                      .catch(() => {
                                        hideLoading();
                                      });
                                  } else {
                                    WALLET_ALERT();
                                  }
                                }}
                                className=" btn btn-border  btn-grad btn-tran"
                                style={{
                                  color: "#fff",
                                  borderRadius: "999px",
                                }}
                              >
                                Buy Now
                              </span>
                            ) : (
                              <>
                                {AllBiddres.includes(account) ? (
                                  <span
                                    className=" btn btn-border btn-grad btn-tran"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "999px",
                                    }}
                                    onClick={() => {
                                      showLoading();
                                      bidCancelByUser(tokenId)
                                        .send({
                                          from: account,
                                        })
                                        .then((res) => {
                                          CANCEL_BID_ALERT();
                                          hideLoading();
                                        })
                                        .catch(() => {
                                          hideLoading();
                                          SOMTHING_WENT_WRONG_ALERT();
                                        });
                                    }}
                                  >
                                    Cancel Bid
                                  </span>
                                ) : (
                                  active && (
                                    <PlaceBidModal
                                      auctionDetails={auctionDetails}
                                    />
                                  )
                                )}
                              </>
                            ))}
                        </>
                      )}
                    </div>

                    <div style={{ marginTop: "80px" }}>
                      <TabPanelFrom metaData={metaData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />;
    </>
  );
};

export default ItemDetails;
