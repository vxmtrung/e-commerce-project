'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Tag, Button, List, Space, Typography, Steps, Descriptions } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dateformat from 'dateformat';

const { Title, Text } = Typography;
const { Step } = Steps;

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;

  // Mock order data - replace with actual data from your backend
  const order = {
    id: orderId,
    date: new Date('2024-04-20'),
    status: 'Đã nhận',
    total: 299.99,
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'
    },
    paymentMethod: 'Chuyển khoản ngân hàng',
    tracking: {
      currentStep: 3,
      steps: [
        { title: 'Đã đặt hàng', description: '20/04/2024 10:00' },
        { title: 'Đang xử lý', description: '20/04/2024 11:30' },
        { title: 'Đang giao', description: '21/04/2024 09:00' },
        { title: 'Đã nhận', description: '21/04/2024 15:30' },
      ]
    },
    items: [
      { 
        name: 'Product 1', 
        quantity: 2, 
        price: 99.99,
        image: 'https://via.placeholder.com/100',
        description: 'Mô tả sản phẩm 1'
      },
      { 
        name: 'Product 2', 
        quantity: 1, 
        price: 100.00,
        image: 'https://via.placeholder.com/100',
        description: 'Mô tả sản phẩm 2'
      },
    ],
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const getStatusTag = (status) => {
    const statusColors = {
      'Đã nhận': 'success',
      'Đang xử lý': 'processing',
      'Đã hủy': 'error',
      'Đang giao': 'warning',
    };

    return (
      <Tag color={statusColors[status] || 'default'}>
        {status}
      </Tag>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => router.back()}
        style={{ marginBottom: 16 }}
      >
        Quay lại
      </Button>

      <Title level={2}>Chi tiết đơn hàng #{order.id}</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Order Status */}
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Text strong>Trạng thái đơn hàng:</Text>
              {getStatusTag(order.status)}
            </Space>
            <Steps
              current={order.tracking.currentStep}
              items={order.tracking.steps.map(step => ({
                title: step.title,
                description: step.description,
              }))}
            />
          </Space>
        </Card>

        {/* Order Items */}
        <Card title="Sản phẩm">
          <List
            itemLayout="horizontal"
            dataSource={order.items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover' }} />}
                  title={item.name}
                  description={item.description}
                />
                <Space direction="vertical" align="end">
                  <Text strong>{formatPrice(item.price.toFixed(3))} ₫</Text>
                  <Text>Số lượng: {item.quantity}</Text>
                  <Text strong>Tổng: {formatPrice((item.price * item.quantity).toFixed(3))} ₫</Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        {/* Order Information */}
        <Card title="Thông tin đơn hàng">
          <Descriptions column={1}>
            <Descriptions.Item label="Ngày đặt hàng">
              {dateformat(order.date, 'dd/mm/yyyy HH:MM')}
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              {order.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              <Text strong>{formatPrice(order.total.toFixed(3))} ₫</Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Shipping Information */}
        <Card title="Thông tin giao hàng">
          <Descriptions column={1}>
            <Descriptions.Item label="Người nhận">
              {order.shippingAddress.name}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {order.shippingAddress.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {order.shippingAddress.address}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  );
};

export default OrderDetailPage; 