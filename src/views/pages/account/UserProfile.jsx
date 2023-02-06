import React, { useEffect, useState } from "react";
import CardProfile from "../../../components/cards/CardProfile";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import HeroProfile from "../../../components/hero/HeroProfile";
import SidebarProfile from "../../../components/sidebars/SidebarProfile";
import { Tabs } from "react-tabs";
import useDocumentTitle from "../../../components/useDocumentTitle";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../../utils/connectors";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetNftsOfUser, UserDetails } from "../../../graphql/query";
import { useWalletValidation } from "../../../context/WalletValidationContext";
import { VERIFY_ALERT } from "../../../config/constant/alert";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

const UserProfile = () => {
  useDocumentTitle("NFJ Labs - Artist Profile");
  const history = useHistory();
  const { active, account } = useWeb3React();
  const { checkVerification, isVerify } = useWalletValidation();
  const { data: profile } = useQuery(UserDetails, {
    skip: !active,
    variables: {
      walletAddress: account,
    },
  });
  const { data: ownedNFTs } = useQuery(GetNftsOfUser, {
    // skip: !active,
    variables: {
      ownerAddress: account,
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(ownedNFTs);

  });
  useEffect(() => {
    if (active) {
      checkVerification().then((data) => {
        // console.log(data);
        if (data === null) {
          VERIFY_ALERT().then(() => {
            // console.log(data);
            history.push("/edit-profile");
          });
        }
      });
    }
  }, [active, account]);
  return (
    <div>
      <Header />
      {active ? (
        <>
          {" "}
          <HeroProfile userProfile={profile?.user} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-7 order-md-0">
                <SidebarProfile userProfile={profile?.user} />
              </div>
              <div className="col-lg-9 col-md-12 order-md-1 order-0">
                <div className="profile?.user__content">
                  <div className="d-flex justify-content-between">
                    <Tabs className="space-x-10">
                      <div className="d-flex justify-content-between"></div>
                      <div className="tab-content" style={{ paddingTop: "20px" }}>
                        <h5>My NFTs</h5>
                        <CardProfile creatorData={profile?.user} ownedNFTs={ownedNFTs} />
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container mt-80">
          <div>
            <div className="box edit_box ">
              <h3 className="mb-20 text-center">Please Connect to Wallet</h3>
              <div className="text-center">
                <div
                  className="text-center"
                // onClick={update}
                >
                  <div className="btn btn-dark">Connect Wallet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
