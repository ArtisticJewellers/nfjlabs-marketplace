import React from "react";

const SidebarProfile = ({ userProfile }) => {
  return (
    <div className="profile__sidebar">
      <div className="space-y-40">
        <div className="space-y-10">
          <h5>About me</h5>
          <div className="box space-y-20">
            <p>{userProfile?.about_details}</p>
            <div className="row">
              <div className="col-6">
                <span className="txt_sm color_text">Creations</span>
                <h4>
                  {userProfile?.nfts?.length ? userProfile?.nfts.length : 0}
                </h4>
              </div>{" "}
              <div className="col-6">
                <span className="txt_sm color_text">Follower</span>
                <h4>
                  {userProfile?.follower_list?.length
                    ? userProfile?.follower_list.length
                    : 0}
                </h4>
              </div>{" "}
              <div className="col-6">
                <span className="txt_sm color_text">Following</span>
                <h4>
                  {userProfile?.following_list?.length
                    ? userProfile?.following_list.length
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
              {userProfile?.facebookUrl && (
                <li>
                  <a
                    href={userProfile?.facebookUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="ri-facebook-line" />
                    <span className="color_text">facebook</span>
                  </a>
                </li>
              )}

              {userProfile?.twitterUrl && (
                <li>
                  <a
                    href={userProfile?.twitterUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="ri-twitter-line" />
                    <span className="color_text">Twitter</span>
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

export default SidebarProfile;
