import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import CollectionProfile from "../../../components/hero/CollectionProfile";
import { useMutation, useQuery } from "@apollo/client";
import { UserDetails } from "../../../graphql/query";
import { useWeb3React } from "@web3-react/core";
import { Tabs } from "react-tabs";
import CollectionCard from "../../../components/cards/CollectionCard";
import {
  GetCollectionsById,
  GetIndividualCollection,
} from "../../../graphql/mutations";

const CollectionPage = () => {
  const { id } = useParams();
  const { account } = useWeb3React();
  const [collectionDetail, setCollectionDetail] = useState({});

  const { data: user } = useQuery(UserDetails, {
    variables: {
      walletAddress: account,
    },
  });
  const [getCollectionsById] = useMutation(GetCollectionsById);
  const [getIndividualCollection] = useMutation(GetIndividualCollection);

  const fetchCollectionDetail = async () => {
    let { data } = await getIndividualCollection({
      variables: {
        collectionId: id,
      },
    });
    setCollectionDetail(data.getIndividualCollection);
  };

  const fetchUser = async () => {
    let nfts = await getCollectionsById({
      variables: {
        username: user?.user?.username,
      },
    });
  };

  useEffect(() => {
    fetchCollectionDetail();
  }, [user]);

  // console.log(collectionDetail);

  return (
    <div>
      <Header />
      <CollectionProfile collectionDetail={collectionDetail} />
      <div className="container">
        <div className="row justify-content-center">
          {/* <div className="col-lg-3 col-md-7 order-md-0 order-1">
            <SidebarProfile userProfile={profile?.user} />
          </div> */}
          <div className="col-lg-9 col-md-12 order-md-1 order-0">
            <div className="profile?.user__content">
              <div className="d-flex justify-content-between">
                <Tabs className="space-x-10">
                  <div className="d-flex justify-content-between"></div>
                  <div className="tab-content">
                    <CollectionCard nfts={collectionDetail?.nfts} />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
