import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { getIPFSLink } from "../utils/utility";
import axios from "axios";

const storage = new ThirdwebStorage();
const PINATA_API_KEY = "901d744b9ffa0fc23d16";
const PINATA_API_SECRET =
  "9a4e587b09b2b48a610f0afa036839dd88b1681f3fa5a346c0147855752eaf00";

function useStorage() {
  const uploadFileToIPFS = async (image) => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${PINATA_API_KEY}`,
            pinata_secret_api_key: `${PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = resFile.data.IpfsHash;
        return "ipfs://" + ImgHash;
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const uploadJSONToIPFS = async (jsonData) => {
    if (jsonData) {
      try {
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: JSON.stringify(jsonData),
          headers: {
            pinata_api_key: `${PINATA_API_KEY}`,
            pinata_secret_api_key: `${PINATA_API_SECRET}`,
            "Content-Type": "application/json",
          },
        });
        const metaDataHash = res.data.IpfsHash;
        return "ipfs://" + metaDataHash;
      } catch (error) {
        console.log("Error sending json to IPFS: ");
        console.log(error);
      }
    }
  };

  const uploadOnIpfs = async (metadata) => {
    try {
      const uri = await storage.upload(metadata);
      return uri;
    } catch (error) {
      console.log("errrrrr---->", error);
    }
  };
  const downloadJSONOnIpfs = async (uri) => {
    const data = await storage.downloadJSON(uri);
    return data;
    // try {

    //   let data = await axios.get(getIPFSLink(uri), {
    //     headers: {
    //       Accept: "text/plain",
    //     },
    //   });
    //   return data.data;
    // } catch (error) {
    //   console.log("error------>", error);
    // }
  };
  const getImageLink = async (metadata) => {
    let uri = await uploadOnIpfs(metadata);
    console.log(uri);
    let url = await downloadJSONOnIpfs(uri);
    return url;
  };
  return {
    uploadFileToIPFS,
    uploadJSONToIPFS,
    uploadOnIpfs,
    downloadJSONOnIpfs,
    getImageLink,
  };
}

export default useStorage;
