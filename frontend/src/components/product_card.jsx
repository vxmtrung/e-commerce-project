import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import Link from "next/link";

const Product_Card = ({ id, img, name, brand_name, price }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Col xs={12} sm={8} md={6} lg={6} xl={6} style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="border"
        style={{
          backgroundColor: "#fff",
          borderColor: hovered ? "pink" : "#e8e8e8",
          marginBottom: "15px",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          textAlign: "center",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          href={`/detail/${id}`}
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img width={200} src={img} />
          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: hovered ? "#ffa3b3" : "black",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "15px",
              color: hovered ? "#ffa3b3" : "black",
            }}
          >
            500$
          </div>
        </Link>
      </Card>
    </Col>
  );
};

export default Product_Card;

