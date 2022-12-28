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
import {
  ACCOUNT_CREATE_ALERT,
  ACCOUNT_UPDATE_ALERT,
} from "../../../config/constant/alert";
import useStorage from "../../../hooks/useStorage";

const EditProfile = () => {
  useDocumentTitle("NFJ Labs-Marketplace");
  const { account, active, chainId } = useWeb3React();
  const history = useHistory();
  const [updateProfile] = useMutation(UpdateProfile);
  const [register] = useMutation(Register);
  const { data: userData } = useQuery(UserDetails, {
    skip: !active,
    variables: {
      walletAddress: account,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="edit_profile">
      <Header />
      <HeroEditProfile />
      <div className="container">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const User = z.object({
                username: z.string().max(20).trim(),
                firstname: z.string().max(20).trim(),
                lastname: z.string().max(20).trim(),
                bgImage: z.string().url().trim(),
                avatarUrl: z.string().url().trim(),
                aboutDetails: z.string().max(200).trim(),
                facebookUrl: z.string().url().trim(),
                websiteUrl: z.string().url().trim(),
                twitterUrl: z.string().url().trim(),
              });

              let data = User.safeParse({
                username: document.getElementById("username").value,
                firstname: document.getElementById("firstname").value,
                lastname: document.getElementById("lastname").value,
                bgImage: document.getElementById("coverUrl").value,
                avatarUrl: document.getElementById("avatarUrl").value,
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
                    console.log(res);
                    ACCOUNT_UPDATE_ALERT().then(() =>
                      history.push("/user-profile")
                    );
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
                      ACCOUNT_CREATE_ALERT().then(() =>
                        history.push("/user-profile")
                      );
                    })
                    .catch((res) => console.log(res));
                }
              } else {
                console.log(data.error.issues);
                Swal.fire("Fill Correct information", "warning");
              }
            }}
          >
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
                          type="text"
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
                          type="text"
                          defaultValue={userData?.user?.firstname}
                          className="form-control"
                          placeholder="First Name"
                          maxLength="20"
                          required
                        />
                      </div>

                      <div className="space-y-10">
                        <span className="nameInput">Cover URL</span>
                        <input
                          type="text"
                          id="coverUrl"
                          defaultValue={userData?.user?.bg_image}
                          className="form-control"
                          placeholder="Cover URL"
                          required
                        />{" "}
                        <ImageModal text={"Cover Uplaod"} />
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
                        <input
                          type="text"
                          id="avatarUrl"
                          defaultValue={userData?.user?.avatar_url}
                          className="form-control"
                          placeholder="Avatar URL"
                          required
                        />
                        <ImageModal text={"Avatar Uplaod"} />
                      </div>
                      <div className="space-y-10">
                        <span className="nameInput">Last Name</span>
                        <input
                          id="lastname"
                          type="text"
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
                  id="about"
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
                        <span className="nameInput mb-10">Facebook</span>
                        <input
                          type="text"
                          className="form-control"
                          id="facebookUrl"
                          defaultValue={userData?.user?.facebookUrl}
                          placeholder="facebook URL"
                          required
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="nameInput mb-10">Website</span>
                        <input
                          type="text"
                          id="websiteUrl"
                          defaultValue={userData?.user?.websiteUrl}
                          className="form-control"
                          placeholder="Website URL"
                          required
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
                          defaultValue={userData?.user?.twitterUrl}
                          className="form-control"
                          placeholder="Twitter URL"
                          required
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
                <button type="submit" className="btn btn-grad btn-border">
                  {userData?.user ? "Update" : "Create"} Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};
const ImageModal = ({ text }) => {
  const { getImageLink } = useStorage();
  const [previewURL, setPreviewUrl] = useState(null);
  const [copyLink, setCopyLink] = useState(null);
  const [upload, setUpload] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setCopyLink(null);
  }, []);
  return (
    <>
      <>
        <p
          style={{
            fontSize: "12px",
            color: "#ff4d4f",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          {text}
        </p>

        <Modal
          footer={null}
          title={text}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <Upload.Dragger
            name="logo"
            listType="picture"
            onChange={(e) => {
              console.log(e);
              setPreviewUrl(e.fileList[0].originFileObj);
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Upload.Dragger>

          {copyLink !== null && (
            <p className="mt-3">
              Copy your {text.toLowerCase()}
              {" : "}
              <Link>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(copyLink);
                    alert("Link copied");
                    setOpen(false);
                  }}
                >
                  Copy Link
                </span>
              </Link>
            </p>
          )}

          <button
            class="mt-5 w-full ant-btn ant-btn-primary btn btn-grad"
            type="button"
            disabled={upload}
          >
            {upload ? (
              <>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                >
                  {" "}
                </span>{" "}
                <span> Uploading...</span>
              </>
            ) : (
              <>
                {" "}
                <div
                  className="w-full"
                  onClick={async () => {
                    setUpload(true);
                    let image = await getImageLink({ image: previewURL });
                    setCopyLink(image.image);
                    setUpload(false);
                  }}
                >
                  {" "}
                  Upload{" "}
                </div>
              </>
            )}
          </button>
        </Modal>
      </>
    </>
  );
};
export default EditProfile;
