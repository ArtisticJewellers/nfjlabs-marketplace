import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import CollectionProfile from "../../../components/hero/CollectionProfile";
import { useMutation, useQuery } from "@apollo/client";
import { UserDetails } from "../../../graphql/query";
import { useWeb3React } from "@web3-react/core";
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

    console.log(data.getIndividualCollection);

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
    if (!account) return;
    fetchUser();
    fetchCollectionDetail();
  }, [user, account]);

  return (
    <div>
      <Header />
      <CollectionProfile collectionDetail={collectionDetail} />
    </div>
  );
};

export default CollectionPage;
