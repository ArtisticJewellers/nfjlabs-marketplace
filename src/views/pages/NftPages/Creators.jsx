import React from "react";
import PopularCreators from "../../../components/creators/PopularCreators";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import useDocumentTitle from "../../../components/useDocumentTitle";

const Creators = () => {
  useDocumentTitle("NFJ Labs- Artists");
  return (
    <div>
      <Header />
      <PopularCreators />
      <Footer />
    </div>
  );
};

export default Creators;
