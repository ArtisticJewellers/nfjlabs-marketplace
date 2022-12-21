import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";

import Select from "react-select";

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
import { useHistory } from "react-router-dom";
import { GetAllNfts, UserDetails } from "../../../graphql/query";
import Badge from "react-bootstrap/Badge";

const UploadComponent = () => {
  const { mintNFT } = useNFT();
  const history = useHistory();
  const { uploadOnIpfs, downloadJSONOnIpfs } = useStorage();
  const { account, chainId, active } = useWeb3React();
  const { showLoading, hideLoading } = useLoading();
  const { checkVerification, isVerify } = useWalletValidation();
  const [createNft] = useMutation(CreateNft);
  // const [tags, setTags] = useState([]);

  let exampleName = "Polygon";
  if (chainId == "5" || chainId == "1") {
    exampleName = "Ethereum";
  } else if (chainId == "97" || chainId == "56") {
    exampleName = "Binance";
  } else {
    exampleName = "Polygon";
  }

  useEffect(() => {
    if (active) {
      console.log(isVerify);
      checkVerification().then((data) => {
        console.log(data);
        if (data === null) {
          VERIFY_ALERT().then(() => {
            console.log(data);
            history.push("/edit-profile");
          });
        }
      });
    }
  }, [active, account]);
  const handleSubmitNFT = async (value) => {
    console.log("handle submit called");
    if (!active) {
      WALLET_ALERT();
    } else {
      const metadata = {
        title: value.title,
        description: value.description,
        external_link: value.image.file.originFileObj,
        properties: value.properties,
        extLink: value.extlink,
        // unlock: value.unlock,
      };
      showLoading();
      let uri = await uploadOnIpfs(metadata);
      let url = await downloadJSONOnIpfs(uri);
      mintNFT(uri)
        .send({
          from: account,
        })
        .then(async (res) => {
          console.log({ res });
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
              ownerAddress: account,
              imageUrl: url.external_link,
              tags,
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
            //uncommnet this to fix
            .then((data) => {
              console.log({ data });
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

  // const sampleSubmit = () => {
  //   console.log(tags);
  // };

  // const selectTags = (newTag) => {
  //   if (tags.includes(newTag)) {
  //     setTags((state) =>
  //       tags.filter((item) => {
  //         return newTag !== item;
  //       })
  //     );
  //   } else {
  //     setTags([...tags, newTag]);
  //     console.log(tags);
  //   }
  // };

  return (
    <>
      <>
        <Header />
        <div className="hero__upload">
          <div className="container">
            <div className="space-y-20">
              <div
                // to="upload-type"
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
              console.log(value);
              handleSubmitNFT(value);
            }}
            initialValues={{
              properties: [],
            }}
          >
            <div className="" style={{ maxWidth: "1200px", margin: "0 auto " }}>
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
                        <Upload.Dragger name="image" accept="image/*">
                          <div className="space-y-20">
                            <img
                              className="icon"
                              src={`img/icons/upload.svg`}
                              alt="upload"
                            />
                            <h5>Drag and drop your file</h5>
                            <p className="color_text">PNG, GIF, JPEG.</p>
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
                              label="Unlockable Content (Link or Text)"
                              name="unlock"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input unlock!",
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
                              label="External Link"
                              name="extlink"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input unlock!",
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

                          {/* <input
                            type="text"
                            className="form-control"
                            placeholder="e. g. www.example.com"
                            required={true}
                          /> */}
                        </div>

                        <div className="space-y-10">
                          <span className="nameInput">Network</span>
                          <input
                            type="text"
                            placeholder={exampleName}
                            disabled={true}
                            required={true}
                            className="form-control"
                          />
                        </div>

                        <PropertiesForm />

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
                              isSearchable={false}
                              placeholder="Category"
                              options={[
                                { label: "Necklace", value: "necklaces" },
                                { label: "Pendant", value: "pendant" },
                                { label: "Rings", value: "rings" },
                                { label: "Brooch", value: "brooch" },
                                { label: "Earrings", value: "earrings" },
                                { label: "Watch Charm", value: "watch_charm" },
                              ]}
                            ></Select>
                          </Form.Item>
                        </div>
                        <div className="space-y-10">
                          <span className="variationInput">Collection</span>
                          <div className="d-flex flex-column flex-md-row">
                            <div className="choose_collection bg_black  ">
                              <img
                                src={process.env.PUBLIC_URL + "logo.svg"}
                                alt="raroin_icon"
                                width="40px"
                                height="40px"
                              />

                              <span className="color_white ml-10">
                                Artistic Jewellery Collection
                              </span>
                            </div>
                          </div>
                          {/* <div>
                            <h1 sty>Tags</h1>
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
                <h3 className="mb-20 text-center">Please Connect to Wallet</h3>
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
                  <Input placeholder="Key" />
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
                  <Input placeholder="Values" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <span
                type="dashed"
                className="btn btn-grad
					btn_create btn-border"
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
