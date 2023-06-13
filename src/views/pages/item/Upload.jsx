import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";

import { AddNFToCollection } from "../../../graphql/mutations";
import Select from "react-select";
import { GetCollectionsById } from "../../../graphql/mutations";
import { IoCloseCircleOutline } from "react-icons/io5";
import Loading from "../../../components/Loading/Loading";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Space, Switch, Upload } from "antd";
import useStorage from "../../../hooks/useStorage";
import useNFT from "../../../hooks/useNFT";
import { useWeb3React } from "@web3-react/core";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CreateNft } from "../../../graphql/mutations";
import { getNetworkName } from "../../../utils/utility";
import { ChainsInfo } from "../../../config/config-chains";
import { useLoading } from "../../../context/LoadingContext";
import {
  MINT_ALERT,
  VERIFY_ALERT,
  WALLET_ALERT,
} from "../../../config/constant/alert";
import { useWalletValidation } from "../../../context/WalletValidationContext";
import { Link, useHistory } from "react-router-dom";
import { GetAllNfts, UserDetails } from "../../../graphql/query";
import Badge from "react-bootstrap/Badge";
import polygon from "../../../assets/icon/polygon.png";
import ethereum from "../../../assets/icon/eth.svg";
import binance from "../../../assets/icon/bnb.svg";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
const UploadComponent = () => {
  const [collections, setCollections] = useState([
    { label: "", value: "", id: "" },
  ]);

  const [categoryValue, setCategoryValue] = useState("");
  const { mintNFT } = useNFT();
  const history = useHistory();
  const { uploadOnIpfs, downloadJSONOnIpfs } = useStorage();
  const { account, chainId, active } = useWeb3React();
  const { showLoading, hideLoading } = useLoading();
  const { checkVerification, isVerify } = useWalletValidation();
  const [createNft] = useMutation(CreateNft);
  const [certi, showCerti] = useState(false);
  const [royaltyPercent, setRoyaltyPercent] = useState("");
  // const [tags, setTags] = useState([]);
  const [certf, setCertf] = useState([{ title: "", image: "" }]);

  const { data: user } = useQuery(UserDetails, {
    variables: {
      walletAddress: account,
    },
  });

  console.log({ isKycApproved: user?.user?.isKycApproved });

  const [addNFToCollection] = useMutation(AddNFToCollection);
  const [getCollectionsById] = useMutation(GetCollectionsById, {
    variables: {
      username: user?.user?.username,
    },
  });

  let jewelleryCat = [
    { label: "Necklace", value: "necklaces" },
    { label: "Pendant", value: "pendant" },
    { label: "Rings", value: "rings" },
    { label: "Brooch", value: "brooch" },
    { label: "Earrings", value: "earrings" },
    { label: "Watch Charm", value: "watch_charm" },
    { label: "Bracelet", value: "bracelet" },
    { label: "Chain", value: "chain" },
  ];

  let gemsCat = [
    { label: "Pearl", value: "pearl" },
    { label: "Opal", value: "opal" },
    { label: "Ruby", value: "ruby" },
    { label: "Sapphire", value: "sapphire" },
    { label: "Diamond", value: "diamond" },
    { label: "Emrald", value: "emrald" },
  ];

  let exampleName = "Polygon";
  if (chainId == "5" || chainId == "1") {
    exampleName = "ethereum";
  } else if (chainId == "97" || chainId == "56") {
    exampleName = "binance";
  } else {
    exampleName = "polygon";
  }

  const fetchUserCollections = async () => {
    const { data } = await getCollectionsById({
      variables: { username: user?.user?.username },
    });
    let obj = [];
    data.getCollectionsById.collections.map((e) =>
      obj.push({ label: e.collectionName, value: e.collectionName, id: e._id })
    );
    setCollections(obj);
  };

  useEffect(() => {
    if (!account) return;
    // if (!user?.user?.isKycApproved) {
    //   alert("You Kyc Is Not Approved Yet");
    //   history.push("/");

    //   return;
    // }

    fetchUserCollections();
    if (active) {
      checkVerification().then((data) => {
        if (data === null) {
          VERIFY_ALERT().then(() => {
            history.push("/edit-profile");
          });
        }
      });
    }
  }, [active, account, user]);

  let selectedCollection;

  const handleSubmitNFT = async (value) => {
    if (!value.collection) {
      history.push("/collections");
      return alert("Please Create A NFT Collection Before Minting Any NFT");
    }

    if (!active) {
      WALLET_ALERT();
    } else {
      const metadata = {
        title: value.title,
        description: value.description,
        external_link: value.image.file.originFileObj,
        properties: value.properties,
        extLink: value.extlink,
        certificates: certf,
        // unlock: value.unlock,
      };
      showLoading();
      console.log({ metadata });
      let uri = await uploadOnIpfs(metadata);
      let url = await downloadJSONOnIpfs(uri);
      selectedCollection = "default" || value.collection.id;
      console.log({ uri });

      mintNFT(uri, royaltyPercent)
        .send({
          from: account,
        })
        .then(async (res) => {
          createNft({
            variables: {
              name: value.title.trim(),
              tokenId: parseInt(res.events.Transfer.returnValues.tokenId),
              ipfsUrl: uri,
              chainId: chainId,
              network: getNetworkName(chainId),
              contractAddress: ChainsInfo[chainId].NFT_ADDRESS,
              creatorAddress: account,
              category: value.category.value,
              subcategory: value.subcategory.value,
              ownerAddress: account,
              imageUrl: url.external_link,
              unlockableContent: value.unlock,
            },
            refetchQueries: [
              {
                query: UserDetails,
                variables: {
                  walletAddress: account,
                },
              },
            ],
          })
            .then(async (data) => {
              let obj = {
                username: user?.user?.username,
                collectionId: selectedCollection,
                nftId: data.data.createNft._id,
              };
              // console.log(data.data);
              // console.log({ nftId: data.data.createNft._id });
              const resp = await addNFToCollection({
                variables: {
                  username: obj.username,
                  collectionId: obj.collectionId,
                  nftId: obj.nftId,
                },
              });
              console.log({ resp });
              MINT_ALERT();
              hideLoading();
            })
            .catch((error) => {
              console.log(error.message);
              hideLoading();
            });
        })
        .catch((error) => {
          console.log(error.message);
          hideLoading();
        });
    }
  };

  const handleChangeInput = async (index, e, file) => {
    const values = [...certf];
    values[index][e.target.name] = e.target.value;
    values[index]["image"] = file;
    setCertf(values);
  };

  const handleAddFileds = () => {
    setCertf([...certf, { title: "", image: "" }]);
  };

  const handleRemoveFileds = (index) => {
    const values = [...certf];
    values.splice(index, 1);
    setCertf(values);
  };

  return (
    <>
      <Header />
      {user?.user?.username ? (
        <>
          <div className="hero__upload">
            <div className="container">
              <div className="space-y-20">
                <div
                  className="btn btn-white btn-sm
                    switch"
                >
                  Create NFT
                </div>
                <h1 className="title">Create single NFT</h1>
              </div>
            </div>
          </div>
          {true ? (
            <Form
              layout="vertical"
              onFinish={(value) => {
                handleSubmitNFT(value);
              }}
              initialValues={{
                properties: [],
              }}
            >
              <div
                className=""
                style={{ maxWidth: "1200px", margin: "0 auto " }}
              >
                <div className="box in__upload mb-120">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="left__part space-y-40 md:mb-20 upload_file">
                        {/* {file == null && ( */}
                        <Form.Item
                          name="image"
                          rules={[
                            {
                              required: true,
                              message: "Please input supply!",
                            },
                          ]}
                        >
                          <Upload.Dragger name="image" accept="">
                            <div className="space-y-20">
                              <img
                                className="icon"
                                src={`img/icons/upload.svg`}
                                alt="upload"
                              />
                              <h5>Drag and drop your file</h5>
                              <p className="color_text">PNG, GIF, JPEG, MP4.</p>
                            </div>
                            <div className="space-y-20">
                              <p className="color_text">or choose a file</p>
                              <div to="#" className="btn btn-white">
                                Browse files
                              </div>
                            </div>
                          </Upload.Dragger>
                        </Form.Item>
                        {/* )} */}
                        {/* {previewURL ? (
                          <div>
                            <img src={previewURL} width="100%" alt="dasd" />
                            <button
                              onClick={removeUpload}
                              className="btn btn-dark others_btn"
                              style={{ marginTop: 20 }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div />
                        )} */}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group space-y-10">
                        <div className="space-y-20">
                          <div className="space-y-10">
                            <Form.Item
                              label="Title"
                              name="title"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input supply!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control"
                                placeholder="e. g. `Artistic design art`"
                                required={true}
                              />
                            </Form.Item>
                          </div>
                          <div className="space-y-10">
                            <Form.Item
                              label="Description"
                              name="description"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input supply!",
                                },
                              ]}
                            >
                              <Input.TextArea
                                className="form-control"
                                placeholder=""
                              ></Input.TextArea>
                            </Form.Item>
                          </div>
                          <div className="space-y-10">
                            <div className="space-y-10">
                              <Form.Item
                                label="Unlockable Content (Only Visible To Owner Of NFT)"
                                name="unlock"
                              >
                                <Input
                                  className="form-control"
                                  placeholder="eg. `Link or Text`"
                                  required={true}
                                />
                              </Form.Item>
                            </div>
                            <div className="space-y-10">
                              <Form.Item
                                label="External Link"
                                name="extlink"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input externalLink",
                                  },
                                ]}
                              >
                                <Input
                                  className="form-control"
                                  placeholder="eg. https://nfjlabs.com/"
                                  required={true}
                                />
                              </Form.Item>
                            </div>
                            <div className="space-y-10">
                              <Form.Item
                                label="Royalty Percent"
                                name="royalty"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input royalty Percent",
                                  },
                                ]}
                              >
                                <Input
                                  className="form-control"
                                  placeholder="eg. for 5% enter 500, for 3% enter 300, for 0% enter 0"
                                  required={true}
                                  defaultValue="500"
                                  onChange={(e) =>
                                    setRoyaltyPercent(e.target.value)
                                  }
                                />
                              </Form.Item>
                            </div>
                          </div>
                          {/* categories  */}
                          <div className="space-y-10">
                            <Form.Item
                              label="Category"
                              name="category"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select category!",
                                },
                              ]}
                            >
                              <Select
                                onChange={(e) => setCategoryValue(e.value)}
                                isSearchable={false}
                                placeholder="Category"
                                options={[
                                  { label: "Gems", value: "gems" },
                                  { label: "Jewellery", value: "jewellery" },
                                ]}
                              ></Select>
                            </Form.Item>
                          </div>
                          {/* sub categroies  */}
                          <div className="space-y-10">
                            <Form.Item
                              label="Sub Category"
                              name="subcategory"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select sub-category!",
                                },
                              ]}
                            >
                              <Select
                                isSearchable={false}
                                placeholder="Sub Category"
                                options={
                                  categoryValue == "jewellery"
                                    ? jewelleryCat
                                    : gemsCat
                                }
                              ></Select>
                            </Form.Item>
                          </div>
                          {/* select collection  */}
                          <div className="space-y-10">
                            <Form.Item label="Collection" name="collection">
                              <Select
                                isSearchable={false}
                                placeholder="collection"
                                options={collections}
                              ></Select>
                            </Form.Item>
                          </div>
                          {/* properties  */}
                          <span className="variationInput">Properties</span>
                          <PropertiesForm />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span className="variationInput">Certificates</span>
                            <button
                              type="button"
                              onClick={() => showCerti(true)}
                              style={{
                                padding: "10px 15px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#8c52ff",
                                color: "white",
                                width: "170px",
                                marginTop: "10px",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              Add Certificates
                            </button>
                            {certi && (
                              <div style={{ marginTop: "15px", width: "100%" }}>
                                {certf.map((inputField, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      // flexDirection: "column",
                                      flexWrap: "wrap",
                                      width: "100%",
                                      marginBottom: "20px",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      name="title"
                                      placeholder="Certificate Name"
                                      value={inputField.title}
                                      style={{
                                        width: "200px",
                                        height: "30px",
                                        marginRight: "25px",
                                        marginBottom: "25px",
                                      }}
                                      onChange={(e) => {
                                        handleChangeInput(index, e);
                                      }}
                                    />
                                    <div>
                                      <input
                                        type="file"
                                        name="image"
                                        style={{ width: "200px" }}
                                        onChange={(e) => {
                                          handleChangeInput(
                                            index,
                                            e,
                                            e.target.files[0]
                                          );
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginRight: "20px",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        style={{
                                          marginRight: "4px",
                                          height: "30px",
                                          width: "30px",
                                        }}
                                        onClick={() =>
                                          handleRemoveFileds(index)
                                        }
                                      >
                                        -
                                      </button>
                                      <button
                                        style={{
                                          marginRight: "4px",
                                          height: "30px",
                                          width: "30px",
                                        }}
                                        type="button"
                                        onClick={() => handleAddFileds()}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {/* <button type="button" onClick={handleSubmit}>send</button> */}
                              </div>
                            )}
                          </div>
                          <div className="space-y-10">
                            {/* tags  */}
                            {/* <span className="variationInput">Tags</span>
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Badge
                                bg={
                                  !tags.includes("tag1") ? "danger" : "success"
                                }
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => selectTags("tag1")}
                              >
                                Tag 1
                              </Badge>
                              <Badge
                                bg={
                                  !tags.includes("tag2") ? "danger" : "success"
                                }
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => selectTags("tag2")}
                              >
                                Tag 2
                              </Badge>
                              <Badge
                                bg={
                                  !tags.includes("tag3") ? "danger" : "success"
                                }
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => selectTags("tag3")}
                              >
                                Tag 3
                              </Badge>
                            </div>
                          </div> */}
                          </div>
                        </div>
                      </div>

                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed_row bottom-0 left-0 right-0">
                <div className="container">
                  <div className="row content justify-content-between mb-20_reset">
                    <div className="col-md-auto col-12 mb-20"></div>
                    <div className="col-md-auto col-12 mb-20">
                      <Form.Item>
                        <Button
                          className="btn btn-grad btn-border"
                          htmlType="submit"
                          to="item-details"
                          style={{
                            backgroundColor: "#8c52ff",
                            color: "white",
                            padding: "0 15px",
                          }}
                        >
                          Create Item
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          ) : (
            <div className="container">
              <div>
                <div className="box edit_box ">
                  <h3 className="mb-20 text-center">
                    Please Connect to Wallet
                  </h3>
                  <div className="text-center">
                    <div
                      className="text-center"
                      // onClick={update}
                    >
                      <div className="btn  btn-grad">Connect Wallet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="container mt-80">
          <div>
            <div className="box edit_box ">
              <h3 className="mb-20 text-center">
                Please Create profile to mint NFT
              </h3>
              <div className="text-center">
                <div
                  className="text-center"
                  // onClick={update}
                >
                  <Link to="/edit-profile">
                    <div className="btn btn-dark"> Create Profile</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PropertiesComp = ({ form, index, handleFormChange, removeFields }) => {
  return (
    <>
      <div key={index} className="d-flex gap-4">
        <div className="space-y-10">
          <span className="nameInput">Properties</span>
          <input
            name="name"
            className="form-control"
            placeholder="Name"
            onChange={(event) => handleFormChange(event, index)}
            value={form.name}
          />
        </div>
        <div className="space-y-10">
          <span className="nameInput" style={{ color: "white" }}>
            Value
          </span>
          <input
            name="value"
            placeholder="value"
            className="form-control"
            onChange={(event) => handleFormChange(event, index)}
            value={form.value}
          />
        </div>
        <div
          onClick={() => removeFields(index)}
          style={{ alignItems: "center", cursor: "pointer" }}
        >
          <IoCloseCircleOutline size={30} />
        </div>
      </div>
    </>
  );
};

const PropertiesForm = () => {
  return (
    <>
      {" "}
      <Form.List name="properties">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "key"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing Key parameters",
                    },
                  ]}
                >
                  <Input placeholder="Key" style={{ height: "30px" }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing Values",
                    },
                  ]}
                >
                  <Input placeholder="Values" style={{ height: "30px" }} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <span
                type="dashed"
                className="btn btn-grad btn_create btn-border"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Properties
              </span>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default UploadComponent;
