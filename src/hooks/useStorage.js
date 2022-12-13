import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage();

function useStorage() {
  const uploadOnIpfs = async (metadata) => {
    const uri = await storage.upload(metadata);
    return uri;
  };
  const downloadJSONOnIpfs = async (uri) => {
    const data = await storage.downloadJSON(uri);
    return data;
  };
  const getImageLink = async (metadata) => {
    let uri = await uploadOnIpfs(metadata);
    console.log(uri);
    let url = await downloadJSONOnIpfs(uri);
    return url;
  };
  return {
    uploadOnIpfs,
    downloadJSONOnIpfs,
    getImageLink,
  };
}

export default useStorage;
