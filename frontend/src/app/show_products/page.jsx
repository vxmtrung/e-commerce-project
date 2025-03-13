"use client";
import React from "react";
import { Layout, Pagination, Row, theme } from "antd";
import Product_Card from "@/components/product_card";
const { Content } = Layout;

const data = [
  {
    id: 1,
    img: "/productImage.png",
    name: "SERUM DE BEAUTE",
    brand_name: "GUCCI",
    price: "$79.00",
  },
  {
    id: 2,
    img: "/productImage.png",
    name: "SERUM DE BEAUTE",
    brand_name: "GUCCI",
    price: "$79.00",
  },
  {
    id: 3,
    img: "/productImage.png",
    name: "SERUM DE BEAUTE",
    brand_name: "GUCCI",
    price: "$79.00",
  },
  {
    id: 4,
    img: "/productImage.png",
    name: "SERUM DE BEAUTE",
    brand_name: "GUCCI",
    price: "$79.00",
  },
  {
    id: 5,
    img: "/productImage.png",
    name: "SERUM DE BEAUTE",
    brand_name: "GUCCI",
    price: "$79.00",
  },
  {
    id: 6,
    img: "/productImage.png",
    name: "SERUM DE BEAUTE",
    brand_name: "GUCCI",
    price: "$79.00",
  },
];
const Page = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row gutter={16}>
            {data.map((element) => (
              <Product_Card
                id={element.id}
                img={element.img}
                name={element.name}
                brand_name={element.brand_name}
                price={element.price}
              />
            ))}
          </Row>
        </div>
      </Content>
      <Pagination defaultCurrent={1} total={20} pageSize={3} />;
    </Layout>
  );
};
export default Page;
