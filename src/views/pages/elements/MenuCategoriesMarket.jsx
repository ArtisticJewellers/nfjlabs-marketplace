import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Tabs, TabPanel } from "react-tabs";
import CardMarketCategory from "../../../components/cards/CardMarketCategory";
import CardMarketplace from "../../../components/cards/CardMarketplace";
import { FilterNfts, GetAllNfts } from "../../../graphql/query";
import FilterComponent from "./FilterComponent";
import { useSelector } from "react-redux";
import Shravan_demo_card from "../../../components/cards/Shravan_Card/Shravan_demo_card";
import { useDispatch } from "react-redux";
import { setNftData } from "../../../Redux/reducers/nftReducer";

function MenuCategoriesMarket({ cat, subcat }) {
  const dispatch = useDispatch();
  const { nftData } = useSelector((state) => state.nftData);
  const { filterNFTData } = useSelector((state) => state.nftData);
  console.log({ subcat });

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

  console.log({ data });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filterNFTData]);

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
      title: "Bracelet",
      subcategory: "bracelet",
      heading: "Bracelet",
      icon: "ri-omega",
    },
    {
      title: "Chain",
      subcategory: "chain",
      heading: "Chain",
      icon: "ri-omega",
    },
    {
      title: "Pearl",
      subcategory: "pearl",
      heading: "Pearl",
      icon: "ri-omega",
    },
    {
      title: "Opal",
      subcategory: "opal",
      heading: "Opal",
      icon: "ri-omega",
    },
    {
      title: "Diamond",
      subcategory: "diamond",
      heading: "Diamond",
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
    console.log({ filterChange: data });
    dispatch(setNftData([]));
    setFilterData(data);
  };

  return (
    <div className="w-100">
      <Tabs className=" border-b">
        <div style={{ paddingBottom: "50px" }}>
          <TabPanel>
            <div className="marketplaceStyle">
              <div className="filterStyle">
                <FilterComponent
                  onFilterChange={onFilterChange}
                  defaultCat={cat}
                  defaultSubCat={subcat}
                />
              </div>
              <div className="cardStyle">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  {nftData &&
                    nftData.map((e) => {
                      return (
                        <div style={{ margin: "10px" }}>
                          <Shravan_demo_card searchNFTData={e} />
                        </div>
                      );
                    })}
                </div>
                <CardMarketplace FilterData={data} />
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
                      <h2 className="section__title">{val.title}</h2>
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
  );
}

export default MenuCategoriesMarket;
