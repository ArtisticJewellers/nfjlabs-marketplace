import ERC720ABI from "../config/abi/erc20.json";
import ERC721ABI from "../config/abi/erc721.json";
import ERC1155ABI from "../config/abi/erc1155.json";
import Web3 from "web3";
const getContract = (abi, address, provider) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(abi, address);
};

export const getErc720Contract = (address, provider) => {
  return getContract(ERC720ABI, address, provider);
};
export const getErc721Contract = (address, provider) => {
  return getContract(ERC721ABI, address, provider);
};
export const getErc1155Contract = (address, provider) => {
  return getContract(ERC1155ABI, address, provider);
};
