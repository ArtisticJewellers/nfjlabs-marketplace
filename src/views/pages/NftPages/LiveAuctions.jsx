import React, { useEffect, useState } from "react";
import HeroAuctions from "../../../components/hero/HeroAuctions";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import CardAuctions from "../../../components/cards/CardAuctions";
import useDocumentTitle from "../../../components/useDocumentTitle";
import { FilterNfts } from "../../../graphql/query";
import { useQuery } from "@apollo/client";
import { TabPanel, Tabs } from "react-tabs";
import CardMarketCategory from "../../../components/cards/CardMarketCategory";
import CardMarketplace from "../../../components/cards/CardMarketplace";
import FilterComponent from "../elements/FilterComponent";

const LiveAuctions = () => {
  useDocumentTitle("NFJ Labs- Auctions");
  const [FilterData, setFilterData] = useState({
    price: {
      min: null,
      max: null,
    },
    category: "",
    subcategory: "",
    network: "",
    isListed: true,
  });
  // const { data } = useQuery(GetAllNfts);
  const { data } = useQuery(FilterNfts, {
    variables: {
      network: FilterData.network,
      priceMin: FilterData.price.min,
      priceMax: FilterData.price.max,
      category: FilterData.category,
      subcategory: FilterData.subcategory,
      isListed: FilterData.isListed,
    },
  });
  // console.log(data);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const CateoryData = [
    {
      title: "Jewellery",
      category: "jewellery",
      heading: "Jewellery",
      icon: "ri-omega",
    },
    {
      title: "Gems",
      category: "gems",
      heading: "Gems",
      icon: "ri-omega",
    },
  ];

  const SubCateoryData = [
    {
      title: "Necklace",
      subcategory: "necklaces",
      heading: "Necklace",
      icon: "ri-vip-diamond-fill",
    },
    {
      title: "Pendant",
      subcategory: "pendant",
      heading: "Pendant",
      icon: "ri-focus-2-line",
    },
    {
      title: "Rings",
      subcategory: "rings",
      heading: "Rings",
      icon: "ri-omega",
    },
    {
      title: "Brooch",
      subcategory: "brooch",
      heading: "Brooch",
      icon: "ri-omega",
    },
    {
      title: "Earrings",
      subcategory: "earrings",
      heading: "Earrings",
      icon: "ri-omega",
    },
    {
      title: "Watch Charm",
      subcategory: "watch_charm",
      heading: "Watch Charm",
      icon: "ri-omega",
    },
    {
      title: "Natural Pearl",
      subcategory: "natural_pearl",
      heading: "Natural Pearl",
      icon: "ri-omega",
    },
    {
      title: "Cultured Pearl",
      subcategory: "cultured_pearl",
      heading: "Cultured Pearl",
      icon: "ri-omega",
    },
    {
      title: "Natural Diamond",
      subcategory: "natural_diamond",
      heading: "Natural Diamond",
      icon: "ri-omega",
    },
    {
      title: "Ruby",
      subcategory: "ruby",
      heading: "Ruby",
      icon: "ri-omega",
    },
    {
      title: "Sapphire",
      subcategory: "sapphire",
      heading: "Sapphire",
      icon: "ri-omega",
    },
    {
      title: "Emrald",
      subcategory: "emrald",
      heading: "Emrald",
      icon: "ri-omega",
    },
  ];

  const onFilterChange = (data) => {
    setFilterData(data);
    // console.log(data);
  };
  return (
    <div>
      <Header />
      <HeroAuctions />
      <div className="mt-50  pb-5">
        <div className="w-100">
          <Tabs className=" border-b">
            <div style={{ paddingBottom: "50px" }}>
              <TabPanel>
                <div className="marketplaceStyle">
                  <div className="filterStyle">
                    <FilterComponent onFilterChange={onFilterChange} />
                  </div>
                  <div className="cardStyle">
                    <CardAuctions FilterData={data} />
                  </div>
                </div>
              </TabPanel>

              {/* //Arts Collection */}

              {CateoryData.map((val, i) => (
                <TabPanel key={i}>
                  <div className="container">
                    <div className="section mt-100">
                      <div className="section__head">
                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="section__title"> {val.title}</h2>
                        </div>
                      </div>
                      <CardMarketCategory category={val.category} />
                    </div>
                  </div>
                </TabPanel>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiveAuctions;
