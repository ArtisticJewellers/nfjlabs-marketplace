import React from "react";
import Home1 from "../views/homes/Home1";
//  Account inner pages
import EditProfile from "../views/pages/account/EditProfile";
import Login from "../views/pages/account/Login"; //notused
import Profile from "../views/pages/account/Profile";
import Register from "../views/pages/account/Register"; //notused
import Footer from "../components/footer/Footer";
//  Blog inner pages
import Blog from "../views/pages/blog/Blog"; //notused
import Article from "../views/pages/blog/Article"; //notused

//  item inner pages
import ItemDetails from "../views/pages/item/ItemDetails";
import UploadType from "../views/pages/item/UploadType";

// NftPages
import Artists from "../views/pages/NftPages/Creators";
import LiveAuctions from "../views/pages/NftPages/LiveAuctions";
import Marketplace from "../views/pages/NftPages/Marketplace";

// nftpages
import Ranking from "../views/pages/NftPages/Ranking";
import UpcomingProjects from "../views/pages/NftPages/UpcomingProjects"; //not-used

// other pages
import Activity from "../views/pages/others/Activity";
import PrivacyPolicy from "../views/pages/others/PrivacyPolicy";
import NotFound from "../views/NotFound";

import Faq from "../views/pages/Support/Faq";
import Contact from "../views/pages/Support/Contact";
// import collection from "../views/pages/NftPages/Collections";

// Route Specific
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import UploadComponent from "../views/pages/item/Upload";
import UserProfile from "../views/pages/account/UserProfile";
import Success from "../views/pages/Success";
import KYCRegistration from "../views/pages/account/KYCRegistration";
import CreateCollection from "../views/pages/collection/CreateCollection";
import Collections from "../views/pages/collection/Collections";
import CollectionPage from "../views/pages/collection/CollectionPage";
const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home1} />
          <Route exact path="/explore" component={Marketplace} />
          <Route exact path="/explore/:cat/" component={Marketplace} />
          <Route exact path="/explore/:cat/:subcat" component={Marketplace} />
          <Route path="/success" component={Success} />
          <Route path="/login" component={Login} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/kyc" component={KYCRegistration} />
          <Route path="/profile/:address" component={Profile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/register" component={Register} />
          <Route
            path="/item/:network/:address/:tokenId"
            component={ItemDetails}
          />
          <Route path="/upload" component={UploadComponent} />
          <Route path="/upload-type" component={UploadType} />
          {/* <Route path="/collection" component={collection} /> */}
          <Route path="/artists" component={Artists} />
          <Route path="/live-auctions" component={LiveAuctions} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/upcoming-projects" component={UpcomingProjects} />
          <Route path="/activity" component={Activity} />

          <Route path="/privacy" component={PrivacyPolicy} />

          {/* COLLECTION ROUTES */}
          <Route path="/collection/create" component={CreateCollection} />
          <Route path="/collections" component={Collections} />
          <Route path="/collection/:id" component={CollectionPage} />

          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={Faq} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
