import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { Modal, Upload } from "antd";
import HeroEditProfile from "../../../components/hero/HeroEditProfile";
import useDocumentTitle from "../../../components/useDocumentTitle";
import "reactjs-popup/dist/index.css";
import { InboxOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/Loading/Loading";
import { z } from "zod";
import Swal from "sweetalert2";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Register, UpdateProfile } from "../../../graphql/mutations";
import { SignIn, UserDetails } from "../../../graphql/query";
import { useWeb3React } from "@web3-react/core";
import { Link, useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  ACCOUNT_CREATE_ALERT,
  ACCOUNT_UPDATE_ALERT,
} from "../../../config/constant/alert";
import useStorage from "../../../hooks/useStorage";
import { IPFS_URL } from "../../../config/constant/contract";

const EditProfile = () => {
  useDocumentTitle("NFJ Labs-Marketplace");
  const { account, active, chainId } = useWeb3React();
  const history = useHistory();
  const [updateProfile] = useMutation(UpdateProfile);
  const [register] = useMutation(Register);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    bgImage: "",
    avatarUrl: "",
    coverUrl: "",
    aboutDetails: "",
    facebookUrl: "",
    websiteUrl: "",
    twitterUrl: "",
  });

  const { uploadFileToIPFS } = useStorage();
  const { data: userData } = useQuery(UserDetails, {
    skip: !active,
    variables: {
      walletAddress: account,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setUserProfileData({ ...userProfileData, [e.target.name]: e.target.value });
    console.log(userProfileData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let avatarImage = await uploadFileToIPFS(userProfileData.avatarUrl);
    let coverImage = await uploadFileToIPFS(userProfileData.coverUrl);

    let newavatarImage = avatarImage.replace("ipfs://", IPFS_URL);
    let newConverImage = coverImage.replace("ipfs://", IPFS_URL);
    console.log(newavatarImage);
    console.log(newConverImage);

    const User = z.object({
      username: z.string().max(20).trim(),
      firstname: z.string().max(20).trim(),
      bgImage: z.string(),
      avatarUrl: z.string(),
      lastname: z.string().max(20).trim(),
      aboutDetails: z.string().max(200).trim(),
      facebookUrl: z.string().url().trim(),
      websiteUrl: z.string().url().trim(),
      twitterUrl: z.string().url().trim(),
    });

    let data = User.safeParse({
      username: document.getElementById("username").value,
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      bgImage: newConverImage,
      avatarUrl: newavatarImage,
      aboutDetails: document.getElementById("about").value,
      facebookUrl: document.getElementById("facebookUrl").value,
      websiteUrl: document.getElementById("websiteUrl").value,
      twitterUrl: document.getElementById("twitterUrl").value,
    });

    if (data.success) {
      if (userData?.user) {
        updateProfile({
          variables: { userId: userData?.user?._id, ...data.data },
          refetchQueries: [
            {
              query: UserDetails,
              variables: {
                walletAddress: account,
              },
            },
            {
              query: SignIn,
              variables: {
                walletAddress: account,
              },
            },
          ],
        }).then((res) => {
          // console.log(res);
          ACCOUNT_UPDATE_ALERT().then(() => history.push("/user-profile"));
        });
      } else {
        register({
          variables: { walletAddress: account, ...data.data },
          refetchQueries: [
            {
              query: UserDetails,
              variables: {
                walletAddress: account,
              },
            },
            {
              query: SignIn,
              variables: {
                walletAddress: account,
              },
            },
          ],
        })
          .then((res) => {
            console.log(res);
            ACCOUNT_CREATE_ALERT().then(() => history.push("/user-profile"));
          })
          .catch((res) => console.log(res));
      }
    } else {
      Swal.fire(
        "Fill Correct information",
        "Please fill all the required columns"
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="edit_profile">
      <Header />
      <HeroEditProfile />
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <div
              className="box edit_box col-lg-9 space-y-30"
              style={{ margin: "0 auto " }}
            >
              <div className="row sm:space-y-20">
                <div className="col-lg-6 account-info">
                  <h3 className="mb-20">Account info 💎</h3>
                  <div className="form-group space-y-10 mb-0">
                    <div className="space-y-40">
                      <div className="space-y-10">
                        <span className="nameInput">Username</span>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          onChange={handleChange}
                          defaultValue={userData?.user?.username}
                          placeholder="Username"
                          maxLength="20"
                          required
                        />
                      </div>
                      <div className="space-y-10">
                        <span className="nameInput">First Name</span>
                        <input
                          id="firstname"
                          name="firstname"
                          type="text"
                          onChange={handleChange}
                          defaultValue={userData?.user?.firstname}
                          className="form-control"
                          placeholder="First Name"
                          maxLength="20"
                          required
                        />
                      </div>

                      <div className="space-y-10">
                        <span className="nameInput">Cover URL</span>
                        {/* <input
                          type="text"
                          id="coverUrl"
                          defaultValue={userData?.user?.bg_image}
                          className="form-control"
                          placeholder="Cover URL"
                          required
                        /> */}
                        <input
                          type="file"
                          id="coverUrl"
                          name="coverUrl"
                          onChange={(e) => {
                            setUserProfileData({
                              ...userProfileData,
                              coverUrl: e.target.files[0],
                            });
                          }}
                          className="form-control"
                          placeholder="Cover URL"
                          required
                        />{" "}
                        {/* <ImageModal text={"Cover Uplaod"} /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 social-media">
                  <div
                    className="form-group space-y-10"
                    style={{ marginTop: 50 }}
                  >
                    <div className="space-y-40">
                      <div className="space-y-10">
                        <span className="nameInput">Avatar URL</span>
                        {/* <input
                          type="text"
                          id="avatarUrl"
                          name="avatarUrl"
                          defaultValue={userData?.user?.avatar_url}
                          className="form-control"
                          placeholder="Avatar URL"
                          required
                        /> */}
                        <label htmlFor="avatarUrl"></label>
                        <input
                          type="file"
                          onChange={(e) =>
                            setUserProfileData({
                              ...userProfileData,
                              avatarUrl: e.target.files[0],
                            })
                          }
                          id="avatarUrl"
                          name="avatarUrl"
                          className="form-control"
                          placeholder="Avatar URL"
                          required
                        />
                        {/* <ImageModal text={"Avatar Uplaod"} /> */}
                      </div>
                      <div className="space-y-10">
                        <span className="nameInput">Last Name</span>
                        <input
                          id="lastname"
                          name="lastname"
                          type="text"
                          onChange={handleChange}
                          defaultValue={userData?.user?.lastname}
                          className="form-control"
                          placeholder="Last Name"
                          maxLength="20"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <span className="nameInput">About</span>
                <textarea
                  style={{ minHeight: 110 }}
                  placeholder="Add your bio"
                  name="aboutDetails"
                  id="about"
                  onChange={handleChange}
                  defaultValue={userData?.user?.about_details}
                  maxLength="150"
                  required
                />
              </div>
              <div className="row sm:space-y-20">
                <div className="col-lg-6 account-info">
                  <h3 className="mb-20">Social Media</h3>
                  <div className="form-group space-y-10 mb-0">
                    <div className="space-y-40">
                      <div className="d-flex flex-column">
                        <span className="nameInput mb-10">Instagram</span>
                        <input
                          type="text"
                          className="form-control"
                          id="facebookUrl"
                          onChange={handleChange}
                          name="facebookUrl"
                          defaultValue={userData?.user?.facebookUrl}
                          placeholder="Instagram URL"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="nameInput mb-10">Website</span>
                        <input
                          type="text"
                          id="websiteUrl"
                          name="websiteUrl"
                          onChange={handleChange}
                          defaultValue={userData?.user?.websiteUrl}
                          className="form-control"
                          placeholder="Website URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 social-media">
                  <h3 className="mb-20" style={{ color: "white" }}>
                    Your Social media
                  </h3>
                  <div className="form-group space-y-10">
                    <div className="space-y-40">
                      <div className="d-flex flex-column">
                        <span className="nameInput mb-10">Twitter</span>
                        <input
                          type="text"
                          id="twitterUrl"
                          onChange={handleChange}
                          name="twitterUrl"
                          defaultValue={userData?.user?.twitterUrl}
                          className="form-control"
                          placeholder="Twitter URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hr" />
              <p className="color_black">
                To {userData?.user ? "Update" : "Create"} your profile click on{" "}
                {userData?.user ? "Update" : "Create"} profile to confirm the
                changes.
              </p>
              <div>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-grad btn-border"
                  >
                    {userData?.user ? "Update" : "Create"}
                    Profile
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
