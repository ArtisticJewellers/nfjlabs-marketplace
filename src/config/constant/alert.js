import Swal from "sweetalert2";

export const WALLET_ALERT = () =>
  Swal.fire("Please connect your wallet first", "", "warning");

export const ACCOUNT_CREATE_ALERT = () =>
  Swal.fire(
    "Account Created",
    "You have successfully created your account ",
    "success"
  );
export const ACCOUNT_UPDATE_ALERT = () =>
  Swal.fire(
    "Profile Updated",
    "You have successfully updated your profile. ",
    "success"
  );
export const VERIFY_ALERT = () =>
  Swal.fire(
    "Please create an account first",
    "once you create an account you can access all the feature on our platform.",
    "warning"
  );

export const MINT_ALERT = () =>
  Swal.fire(
    "NFT minted successfully",
    "You can see your minted NFT on marketplace after it gets approved by admin",
    "success"
  );

export const PUT_SALE_ALERT = () =>
  Swal.fire(
    "Transaction successfully",
    "Your NFT is successfully listed on the marketplace.",
    "success"
  );

export const REMOVE_SALE_ALERT = () =>
  Swal.fire(
    "NFT removed successfully",
    "Your NFT is successfully removed from the marketplace.",
    "success"
  );
export const CANCEL_BID_ALERT = () =>
  Swal.fire(
    "You have successfully cancelled your bid.",
    "Your bid has remove from this NFT.",
    "success"
  );
export const REMOVE_AUCTION_ALERT = () =>
  Swal.fire(
    "NFT removed successfully",
    "Your NFT is successfully removed from the marketplace.",
    "success"
  );

export const PUT_AUCTION_ALERT = () =>
  Swal.fire(
    "Transaction successfully",
    "Your NFT is successfully listed on the marketplace.",
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
    "Your bid placed successfully",
    "Check NFT status after the sale ends!",
    "success"
  );
export const PLACE_BID_AMOUNT_ALERT = () =>
  Swal.fire(
    "Your bid amount should be high than listed amount.",
    "Please enter correct amount!",
    "warning"
  );
export const TOKEN_SUFFICIENT_AMOUNT_ALERT = () =>
  Swal.fire(
    "You don't have sufficient tokens.",
    "Please add tokens to complete purchase!",
    "warning"
  );

export const SOMTHING_WENT_WRONG_ALERT = () =>
  Swal.fire("Something went wrong!", "Please try after some time", "warning");
