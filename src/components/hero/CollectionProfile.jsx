import { useWeb3React } from "@web3-react/core";
import React from "react";
import { MdVerified } from "react-icons/md";
import { truncateAddress } from "../../utils/utility";

const CollectionProfile = ({ collectionDetail }) => {
  const { account } = useWeb3React();
  // console.log(collectionDetail);
  return (
    <div className="mb-100">
      <div className="hero__profile">
        <div className="cover">
          <img src={collectionDetail?.bannerImageUrl} alt="ImgPreview" />
        </div>
        <div className="infos">
          <div className="container">
            <div className="row flex-wrap align-items-center justify-content-between sm:space-y-50">
              <div className="col-md-auto mr-20">
                <div className="avatars d-flex space-x-20 align-items-center">
                  <div className="avatar_wrap">
                    <img
                      className="avatar avatar-lg"
                      src={collectionDetail?.avatarImage}
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
                    <h5>@{collectionDetail?.collectionName}</h5>{" "}
                    {/* {collectionDetail?.isVerified && (
                      <MdVerified
                        color="#009eee"
                        size={20}
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                      />
                    )} */}
                  </div>
                </div>
              </div>
              <div className="col-md-auto">
                <div className="d-sm-flex flex-wrap align-items-center space-x-20 mb-20_reset d-sm-block">
                  <div className="mb-20">
                    <div className="copy">
                      <span className="color_text">
                        {truncateAddress(account)}
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

export default CollectionProfile;
