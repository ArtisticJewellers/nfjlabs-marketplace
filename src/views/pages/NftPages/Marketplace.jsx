import React, { useEffect } from "react";

import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import useDocumentTitle from "../../../components/useDocumentTitle";
import MenuCategoriesMarket from "../elements/MenuCategoriesMarket";
import { useParams } from "react-router-dom";
const Marketplace = () => {
  const param = useParams();
  const { cat, subcat } = param;
  console.log({ subcat });
  useDocumentTitle("NFJ Labs - Marketplace");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cat]);

  return (
    <div>
      <Header />
      {/* <HeroMarketplace /> */}
      <div className="d-flex justify-content-center">
        <MenuCategoriesMarket cat={cat} subcat={subcat} />
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
