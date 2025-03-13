import React from "react";
import { Card, Col, Row } from "antd";
import Link from "next/link";

const Product_Card = ({ id, img, name, brand_name, price }) => (
  <Col span={8}>
    <Card
      variant="border"
      style={{
        backgroundColor: "#F5F5F5",
        marginBottom: "15px",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Link
        href={`/detail/${id}`}
        style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
      >
        <img width={200} src={img} />
        <div style={{ fontSize: "18px", fontWeight: "500" }}>{name}</div>
      </Link>
      {/* <div style={{ fontSize: "13px", color: "#A0A0A0" }}>{brand_name}</div> */}
      {/* <div style={{ fontSize: "15px" }}>{price}</div> */}
    </Card>
  </Col>
);
export default Product_Card;
