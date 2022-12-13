import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Web3 from "web3";
import { ChainsInfo } from "../config/config-chains";
import { toHex } from "../utils/utility";
import useContract from "./useContract";
function useWeb3() {
  const { activate, deactivate, account, active, chainId, library } =
    useWeb3React();
  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(chainId) }],
      });
    } catch (switchError) {
      //   if (switchError.code === 4902) {
      //     try {
      //       await library.provider.request({
      //         method: "wallet_addEthereumChain",
      //         params: [networkParams[toHex(chainId)]],
      //       });
      //     } catch (error) {
      //       console.log(error);
      //     }
    }
  };

  const signCreate = async (price) => {
    try {
      const domain = {
        name: "LazyNFT-Voucher",
        version: "1",
        // verifyingContract: ChainsInfo[chainId].NFT_ADDRESS,
        chainId: chainId,
        verifyingContract: ChainsInfo[chainId].LAZY_MINT_ADDRESS,
      };

      const value = {
        creator: account,
        minPrice: new Web3().utils.toWei(price, "ether"),
        uri: "ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy",
      };

      const types = {
        NFTVoucher: [
          { name: "creator", type: "address" },
          { name: "minPrice", type: "uint256" },
          { name: "uri", type: "string" },
        ],
      };

      // ["0xADA301d3D1195f117153B32beF30BF4Ded2DBaE8","10000000000000000","ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy","0x2a9662edcdeb97fe3e551a66f3e6e85bc8c069e5294e574b7489ffb5227ebca91780c579ef7c72c183c6b031835f44170a3c518b30afe6dfe92957ee1f471bd31b"]        },

      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      let signature = await signer._signTypedData(domain, types, value);
      console.log(value, signature);
      return { value, signer: signature };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    switchNetwork,
    signCreate,
  };
}

export default useWeb3;
