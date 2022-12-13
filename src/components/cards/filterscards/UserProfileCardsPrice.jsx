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
const API_ENDPOINT = "http://3.82.138.126:8000";
function UserProfileCardsPrice({ account, active }) {
  const [creatorData, setCreatorData] = useState([]);
  const [profile, setProfile] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: "desc",
    label: "Low to High",
  });
  useEffect(() => {
    if (active) {
      fetch(
        selectedOption.value === "desc"
          ? API_ENDPOINT + "/nft/get/" + account
          : API_ENDPOINT + "/nft/get/" + account + "?order_direction=desc"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.nfts);
          setCreatorData(data.nfts);
        })
        .catch((err) => console.log(err));
      fetch(API_ENDPOINT + "/users/" + account)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(account);
          // setCreatorData(data.nfts);
          setProfile(data);
        })
        .catch((err) => console.log(err));
    }
  }, [active, account, selectedOption]);

  console.log(selectedOption);
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
        {creatorData.map((val, i) => (
          // col-lg-4
          <div className=" col-md-6 col-sm-6" key={i}>
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
                    {/* <div
                      className="d-flex align-items-center
									space-x-5"
                    >
                      <i className="ri-history-line" />
                      <Popup
                        className="custom"
                        ref={ref}
                        trigger={
                          <button className="popup_btn">
                            <p
                              className="color_text txt_sm view_history"
                              style={{ width: "auto" }}
                            >
                              View History
                            </p>
                          </button>
                        }
                        position="bottom center"
                      >
                        <div>
                          <div
                            className="popup"
                            id="popup_bid"
                            tabIndex={-1}
                            role="dialog"
                            aria-hidden="true"
                          >
                            <div>
                              <button
                                type="button"
                                className="button close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={closeTooltip}
                              >
                                <span aria-hidden="true">×</span>
                              </button>
                              <div className="space-y-20">
                                <h4> History </h4>
                                <div className="creator_item creator_card space-x-10">
                                  <div className="avatars space-x-10">
                                    <div className="media">
                                      <div className="badge">
                                        <img
                                          src={`img/icons/Badge.svg`}
                                          alt="Badge"
                                        />
                                      </div>
                                      <Link to="profile">
                                        <img
                                          src={`img/avatars/avatar_1.png`}
                                          alt="Avatar"
                                          className="avatar avatar-md"
                                        />
                                      </Link>
                                    </div>
                                    <div>
                                      <p className="color_black">
                                        Bid accepted
                                        <span className="color_brand">
                                          1 ETH
                                        </span>
                                        by
                                        <Link
                                          className="color_black txt
						_bold"
                                          to="profile"
                                        >
                                          ayoub
                                        </Link>
                                      </p>
                                      <span className="date color_text">
                                        28/06/2021, 12:08
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="creator_item creator_card space-x-10">
                                  <div className="avatars space-x-10">
                                    <div className="media">
                                      <div className="badge">
                                        <img
                                          src={`img/icons/Badge.svg`}
                                          alt="Badge"
                                        />
                                      </div>
                                      <Link to="profile">
                                        <img
                                          src={`img/avatars/avatar_2.png`}
                                          alt="Avatar"
                                          className="avatar avatar-md"
                                        />
                                      </Link>
                                    </div>
                                    <div>
                                      <p className="color_black">
                                        Bid accepted
                                        <span className="color_brand">
                                          3 ETH
                                        </span>
                                        by
                                        <Link
                                          className="color_black txt
						_bold"
                                          to="profile"
                                        >
                                          monir
                                        </Link>
                                      </p>
                                      <span className="date color_text">
                                        22/05/2021, 12:08
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </div> */}
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
        ))}
      </div>
    </div>
  );
}

export default UserProfileCardsPrice;
