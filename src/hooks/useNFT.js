import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { ChainsInfo } from "../config/config-chains";
import { GetRole } from "../graphql/query";
import {
  getErc1155Contract,
  getErc720Contract,
  getErc721Contract,
} from "../utils/contractHelper";
import { getNetworkChainID } from "../utils/utility";

function useNFT(address, royaltyPercent) {
  const { account, library, chainId, active } = useWeb3React();
  const { data: getRole } = useQuery(GetRole, {
    variables: {
      id: "6392d510872ea2fc23f19e55",
    },
  });

  const mintNFT = (metadata, royaltyPercent) => {
    return getErc721Contract(
      ChainsInfo[chainId].NFT_ADDRESS,
      library.provider
    ).methods.mintNFT(
      account,
      metadata,
      royaltyPercent,
      // getRole?.getRole?.royaltyAddress
      "0x7671A05D4e947A7E991a8e2A92EEd7A3a9b9A861"
    );
  };
  const getTokenBalance = (network, tokenAddress) => {
    return getErc720Contract(
      tokenAddress,
      ChainsInfo[parseInt(getNetworkChainID(network))].RPC_PROVIDER_URL
    )
      .methods.balanceOf(account)
      .call();
  };
  const getNftTokenIdData = (tokenId, network) => {
    return getErc721Contract(
      ChainsInfo[parseInt(getNetworkChainID(network))].NFT_ADDRESS,
      ChainsInfo[parseInt(getNetworkChainID(network))].RPC_PROVIDER_URL
    )
      .methods.storeData(tokenId)
      .call();
  };

  const auctionDataset = (tokenId, network) => {
    return getErc1155Contract(
      ChainsInfo[parseInt(getNetworkChainID(network))].NFT_MARKETPLACE_ADDRESS,
      ChainsInfo[parseInt(getNetworkChainID(network))].RPC_PROVIDER_URL
    )
      .methods.AuctionDataset(tokenId)
      .call();
  };
  const SaleDataset = (tokenId, network) => {
    return getErc1155Contract(
      ChainsInfo[parseInt(getNetworkChainID(network))].NFT_MARKETPLACE_ADDRESS,
      ChainsInfo[parseInt(getNetworkChainID(network))].RPC_PROVIDER_URL
    )
      .methods.items(tokenId)
      .call();
  };
  const putOnAuction = (tokenId, startingBid, auctionTime) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.putOnAuction(
      tokenId,
      new Web3().utils.toWei(startingBid, "ether"),
      parseInt(new Date(auctionTime).getTime() / 1000) -
      parseInt(new Date().getTime() / 1000)
    );
  };

  const placeBid = async (tokenId, price) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.bid(tokenId, new Web3().utils.toWei(price, "ether"))
      .send({
        from: account,
      });
  };

  const approveToken = (price) => {
    return getErc720Contract(
      ChainsInfo[chainId].WRAP_TOKEN,
      library.provider
    ).methods.approve(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      new Web3().utils.toWei(price, "ether")
    );
  };

  const getAllBidders = (tokenId, network) => {
    return getErc1155Contract(
      ChainsInfo[parseInt(getNetworkChainID(network))].NFT_MARKETPLACE_ADDRESS,
      ChainsInfo[parseInt(getNetworkChainID(network))].RPC_PROVIDER_URL
    )
      .methods.getAllBidders(tokenId)
      .call();
  };
  const putOnSale = (tokenId, price) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.putOnSale(tokenId, new Web3().utils.toWei(price, "ether"));
  };

  const purchaseNFT = async (tokenId, price) => {
    let finalPrice = await getNFTFinalRate(tokenId, price);
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.purchaseNFT(tokenId)
      .send({
        from: account,
        value: finalPrice,
      });
  };

  const getNFTFinalRate = (tokenId, price) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.getNFTFinalRate(
        new Web3().utils.toWei(price.toString(), "ether"),
        tokenId
      )
      .call();
  };
  const approveNFT = (tokenId) => {
    return getErc721Contract(
      ChainsInfo[chainId].NFT_ADDRESS,
      library.provider
    ).methods.approve(ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS, tokenId);
  };
  const removeFromSale = (tokenId) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.removeFromSale(tokenId);
  };
  const cancelAuction = (tokenId) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.cancelAuction(tokenId);
  };
  const bidCancelByUser = (tokenId) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.bidCancelByUser(tokenId);
  };

  // NFT purchanse logic
  const nftPurchased = (NFTOwner, network, NFTData, NFTAuction, NFTSeller) => {
    // eslint-disable-next-line no-lone-blocks

    return active
      ? NFTOwner ===
        ChainsInfo[getNetworkChainID(network)]?.NFT_MARKETPLACE_ADDRESS
        ? NFTData.isAuction
          ? NFTAuction === account
            ? "transfer_nft"
            : "place_bid"
          : NFTSeller === account
            ? "remove_sale"
            : "buy_now"
        : NFTOwner === account
          ? NFTData.isAuction
            ? "putOnAuction"
            : "putOnSale"
          : "not_listed"
      : "connect_wallet";
  };

  return {
    mintNFT,
    nftPurchased,
    getNftTokenIdData,
    putOnSale,
    putOnAuction,
    approveNFT,
    auctionDataset,
    removeFromSale,
    cancelAuction,
    SaleDataset,
    purchaseNFT,
    placeBid,
    approveToken,
    getAllBidders,
    bidCancelByUser,
    getTokenBalance,
  };
}

export default useNFT;
