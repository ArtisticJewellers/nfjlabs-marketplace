import { gql } from "@apollo/client";

const UpdateProfile = gql`
  mutation UpdateUser(
    $userId: String
    $lastname: String
    $firstname: String
    $username: String
    $avatarUrl: String
    $bgImage: String
    $aboutDetails: String
    $twitterUrl: String
    $facebookUrl: String
    $websiteUrl: String
  ) {
    updateUser(
      userId: $userId
      lastname: $lastname
      firstname: $firstname
      username: $username
      avatar_url: $avatarUrl
      bg_image: $bgImage
      about_details: $aboutDetails
      twitterUrl: $twitterUrl
      facebookUrl: $facebookUrl
      websiteUrl: $websiteUrl
    ) {
      _id
      displayName
      username
      avatar_url
      about_details
      bg_image
      twitterUrl
      facebookUrl
      firstname
      lastname
      websiteUrl
    }
  }
`;

const completeKYC = gql`
  mutation KYC(
    $wallet: String
    $fname: String
    $lname: String
    $dob: String
    $email: String
    $phone: String
    $address: String
    $country: String
    $identity: String
  ) {
    kyc(
      wallet: String
      fname: String
      lname: String
      dob: String
      email: String
      phone: String
      address: String
      country: String
      identity: String
    ) {
      wallet
      fname
      lname
      dob
      email
      phone
      address
      country
      identity
    }
  }
`;

const Register = gql`
  mutation SignUp(
    $walletAddress: String
    $lastname: String
    $firstname: String
    $username: String
    $avatarUrl: String
    $bgImage: String
    $twitterUrl: String
    $aboutDetails: String
    $facebookUrl: String
    $websiteUrl: String
  ) {
    signUp(
      walletAddress: $walletAddress
      lastname: $lastname
      firstname: $firstname
      username: $username
      avatar_url: $avatarUrl
      bg_image: $bgImage
      twitterUrl: $twitterUrl
      about_details: $aboutDetails
      facebookUrl: $facebookUrl
      websiteUrl: $websiteUrl
    ) {
      _id
      displayName
      username
      avatar_url
      about_details
      bg_image
      twitterUrl
      facebookUrl
      firstname
      lastname
      websiteUrl
      isVerified
    }
  }
`;
const CreateNft = gql`
  mutation CreateNft(
    $chainId: Int
    $imageUrl: String
    $ipfsUrl: String
    $tokenId: Int
    $name: String
    $network: String
    $ownerAddress: String
    $creatorAddress: String
    $contractAddress: String
    $category: String
    $subcategory: String
    $tags: [String]
    $unlockableContent: String
  ) {
    createNft(
      chainId: $chainId
      imageUrl: $imageUrl
      ipfsUrl: $ipfsUrl
      tokenId: $tokenId
      name: $name
      network: $network
      ownerAddress: $ownerAddress
      creatorAddress: $creatorAddress
      contractAddress: $contractAddress
      category: $category
      subcategory: $subcategory
      tags: $tags
      unlockableContent: $unlockableContent
    ) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      subcategory
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
      tags
      unlockableContent
    }
  }
`;
const FollowUser = gql`
  mutation FollowUser($followId: String, $userId: String) {
    followUser(followId: $followId, userId: $userId) {
      _id
      username
      avatar_url
      about_details
      bg_image
    }
  }
`;
const NftOwnerUpdate = gql`
  mutation NftOwnerUpdate($ownerAddress: String, $nftId: String) {
    nftOwnerUpdate(ownerAddress: $ownerAddress, nftId: $nftId) {
      _id
      ownerAddress
      creatorAddress
      isApproved
      isMarketPlace
    }
  }
`;

const CreateTrans = gql`
  mutation CreateTrans(
    $transactionType: String
    $buyerId: String
    $sellerId: String
    $nftId: String
  ) {
    createTrans(
      transactionType: $transactionType
      buyerId: $buyerId
      sellerId: $sellerId
      nftId: $nftId
    ) {
      transactionType
    }
  }
`;

const NftListed = gql`
  mutation NftListed($nftId: String, $isListed: Boolean) {
    nftListed(nftId: $nftId, isListed: $isListed) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      subcategory
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
      isListed
    }
  }
`;
export {
  UpdateProfile,
  Register,
  CreateNft,
  FollowUser,
  NftOwnerUpdate,
  CreateTrans,
  NftListed,
  completeKYC,
};
