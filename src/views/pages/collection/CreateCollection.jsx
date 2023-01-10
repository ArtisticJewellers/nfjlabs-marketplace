import React, { useState } from "react";
import Navbar from "../../../components/header/Navbar/Navbar";
import Header from "../../../components/header/Header";
import { useMutation, useQuery } from "@apollo/client";
import { UserDetails } from "../../../graphql/query";
import { CreateCollections } from "../../../graphql/mutations";
import { useWeb3React } from "@web3-react/core";
import useStorage from "../../../hooks/useStorage";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const CreateCollection = () => {
  const history = useHistory();
  const [createCollection, { loading, error }] = useMutation(CreateCollections);
  const { account } = useWeb3React();
  const { uploadOnIpfs } = useStorage();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
    collectionName: "",
    collectionDesc: "",
    bannerImageUrl: "",
    avatarUrl: "",
    chain: "",
    nfts: [],
    user: "",
  });

  const { data: user } = useQuery(UserDetails, {
    variables: {
      walletAddress: account,
    },
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!account) return alert("Please Connect Your Wallet");
    console.log({ data });
    let avatarUrl = await uploadOnIpfs(data.avatarUrl);
    let bannerImageUrl = await uploadOnIpfs(data.bannerImageUrl);
    console.log({ username: user?.user?.username });

    const resp = await createCollection({
      variables: {
        username: user?.user?.username,
        collectionName: data.collectionName,
        collectionDesc: data.collectionDesc,
        bannerImageUrl,
        avatarUrl,
        chain: data.chain,
        nfts: data.nfts,
      },
    });
    setIsLoading(false);
    console.log({ resp });
    history.goBack();
  };
  return (
    <div>
      <Header />
      <div
        className="container"
        style={{ marginTop: "22px", padding: "22px 20%" }}
      >
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Collection Name</label>
            <input
              required
              onChange={onChange}
              type="text"
              name="collectionName"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Collection Description</label>
            <textarea
              required
              onChange={onChange}
              type="text"
              name="collectionDesc"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Banner Image</label>
            <input
              required
              onChange={(e) =>
                setData({ ...data, bannerImageUrl: e.target.files[0] })
              }
              type="file"
              class="form-control"
              id="bannerImage"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Avatar Image</label>
            <input
              required
              onChange={(e) =>
                setData({ ...data, avatarUrl: e.target.files[0] })
              }
              type="file"
              class="form-control"
              id="avatarImage"
              aria-describedby="emailHelp"
            />
          </div>
          <div>
            <label htmlFor="form-control">Select Chain</label>
            <select
              required
              class="form-control"
              onChange={onChange}
              name="chain"
            >
              <option>Polygon</option>
              <option>Ethereum</option>
              <option>Binance Smart Chain</option>
            </select>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            class="btn btn-primary"
            style={{ marginTop: "22px" }}
          >
            {isLoading ? <Spinner /> : "Create Collection"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCollection;
