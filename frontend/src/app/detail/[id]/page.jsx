"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Layout, Spin, Col, Row } from "antd";
import { notification, Button } from "antd";

const { Content } = Layout;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  if (!product) return <p style={{ textAlign: "center" }}>Product not found.</p>;

  const handleAddToCart = () => {
    notification.open({
      message: "Đã thêm vào giỏ hàng",
      description: "Sản phẩm đã được thêm vào giỏ hàng của bạn.",
      placement: "bottomRight",
      duration: 3,
      style: {
        backgroundColor: "#fff",
        color: "#000",
        border: "1px solid #ff7a91",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      },
    });
  };

  return (
    <Layout style={{ backgroundColor: "white", padding: "20px", display: "flex", justifyContent: "center" }}>
      <Content style={{ width: "100%", backgroundColor: "#fff", padding: "20px" }}>
        <Card style={{ padding: "20px" }}>
          <Row gutter={32} align="middle">
            <Col xs={24} sm={10} md={8} style={{ textAlign: "center" }}>
              <img
                src="/productImage.png"
                alt={product.name}
                style={{ width: "100%", maxWidth: "300px", height: "auto", objectFit: "cover" }}
              />
            </Col>

            <Col xs={24} sm={14} md={16}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#ffa3b3" }}>{product.name}</h2>
              <p style={{ fontSize: "16px", color: "#888", marginBottom: "5px" }}>Nha san xuat ABC</p>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>500$</p>
              <p style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}>{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <Button 
                    onClick={handleAddToCart}
                    style={{
                        marginTop: "15px", padding: "20px", fontSize: "16px", fontWeight: "bold", 
                        color: "white", backgroundColor: "#ff7a91", 
                        border: "none", borderRadius: "5px", cursor: "pointer"
                    }}
                    >
                    Thêm vào giỏ hàng
                </Button>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProductDetail;
