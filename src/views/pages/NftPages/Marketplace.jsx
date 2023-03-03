import React, { useEffect, useState } from "react";

import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import useDocumentTitle from "../../../components/useDocumentTitle";
import MenuCategoriesMarket from "../elements/MenuCategoriesMarket";
import { useParams } from "react-router-dom";

const Marketplace = () => {
  const [display, setDisplay] = useState(false);
  const param = useParams();
  const { cat } = param;
  useDocumentTitle("NFJ Labs - Marketplace");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cat]);

  setTimeout(() => {
    setDisplay(true);
  }, 500);

  return (
    <div>
      <Header />
      {/* <HeroMarketplace /> */}
      <div className="d-flex justify-content-center">
        <MenuCategoriesMarket cat={cat} />
      </div>
      {display ? <Footer /> : ""}
    </div>
  );
};

export default Marketplace;
