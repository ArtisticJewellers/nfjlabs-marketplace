import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Form, InputNumber, Menu, Radio } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
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
  { label: "Necklace", value: "necklaces" },
  { label: "Pendant", value: "pendant" },
  { label: "Rings", value: "rings" },
  { label: "Brooch", value: "brooch" },
  { label: "Earrings", value: "earrings" },
  { label: "Watch Charm", value: "watch_charm" },
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
const FilterComponent = ({ onFilterChange }) => {
  const [networks, setNetworks] = useState("");
  const [price, setPrice] = useState({
    min: null,
    max: null,
  });
  const [isList, setListed] = useState(true);
  const [categorys, setCategory] = useState("");
  const onChangeNetwork = (e) => {
    setNetworks(e.target.value);
    onFilterChange({
      price: price,
      category: categorys,
      network: e.target.value,
      isListed: isList,
    });
  };
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    onFilterChange({
      price: price,
      category: e.target.value,
      network: networks,
      isListed: isList,
    });
  };
  const onChangeListed = (e) => {
    setListed(e.target.value);
    console.log(e.target.value);
    onFilterChange({
      price: price,
      category: categorys,
      network: networks,
      isListed: e.target.value,
    });
  };
  const onChangePrice = (values) => {
    setPrice(values);
    onFilterChange({
      price: values,
      category: categorys,
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
    <Menu
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default FilterComponent;
