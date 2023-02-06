import React, { useState, useEffect } from "react";
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

  const { account, chainId } = useWeb3React();
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!account) return alert("Please Connect Your Wallet");

    const resp = await createCollection({
      variables: {
        username: user?.user?.username,
        collectionName: data.collectionName,
        collectionDesc: data.collectionDesc,
        bannerImageUrl: data.bannerImageUrl,
        avatarUrl: data.avatarUrl,
        chain: data.chain.toString(),
        nfts: data.nfts,
      },
    });
    setIsLoading(false);
    // console.log({ resp });
    history.goBack();
  };

  useEffect(() => {
    if (!chainId) return;
    setData({ ...data, chain: chainId });
  }, [chainId]);
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
            <label for="exampleInputEmail1">Collection Cover</label>
            <input
              required
              onChange={async (e) => {
                setIsLoading(true);
                let image = await uploadOnIpfs(e.target.files[0]);
                setData({ ...data, bannerImageUrl: image });
                setIsLoading(false);
              }}
              type="file"
              class="form-control"
              id="bannerImage"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Collection Logo</label>
            <input
              required
              onChange={async (e) => {
                setIsLoading(true);
                let image = await uploadOnIpfs(e.target.files[0]);
                setData({ ...data, avatarUrl: image });
                setIsLoading(false);
              }}
              type="file"
              class="form-control"
              id="avatarImage"
              aria-describedby="emailHelp"
            />
          </div>
          <div style={{ display: "none" }}>
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
            disabled={isLoading || !account}
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
