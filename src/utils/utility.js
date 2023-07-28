import { IPFS_URL } from "../config/constant/contract";

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const getNetworkName = (chainId) => {
  switch (chainId) {
    case 11155111:
      return "ethereumSepolia";
    case 5:
      return "ethereum";
    case 97:
      return "binance";
    case 80001:
      return "polygon";
    default:
      return "none";
  }
};

export const getNetworkChainID = (network) => {
  switch (network) {
    case "ethereumSepolia":
      return "11155111";
    case "ethereum":
      return "5";
    case "polygon":
      return "80001";
    case "binance":
      return "97";
    default:
      return "none";
  }
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const decimalToInt = (num) => {
  const val = parseInt(num);
  return val / Math.pow(10, 18);
};

export const getIPFSLink = (text) => {
  if (text) {
    return text.replace("ipfs://", IPFS_URL);
  }
  return "/";
};
