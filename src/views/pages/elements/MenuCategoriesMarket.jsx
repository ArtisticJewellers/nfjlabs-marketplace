import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Tabs, TabPanel } from "react-tabs";
import CardMarketCategory from "../../../components/cards/CardMarketCategory";
import CardMarketplace from "../../../components/cards/CardMarketplace";
import { FilterNfts, GetAllNfts } from "../../../graphql/query";
import FilterComponent from "./FilterComponent";

function MenuCategoriesMarket() {
  const [FilterData, setFilterData] = useState({
    price: {
      min: null,
      max: null,
    },
    category: "",
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
      isListed: FilterData.isListed,
    },
  });
  console.log(data);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const CateoryData = [
    {
      title: "Necklace",
      category: "necklaces",
      heading: "Necklace",
      icon: "ri-vip-diamond-fill",
    },
    {
      title: "Pendant",
      category: "pendant",
      heading: "Pendant",
      icon: "ri-focus-2-line",
    },
    {
      title: "Rings",
      category: "rings",
      heading: "Rings",
      icon: "ri-omega",
    },
    {
      title: "Brooch",
      category: "brooch",
      heading: "Brooch",
      icon: "ri-omega",
    },
    {
      title: "Earrings",
      category: "earrings",
      heading: "Earrings",
      icon: "ri-omega",
    },
    {
      title: "Watch Charm",
      category: "watch charm",
      heading: "Watch Charm",
      icon: "ri-omega",
    },
  ];

  const onFilterChange = (data) => {
    console.log(data);
    setFilterData(data);
  };

  return (
    <div className="w-100">
      <Tabs className=" border-b">
        <div style={{ paddingBottom: "50px" }}>
          <TabPanel>
            <div className="container">
              <div className="section mt-50">
                <div>
                  {/* <h2 className="section__title mb-20"> All NFTs</h2> */}
                  <div className="d-flex flex-column flex-row gap-4">
                    <div>
                      <FilterComponent onFilterChange={onFilterChange} />
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <Tabs>
                          <div className="row justify-content-between align-items-center">
                            <div className="col-lg-auto"></div>
                          </div>

                          <CardMarketplace FilterData={data} />
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
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
  );
}

export default MenuCategoriesMarket;
