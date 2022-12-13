import { useWeb3React } from "@web3-react/core";
import {
  getErc1155Contract,
  getErc720Contract,
  getErc721Contract,
} from "../utils/contractHelper";

function useContract() {
  const { library } = useWeb3React();
  const useERC721 = (address) => {
    return getErc721Contract(address, library.provider);
  };
  const useERC720 = (address) => {
    return getErc720Contract(address, library.provider);
  };
  const useERC1155 = (address) => {
    return getErc1155Contract(address, library.provider);
  };
  return {
    useERC721,
    useERC720,
    useERC1155,
  };
}

export default useContract;
