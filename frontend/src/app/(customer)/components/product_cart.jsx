import React, { useState } from 'react';
import {
  Card,
  Button,
  Radio,
  Image,
  Badge,
  Row,
  Col,
  Typography,
  Space,
  Modal,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ProductCard = ({ productDetail }) => {
  const [selectedVolume, setSelectedVolume] = useState('180ml');

  const volumeOptions = ['2×180ml', '2×30ml', '10ml', '30ml', '180ml'];

  const formatPrice = (price) => {
    if (price == 0) return 0;
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const price = formatPrice(
    (productDetail?.price * (100 - productDetail?.discountPercent)) / 100
  );

  const marketPrice = formatPrice(productDetail?.price);

  const savings = formatPrice(
    productDetail?.price -
      (productDetail?.price * (100 - productDetail?.discountPercent)) / 100
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    localStorage.setItem(
      productDetail.id,
      JSON.stringify({
        brand: productDetail.brand,
        name: productDetail.productName,
        marketPrice, //giá gốc
        price, //giá đã giảm
        img: 'https://th.bing.com/th/id/OIP.Msemb0oPJ1dkR00ANAh6iwHaHa?rs=1&pid=ImgDetMain',
      })
    );
    setIsModalOpen(false);
    console.log(JSON.parse(localStorage.getItem(productDetail.id)));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="!w-full shadow-xl rounded-2xl">
      <Row gutter={[24, 24]}>
        {/* Left Image & Thumbnails */}
        <Col span={10}>
          <Image
            src="https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg"
            width={200}
            alt="main"
            className="rounded"
          />
          <Row gutter={[8, 8]} className="mt-4">
            {[...Array(5)].map((_, i) => (
              <Col key={i} span={4}>
                <Image
                  src="https://bizweb.dktcdn.net/thumb/1024x1024/100/382/633/products/nuoc-hoa-hong-klairs-supple-preparation-unscented-toner9-9764296c7e5d4014b41aa66251372d1a-master.jpg?v=1587697312593"
                  width={40}
                  className="rounded border"
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* Product Info */}
        <Col span={14}>
          <Space direction="vertical">
            <Title level={4} className="text-orange-600">
              {/* Nước Hoa Hồng Klairs Không Mùi Cho Da Nhạy Cảm 180ml */}
              {productDetail.productName}
            </Title>
            <Title level={3} className="text-red-600 !mb-0">
              {price} đ
            </Title>
            <Text>
              Giá trị trường: {marketPrice} ₫ - Tiết kiệm: {savings} ₫ (
              {productDetail.discountPercent} %)
            </Text>
            <Space>
              <Text strong>Dung Tích:</Text>
              <Radio.Group
                value={selectedVolume}
                onChange={(e) => setSelectedVolume(e.target.value)}
                className="mt-2"
              >
                <Space wrap>
                  {volumeOptions.map((v) => (
                    <Radio.Button key={v} value={v}>
                      {v}
                    </Radio.Button>
                  ))}
                </Space>
              </Radio.Group>
            </Space>
            <Space className="mt-6" size="large">
              <Button
                icon={<ShoppingCartOutlined />}
                size="large"
                onClick={showModal}
              >
                Giỏ hàng
              </Button>
              <Button size="large" type="primary">
                Mua ngay
              </Button>
              <Modal
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Thêm sản phẩm này vào giỏ hàng của bạn?</p>
              </Modal>
            </Space>
            <Paragraph className="mt-4" type="secondary">
              Giao Nhanh Miễn Phí 2H - Nhận hàng trước 16h hôm nay nếu đặt trong
              43 phút tới.
            </Paragraph>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCard;
