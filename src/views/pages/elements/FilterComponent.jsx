import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Form, InputNumber, Menu, Radio } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { filterNFT } from "../../../Redux/reducers/nftReducer";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const category = [
  { label: "All", value: "" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Gems", value: "gems" },
];

let jewelleryCat = [
  { label: "Necklace", value: "necklaces" },
  { label: "Pendant", value: "pendant" },
  { label: "Rings", value: "rings" },
  { label: "Brooch", value: "brooch" },
  { label: "Earrings", value: "earrings" },
  { label: "Watch Charm", value: "watch_charm" },
  { label: "Bracelet", value: "bracelet" },
  { label: "Chain", value: "chain" },
];

let gemsCat = [
  { label: "Pearl", value: "pearl" },
  { label: "Opal", value: "opal" },
  { label: "Ruby", value: "ruby" },
  { label: "Sapphire", value: "sapphire" },
  { label: "Diamond", value: "diamond" },
  { label: "Emrald", value: "emrald" },
];

let allCat = [
  { label: "All", value: "" },
  { label: "Necklace", value: "necklaces" },
  { label: "Pendant", value: "pendant" },
  { label: "Rings", value: "rings" },
  { label: "Brooch", value: "brooch" },
  { label: "Earrings", value: "earrings" },
  { label: "Watch Charm", value: "watch_charm" },
  { label: "Bracelet", value: "bracelet" },
  { label: "Chain", value: "chain" },
  { label: "Pearl", value: "pearl" },
  { label: "Opal", value: "opal" },
  { label: "Ruby", value: "ruby" },
  { label: "Sapphire", value: "sapphire" },
  { label: "Diamond", value: "diamond" },
  { label: "Emrald", value: "emrald" },
];

const network = [
  { label: "All blockchain", value: "" },
  { label: "Polygon", value: "polygon" },
  { label: "Binance", value: "binance" },
  { label: "ETH", value: "ethereum" },
];

const listing = [
  { label: "Listed", value: true },
  { label: "Not Listed", value: false },
];

const FilterComponent = ({ onFilterChange, defaultCat, defaultSubCat }) => {
  const dispatch = useDispatch();
  const [networks, setNetworks] = useState("");
  const [defaultCategory, setDefaultCategory] = useState();
  const [defaultSubCategory, setSubDefaultCategory] = useState();

  console.log({ defaultSubCat });

  const [price, setPrice] = useState({
    min: null,
    max: null,
  });

  const [isList, setListed] = useState(true);
  const [categorys, setCategory] = useState("");
  const [subCategorys, setSubCategory] = useState("");

  const onChangeNetwork = (e) => {
    setNetworks(e.target.value);
    onFilterChange({
      price: price,
      category: categorys,
      subcategory: subCategorys,
      network: e.target.value,
      isListed: isList,
    });
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    setDefaultCategory(e.target.value);
    onFilterChange({
      price: price,
      category: e.target.value,
      // category: defaultCategory,
      subcategory: subCategorys,
      network: networks,
      isListed: isList,
    });
  };

  const onChangeSubCategory = (e) => {
    setSubCategory(e.target.value);
    setSubDefaultCategory(e.target.value);
    onFilterChange({
      price: price,
      category: categorys,
      subcategory: e.target.value,
      network: networks,
      isListed: isList,
    });
  };

  useEffect(() => {
    // if (defaultCat || defaultSubCat) {
    //   setCategory(defaultCat);
    //   setSubDefaultCategory(defaultSubCat);
    //   onFilterChange({
    //     price: price,
    //     // category: e.target.value,
    //     category: defaultCategory,
    //     subcategory: defaultSubCat,
    //     network: networks,
    //     isListed: isList,
    //   });
    // }
    if (defaultCat) {
      setCategory(defaultCat);
      onFilterChange({
        price: price,
        // category: e.target.value,
        category: defaultCategory,
        subcategory: subCategorys,
        network: networks,
        isListed: isList,
      });
    }

    if (defaultSubCat) {
      setSubCategory(defaultCat);
      onFilterChange({
        price: price,
        // category: e.target.value,
        category: defaultCategory,
        subcategory: defaultSubCat,
        network: networks,
        isListed: isList,
      });
    }
  }, []);

  const onChangeListed = (e) => {
    setListed(e.target.value);
    onFilterChange({
      price: price,
      category: categorys,
      subcategory: subCategorys,
      network: networks,
      isListed: e.target.value,
    });
  };

  const onChangePrice = (values) => {
    setPrice(values);
    onFilterChange({
      price: values,
      category: categorys,
      subcategory: subCategorys,
      network: networks,
      isListed: isList,
    });
  };

  const items = [
    getItem("Category", "category", <MailOutlined />, [
      getItem(
        null,
        "category-list",
        <Radio.Group
          options={category}
          onChange={onChangeCategory}
          value={categorys}
        />
      ),
    ]),

    getItem("Sub Category", "subcategory", <MailOutlined />, [
      getItem(
        null,
        "subcategory-list",
        <Radio.Group
          options={
            categorys == ""
              ? allCat
              : categorys == "jewellery"
                ? jewelleryCat
                : gemsCat
          }
          onChange={onChangeSubCategory}
          value={subCategorys}
        />
      ),
    ]),
    getItem("Price", "price", <AppstoreOutlined />, [
      getItem(
        null,
        "5",
        <>
          <Form onFinish={onChangePrice}>
            <div className="py-2">
              <div className="d-flex gap-2">
                <Form.Item name="min">
                  <InputNumber min={0} placeholder="MIN" />
                </Form.Item>
                <Form.Item name="max">
                  <InputNumber min={0} placeholder="MAX" />
                </Form.Item>
              </div>
              <Button
                htmlType="submit"
                style={{ backgroundColor: "#4b2be9", color: "white" }}
              >
                Apply
              </Button>
            </div>
          </Form>
        </>
      ),
    ]),
    getItem("Network", "network", <SettingOutlined />, [
      getItem(
        null,
        "network-list",
        <Radio.Group
          options={network}
          onChange={onChangeNetwork}
          value={networks}
        />
      ),
    ]),
    getItem("Listing", "listed", <SettingOutlined />, [
      getItem(
        null,
        "listed-list",
        <Radio.Group
          options={listing}
          onChange={onChangeListed}
          value={isList}
        />
      ),
    ]),
  ];

  return (
    <>
      <Menu
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["category"]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default FilterComponent;
