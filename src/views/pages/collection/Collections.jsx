import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { GetCollectionsById } from "../../../graphql/mutations";
import { UserDetails } from "../../../graphql/query";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";

const Collections = () => {
  const { account } = useWeb3React();
  const [userCollections, setCollections] = useState([]);

  const { data: user } = useQuery(UserDetails, {
    variables: {
      walletAddress: account,
    },
  });

  const [getCollectionsById] = useMutation(GetCollectionsById);

  const fetchUser = async () => {
    let collections = await getCollectionsById({
      variables: {
        username: user?.user?.username,
      },
    });

    setCollections(collections.data.getCollectionsById.collections);
  };

  useEffect(() => {
    if (!user?.user?.username) return;
    fetchUser();
  }, [user]);

  return (
    <div>
      <Header />
      <div style={{ padding: "30px" }}>
        <div>
          <h1>My Collections</h1>
          <p>
            Create, curate, and manage collections of unique NFTs to share and
            sell
          </p>
          <Link to={"/collection/create"}>
            <Button>Create a collection</Button>
          </Link>
        </div>
        <div style={{ marginTop: "70px", display: "flex" }}>
          {userCollections.map((e) => {
            console.log(e._id);
            return (
              <Link to={`/collection/${e._id}`} key={e._id}>
                <div
                  id="card"
                  style={{
                    height: "auto",
                    width: "300px",
                    background: "",
                    borderRadius: "12px",
                    boxShadow: "10px 10px 5px lightBlue",
                  }}
                >
                  <img
                    width={"100%"}
                    height={"auto"}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "12px",
                    }}
                    src={e.bannerImageUrl}
                    alt=""
                  />
                  <div style={{ padding: "5px 10px", textAlign: "center" }}>
                    <h4>{e.collectionName}</h4>
                    <p>{e.chain}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;
