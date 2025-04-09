"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Layout, Spin, Col, Row, InputNumber, ConfigProvider, Progress, Input} from "antd";
import { notification, Button, Modal } from "antd";
import client from "@/core/fetch/fetch_api.jsx";
import styles from "./detail.css";
import { StarFilled } from "@ant-design/icons";

const { Content } = Layout;
const reviewStats = [
  { id: 5, starNo: 5, description: "Rất hài lòng", reviewerNo: 238 },
  { id: 4, starNo: 4, description: "Hài lòng", reviewerNo: 56 },
  { id: 3, starNo: 3, description: "Bình thường", reviewerNo: 0 },
  { id: 2, starNo: 2, description: "Không hài lòng", reviewerNo: 0 },
  { id: 1, starNo: 1, description: "Rất tệ", reviewerNo: 0 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    marginTop: "15px", padding: "20px", fontSize: "16px", fontWeight: "bold", color: "white",
    backgroundColor: isHovered ? "#ff4d72" : "#ff7a91",
    border: "none", borderRadius: "5px",
    cursor: "pointer",
  };

  const [isCommentHovered, setIsCommentHovered] = useState(false);
  const buttonCommentStyle = {
    marginTop: "4px", padding: "16px", fontSize: "14px", fontWeight: "bold", color: "white",
    backgroundColor: isCommentHovered ? "#ff4d72" : "#ff7a91",
    border: "none", borderRadius: "5px",
    cursor: "pointer",
  };

  const [isFocused, setIsFocused] = useState(false);
  const textAreaStyle = {
    marginBottom: '10px',
    borderColor: isFocused ? '#ff7a91' : '#d9d9d9',
    borderRadius: '5px',
  };


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitClick = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirm = () => {
    setIsConfirmModalVisible(false);
    notification.open({
      message: 'Đã bình luận!',
      description: 'Bạn đã đăng một bình luận về sản phẩm này.',
      placement: 'bottomRight',
      duration: 3,
      style: {
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid #ff7a91',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
      },
    });
    setComment('');
  };

  const handleCancel = () => {
    setIsConfirmModalVisible(false);
  };

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

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );

  if (!product)
    return <p style={{ textAlign: "center" }}>Product not found.</p>;

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
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeBorderColor: "pink",
            hoverBorderColor: "pink",
          },
        },
      }}
    >
      <Layout
        style={{
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Content
          style={{ width: "100%", backgroundColor: "#fff", padding: "20px" }}
        >
          <Card
            style={{
              padding: "20px",
            }}
          >
            <Row align="middle">
              <Col xs={24} sm={10} md={8} style={{ textAlign: "center" }}>
                <img
                  src="/productImage.png"
                  alt={product.name}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </Col>

              <Col xs={24} sm={14} md={16}>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#ffa3b3",
                  }}
                >
                  {product.name}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#888",
                    marginBottom: "5px",
                  }}
                >
                  Nha san xuat ABC
                </p>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>500$</p>
                <p
                  style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}
                >
                  {product.description} Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <p>Số lượng: </p>
                  <InputNumber
                    defaultValue={0}
                    style={{ width: "75px" }}
                  ></InputNumber>
                </div>
                <Button
                  onClick={handleAddToCart}
                  style={buttonStyle}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Col>
            </Row>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "50px",
              }}
            >
              Đánh giá
            </div>
            <div>Đánh giá trung bình</div>
            <Row>
              <Col span={8} align="middle">
                <div
                  style={{
                    fontSize: "80px",
                    fontWeight: "bold",
                    color: "#ff7a91",
                  }}
                >
                  4.8
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <StarFilled style={{ color: "#FFD95F" }} />
                  <StarFilled style={{ color: "#FFD95F" }} />
                  <StarFilled style={{ color: "#FFD95F" }} />
                  <StarFilled style={{ color: "#FFD95F" }} />
                  <StarFilled style={{ color: "#FFD95F" }} />
                </div>
                <div style={{ marginTop: "10px" }}>294 nhận xét</div>
              </Col>
              <Col
                span={8}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "28px",
                }}
              >
                <Col span={5} align="middle">
                  {reviewStats.map((item) => (
                    <div style={{ marginBottom: "10px" }}>
                      {item.starNo} <StarFilled style={{ color: "#FFD95F" }} />
                    </div>
                  ))}
                </Col>
                <Col span={6}>
                  {reviewStats.map((item) => (
                    <Progress
                      percent={(item.reviewerNo / 294) * 100}
                      showInfo={false}
                      style={{ marginBottom: "10px" }}
                    />
                  ))}
                </Col>
                <Col span={3} align="middle">
                  {reviewStats.map((item) => (
                    <div style={{ color: "#a3a0a1", marginBottom: "10px" }}>
                      {item.reviewerNo}
                    </div>
                  ))}
                </Col>
                <Col span={8}>
                  {reviewStats.map((item) => (
                    <div style={{ color: "#a3a0a1", marginBottom: "10px" }}>
                      {item.description}
                    </div>
                  ))}
                </Col>
              </Col>
              <Col span={8}>
                <Input.TextArea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Viết bình luận...."
                  rows={4}
                  style={textAreaStyle}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <Button
                  onClick={handleSubmitClick}
                  style={buttonCommentStyle}
                  onMouseEnter={() => setIsCommentHovered(true)}
                  onMouseLeave={() => setIsCommentHovered(false)}
                >
                  Thêm bình luận
                </Button>
              </Col>

              <Modal
                title="Thêm bình luận"
                open={isConfirmModalVisible}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="Thêm"
                cancelText="Đóng"
              >
                <p>Bạn chắc chứ?</p>
              </Modal>
            </Row>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ProductDetail;
