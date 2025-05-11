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
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ProductCard = () => {
  const [selectedVolume, setSelectedVolume] = useState('180ml');

  const volumeOptions = ['2×180ml', '2×30ml', '10ml', '30ml', '180ml'];

  return (
    <Card className="!w-full shadow-xl rounded-2xl">
      <Row gutter={[24, 24]}>
        {/* Left Image & Thumbnails */}
        <Col span={10}>
          <Image
            src="https://cf.shopee.vn/file/72a00b1f136e2e4c85677bde7d7d09e5"
            width={200}
            alt="main"
            className="rounded"
          />
          <Row gutter={[8, 8]} className="mt-4">
            {[...Array(5)].map((_, i) => (
              <Col key={i} span={4}>
                <Image
                  src="https://cf.shopee.vn/file/72a00b1f136e2e4c85677bde7d7d09e5"
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
              Nước Hoa Hồng Klairs Không Mùi Cho Da Nhạy Cảm 180ml
            </Title>
            <Title level={3} className="text-red-600 !mb-0">
              203.000 ₫
            </Title>
            <Text>Giá trị trường: 405.000 ₫ - Tiết kiệm: 202.000 ₫ (50%)</Text>{' '}
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
              <Button icon={<ShoppingCartOutlined />} size="large">
                Giỏ hàng
              </Button>
              <Button size="large" type="primary">
                Mua ngay
              </Button>
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
