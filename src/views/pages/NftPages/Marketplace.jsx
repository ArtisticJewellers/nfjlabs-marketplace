import React, { useEffect } from "react";

import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import useDocumentTitle from "../../../components/useDocumentTitle";
import MenuCategoriesMarket from "../elements/MenuCategoriesMarket";

const Marketplace = () => {
  useDocumentTitle("NFJ Labs - Marketplace");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      {/* <HeroMarketplace /> */}
      <div className="d-flex justify-content-center">
        <MenuCategoriesMarket />
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
