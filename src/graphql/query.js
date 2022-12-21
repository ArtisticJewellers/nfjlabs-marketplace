import { gql } from "@apollo/client";

const SignIn = gql`
  query SignIn($walletAddress: String) {
    signIn(walletAddress: $walletAddress) {
      isPrimary
      address
      _id
      user {
        _id
        displayName
        username
        avatar_url
        about_details
        bg_image
        twitterUrl
        facebookUrl
        isVerified
      }
    }
  }
`;

const UserDetails = gql`
  query User($walletAddress: String) {
    user(walletAddress: $walletAddress) {
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
      following_list {
        _id
      }
      follower_list {
        _id
      }
      nfts {
        _id
        name
        tokenId
        ipfsUrl
        imageUrl
        category
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        price
        contractAddress
      }
    }
  }
`;

const GetNftsOfUser = gql`
  query GetNftsOfUser($ownerAddress: String) {
    getNftsOfUser(ownerAddress: $ownerAddress) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
    }
  }
`;

const GetNftDetails = gql`
  query GetNftDetails($contractAddress: String, $tokenId: Int) {
    getNftDetails(contractAddress: $contractAddress, tokenId: $tokenId) {
      user {
        _id
        username
        avatar_url
        isVerified
      }

      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
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

const GetPopularCreators = gql`
  query AllCreators($popularCollection: String) {
    allArtist(popularCollection: $popularCollection) {
      popularCollection
      users {
        _id
        username
        avatar_url
        bg_image
        isVerified
        wallets {
          _id
        }
        following_list {
          _id
        }
        follower_list {
          _id
        }
        nfts {
          _id
        }
      }
    }
  }
`;

const GetAllNfts = gql`
  query Nfts {
    nfts {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      isListed
      contractAddress
      ownerUserId {
        _id
        username
        avatar_url
      }
    }
  }
`;

const WalletId = gql`
  query WalletId($walletId: String) {
    walletId(walletId: $walletId) {
      _id
      address
    }
  }
`;

const NftUpdate = gql`
  mutation NftUpdate($nftId: String, $price: Float, $isMarketPlace: Boolean) {
    nftUpdate(nftId: $nftId, price: $price, isMarketPlace: $isMarketPlace) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
    }
  }
`;

const FilterNfts = gql`
  query FilterNfts(
    $priceMin: Float
    $priceMax: Float
    $network: String
    $category: String
    $isListed: Boolean
  ) {
    filterNfts(
      price_min: $priceMin
      price_max: $priceMax
      network: $network
      category: $category
      isListed: $isListed
    ) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
      isListed
      ownerUserId {
        _id
        username
        avatar_url
      }
    }
  }
`;

const FeatureNft = gql`
  query AllFeatureNft($popularCollection: String) {
    allFeatureNft(popularCollection: $popularCollection) {
      popularCollection
      featuredNft {
        _id
        name
        category
        tokenId
        imageUrl
        ipfsUrl
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        isListed
        price
        contractAddress
      }
    }
  }
`;
const TrendingNft = gql`
  query AllTrendingNft($popularCollection: String) {
    allTrendingNft(popularCollection: $popularCollection) {
      popularCollection
      trendingNft {
        _id
        name
        tokenId
        ipfsUrl
        imageUrl
        category
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        isListed
        price
        contractAddress
      }
    }
  }
`;
const BannerNft = gql`
  query BannerNft($popularCollection: String) {
    bannerNft(popularCollection: $popularCollection) {
      popularCollection
      bannerNft {
        _id
        name
        tokenId
        ipfsUrl
        imageUrl
        category
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        price
        contractAddress
      }
    }
  }
`;
const SearchNft = gql`
  query SearchNfts($key: String) {
    searchNfts(key: $key) {
      _id
      name
      category
      imageUrl
      network
      chainId
      tokenId
      contractAddress
      creatorAddress
      ownerAddress
      isMarketPlace
    }
  }
`;

const GetNftTrans = gql`
  query GetNftTrans($nftId: String) {
    getNftTrans(nftId: $nftId) {
      transactionType
      buyerId {
        _id
        username
        avatar_url
      }
      sellerId {
        _id
        username
        avatar_url
      }
      nftId {
        _id
      }
    }
  }
`;

const GetRole = gql`
  query GetRole($id: String) {
    getRole(_id: $id) {
      _id
      royalty
      roleName
      royaltyAddress
    }
  }
`;

export {
  SignIn,
  WalletId,
  GetRole,
  NftUpdate,
  FilterNfts,
  FeatureNft,
  SearchNft,
  TrendingNft,
  BannerNft,
  GetAllNfts,
  UserDetails,
  GetNftsOfUser,
  GetNftDetails,
  GetNftTrans,
  GetPopularCreators,
};
