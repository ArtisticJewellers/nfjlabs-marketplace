import Swal from "sweetalert2";

export const WALLET_ALERT = () =>
  Swal.fire("Please connect wallet first", "", "warning");

export const ACCOUNT_CREATE_ALERT = () =>
  Swal.fire(
    "Account Created",
    "You have successfully create your account ",
    "success"
  );
export const ACCOUNT_UPDATE_ALERT = () =>
  Swal.fire(
    "Profile Update",
    "You have successfully update  your profile. ",
    "success"
  );
export const VERIFY_ALERT = () =>
  Swal.fire(
    "Please create account first",
    "once you create account you can access all feature of platform.",
    "warning"
  );

export const MINT_ALERT = () =>
  Swal.fire(
    "NFT minted successfully",
    "You can see your minted NFT in your profile after it gets approved by admin",
    "success"
  );

export const PUT_SALE_ALERT = () =>
  Swal.fire(
    "Transaction successfully",
    "Your NFT is successfully put on marketplace.",
    "success"
  );

export const REMOVE_SALE_ALERT = () =>
  Swal.fire(
    "NFT remove successfully",
    "Your NFT is successfully remove  on marketplace.",
    "success"
  );
export const CANCEL_BID_ALERT = () =>
  Swal.fire(
    "You have successfully cancel your bid.",
    "Your bid has remove from this NFT.",
    "success"
  );
export const REMOVE_AUCTION_ALERT = () =>
  Swal.fire(
    "NFT remove successfully",
    "Your NFT is successfully remove  on marketplace.",
    "success"
  );

export const PUT_AUCTION_ALERT = () =>
  Swal.fire(
    "Transaction successfully",
    "Your NFT is successfully listed on marketplace.",
    "success"
  );

export const BUY_NFT_ALERT = () =>
  Swal.fire(
    "Transaction successfully",
    "Check your nft on your profile section ",
    "success"
  );

export const PLACE_BID_ALERT = () =>
  Swal.fire(
    "Your bid place successfully",
    "Check NFT after sale end!",
    "success"
  );
export const PLACE_BID_AMOUNT_ALERT = () =>
  Swal.fire(
    "Your amount should be high.",
    "Please enter correct amount!",
    "warning"
  );
export const TOKEN_SUFFICIENT_AMOUNT_ALERT = () =>
  Swal.fire(
    "You don't have sufficient token.",
    "Please add  amount!",
    "warning"
  );

export const SOMTHING_WENT_WRONG_ALERT = () =>
  Swal.fire("Something went wrong!", "Please try after some time", "warning");
