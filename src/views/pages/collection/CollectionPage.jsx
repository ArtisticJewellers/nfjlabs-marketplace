import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useMutation, useQuery } from "@apollo/client";
import { UserDetails } from "../../../graphql/query";
import { useWeb3React } from "@web3-react/core";
import { GetCollectionsById } from "../../../graphql/mutations";

const CollectionPage = () => {
  const { id } = useParams();
  const { account } = useWeb3React();

  const { data: user } = useQuery(UserDetails, {
    variables: {
      walletAddress: account,
    },
  });
  const [getCollectionsById] = useMutation(GetCollectionsById);

  const fetchUser = async () => {
    console.log("called FetchUser");
    let nfts = await getCollectionsById({
      variables: {
        username: user?.user?.username,
      },
    });
    console.log({ nfts });
  };
  
  useEffect(() => {
    if (!account) return;
    fetchUser();
  }, [user, account]);

  return (
    <div>
      <Header />
      <div></div>
    </div>
  );
};

export default CollectionPage;
