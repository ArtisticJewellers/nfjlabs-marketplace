import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ArtisticJeweller } from "../../../config/contract";
import { truncateAddress } from "../../../utils/service";
import Select from "react-select";
const options = [
  { value: "asc", label: "High to Low " },
  { value: "desc", label: "Low to High" },
];
function CardsPrice() {
  const API_ENDPOINT = "http://3.82.138.126:8000";

  const [NftsData, setNftsData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: "desc",
    label: "Low to High",
  });
  useEffect(() => {
    fetch(
      selectedOption.value === "desc"
        ? API_ENDPOINT + "/nft/getAll"
        : API_ENDPOINT + "/nft/getAll?order_direction=desc"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => setNftsData(data.nfts))
      .catch((err) => console.log(err));
  }, [selectedOption]);
  // console.log(selectedOption);
  return (
    <div>
      <div className="mb-30">
        {" "}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          style={{ padding: 5 }}
          isSearchable={false}
        />
      </div>
      <div className="row mb-30_reset">
        {NftsData.map(
          (val, i) =>
            val.isApproved &&
            !val.isAuction && (
              <>
                {" "}
                {/* /col-lg-4 col-md-6 col-sm-6 */}
                <div className="col-md-6 col-sm-6" key={i}>
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
                            <p className="avatars_name txt_xs">
                              {truncateAddress(val.creatorAddress)}
                            </p>
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
                            <p className="avatars_name txt_xs">
                              {truncateAddress(val.ownerAddress)}
                            </p>
                          </Link>
                        </div>
                      </div>
                      <div className="card_head">
                        <Link
                          to={`/item/eth/${ArtisticJeweller}/${val._id}/${val.nftToken}`}
                        >
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
                          <Link
                            to={`/item/eth/${ArtisticJeweller}/${val._id}/${val.nftToken}`}
                          >
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

export default CardsPrice;
