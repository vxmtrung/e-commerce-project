import React, { useState } from "react";
import { Card, Col, Row, Button, notification } from "antd";
import Link from "next/link";

const Product_Card_Admin = ({ id, img, name, brand_name, price }) => {
  const handleEdit = async () => {
    try {
      // const response = await fetch(`http://localhost:3000/products/${id}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      // console.error("Error fetching product data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        notification.success({ message: "Product deleted successfully!" });
        console.log("Product deleted successfully");
      } else {
        notification.error({ message: "Error deleting product." });
        console.error("Error deleting product");
      }
    } catch (error) {
      notification.error({ message: "Error deleting product." });
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Col
      xs={12}
      sm={8}
      md={6}
      lg={6}
      xl={6}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        variant="border"
        style={{
          backgroundColor: "#fff",
          borderColor: "#e8e8e8",
          marginBottom: "15px",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img width={200} src={img} alt={name} />
          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "black",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "black",
            }}
          ></div>
          <div style={{ marginTop: "10px" }}>
            <Button onClick={handleEdit} style={{ marginRight: "10px" }}>
              Edit
            </Button>
            <Button onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Row>
      </Card>
    </Col>
  );
};

export default Product_Card_Admin;
