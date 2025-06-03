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
  message,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/hooks/redux_hooks';

const { Title, Text, Paragraph } = Typography;

const ProductCard = ({ productDetail }) => {
  const [selectedVolume, setSelectedVolume] = useState('180ml');
  const volumeOptions = ['2×180ml', '2×30ml', '10ml', '30ml', '180ml'];
  const user = useAppSelector('systemState', 'userReducer').user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentCart = JSON.parse(localStorage.getItem(user?.id)) || [];
  const productIndex = currentCart.findIndex(
    (item) => item.id === productDetail.id
  );

  const formatPrice = (price) => {
    if (price == 0) return 0;
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const finalPrice =
    (productDetail?.price * (100 - productDetail?.discountPercent)) / 100;
  const marketPrice = productDetail?.price;
  const savings =
    productDetail?.price -
    (productDetail?.price * (100 - productDetail?.discountPercent)) / 100;

  const formattedFinalPrice = formatPrice(finalPrice);
  const formattedMarketPrice = formatPrice(marketPrice);
  const formattedSavings = formatPrice(savings);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (user) {
      //đã đăng nhập
      if (productIndex === -1) {
        //chưa có sản phẩm trong cart -> thêm vào cart
        const newProduct = {
          key: productDetail.id,
          brand: productDetail.brand,
          productName: productDetail.productName,
          initialPrice: marketPrice, //giá gốc
          price: finalPrice, //giá đã giảm
          image: productDetail.img,
          description: productDetail.shortDescription,
          name: productDetail.name, //phiên bản
        };

        currentCart.push(newProduct);
        localStorage.setItem(user.id, JSON.stringify(currentCart));
        message.success('Thêm vào giỏ hàng thành công!');
      } else {
        //đã có -> xoá khỏi cart
        currentCart.splice(productIndex, 1);
        localStorage.setItem(user.id, JSON.stringify(currentCart));
        message.info('Đã xoá khỏi giỏ hàng');
      }
    }

    setIsModalOpen(false);
    console.log(JSON.parse(localStorage.getItem(user?.id)));
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
            // src="https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg"
            src={productDetail.img}
            width={200}
            alt="main"
            className="rounded"
          />
          <Row gutter={[8, 8]} className="mt-4">
            {[...Array(5)].map((_, i) => (
              <Col key={i} span={4}>
                <Image
                  // src="https://bizweb.dktcdn.net/thumb/1024x1024/100/382/633/products/nuoc-hoa-hong-klairs-supple-preparation-unscented-toner9-9764296c7e5d4014b41aa66251372d1a-master.jpg?v=1587697312593"
                  src={productDetail.img}
                  swidth={40}
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
              {formattedFinalPrice} đ
            </Title>
            <Text>
              Giá trị trường: {formattedMarketPrice} ₫ - Tiết kiệm:{' '}
              {formattedSavings} ₫ ({productDetail.discountPercent} %)
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
                {user ? (
                  productIndex === -1 ? (
                    <p>Thêm sản phẩm này vào giỏ hàng của bạn?</p>
                  ) : (
                    <p>Xoá sản phẩm này khỏi giỏ hàng của bạn?</p>
                  )
                ) : (
                  <p>Vui lòng đăng nhập để thêm vào giỏ hàng</p>
                )}
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
