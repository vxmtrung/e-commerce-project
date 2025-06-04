import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Radio,
  Image,
  Badge,
  Row,
  Col,
  Typography,
  Modal,
  Space,
  message,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/hooks/redux_hooks';
import ProductDetailMenu from '@/app/(customer)/components/product_detail_menu';

const { Title, Text, Paragraph } = Typography;

const ProductCard = ({ options, product, productInstances, brand }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    if (options.length > 0) {
      setSelectedOption(options[0].name);
      handleChooseOption(options[0]);
    }
  }, [options]);

  const [instance, setInstance] = useState([]);

  const user = useAppSelector('systemState', 'userReducer').user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentCart = JSON.parse(localStorage.getItem(user?.id)) || [];

  const formatPrice = (price) => {
    if (price == 0) return 0;
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChooseOption = async (option) => {
    console.log('option: ', option);
    const selectedInstance = productInstances.find(
      (item) => item.id == option.id
    );

    const price = selectedInstance.price;
    selectedInstance.img = await fetchImg(option.id);
    selectedInstance.finalPrice =
      (price * (100 - selectedInstance.discountPercent)) / 100;
    selectedInstance.marketPrice = price;
    selectedInstance.savings = (price * selectedInstance.discountPercent) / 100;

    setInstance(selectedInstance);

    console.log('instance: ', selectedInstance);
  };

  const fetchImg = async (instanceId) => {
    try {
      const imgResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-imgs?product-instance-id=${instanceId}`
      );
      const imgJson = await imgResponse.json();
      console.log('img: ', imgJson);

      return (
        imgJson[0]?.link ||
        'https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg'
      );
    } catch (error) {
      console.error('Error fetching img: ', error);
      return 'https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg';
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (user) {
      const currentCart = JSON.parse(localStorage.getItem(user?.id)) || [];
      const instanceIndex = currentCart.findIndex(
        (item) => item.key == instance.id
      );

      if (instanceIndex === -1) {
        // chưa có -> thêm
        const newInstance = {
          key: instance.id,
          productId: product.id,
          brand: brand,
          productName: product.name,
          initialPrice: instance.marketPrice,
          price: instance.finalPrice,
          image: instance.img,
          description: product.description,
          name: instance.name,
        };

        currentCart.push(newInstance);
        localStorage.setItem(user.id, JSON.stringify(currentCart));
        message.success('Thêm vào giỏ hàng thành công!');
      } else {
        // đã có -> xoá
        currentCart.splice(instanceIndex, 1);
        localStorage.setItem(user.id, JSON.stringify(currentCart));
        message.info('Đã xoá khỏi giỏ hàng');
      }
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Space direction="vertical">
      <Card className="!w-full shadow-xl rounded-2xl">
        <Row gutter={[24, 24]}>
          {/* Left Image & Thumbnails */}
          <Col span={10}>
            <Image
              // src="https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg"
              src={instance.img}
              width={200}
              alt="main"
              className="rounded"
            />
            <Row gutter={[8, 8]} className="mt-4">
              {[...Array(5)].map((_, i) => (
                <Col key={i} span={4}>
                  <Image
                    // src="https://bizweb.dktcdn.net/thumb/1024x1024/100/382/633/products/nuoc-hoa-hong-klairs-supple-preparation-unscented-toner9-9764296c7e5d4014b41aa66251372d1a-master.jpg?v=1587697312593"
                    src={instance.img}
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
                {product.name}
              </Title>
              <Title level={3} className="text-red-600 !mb-0">
                {formatPrice(instance.finalPrice)} đ
              </Title>
              <Text>
                Giá trị trường: {formatPrice(instance.marketPrice)} ₫ - Tiết
                kiệm:
                {formatPrice(instance.savings)} ₫ ({instance.discountPercent} %)
              </Text>
              <Space>
                <Text strong>Phiên bản:</Text>
                <Radio.Group
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mt-2"
                >
                  <Space wrap>
                    {options.map((v) => (
                      <Radio.Button
                        key={v.id}
                        value={v.name}
                        onClick={() => handleChooseOption(v)}
                      >
                        {v.name}
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
                    (() => {
                      const cart =
                        JSON.parse(localStorage.getItem(user?.id)) || [];
                      const index = cart.findIndex(
                        (item) => item.key == instance.id
                      );
                      console.log('index: ', index);
                      return index === -1 ? (
                        <p>Thêm sản phẩm này vào giỏ hàng của bạn?</p>
                      ) : (
                        <p>Xoá sản phẩm này khỏi giỏ hàng của bạn?</p>
                      );
                    })()
                  ) : (
                    <p>Vui lòng đăng nhập để thêm vào giỏ hàng</p>
                  )}
                </Modal>
              </Space>
              <Paragraph className="mt-4" type="secondary">
                Giao Nhanh Miễn Phí 2H - Nhận hàng trước 16h hôm nay nếu đặt
                trong 43 phút tới.
              </Paragraph>
            </Space>
          </Col>
        </Row>
      </Card>
      <ProductDetailMenu product={product} instance={instance} brand={brand} />
    </Space>
  );
};

export default ProductCard;
