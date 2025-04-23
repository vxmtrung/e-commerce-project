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

  // Mock data mapping based on orderId
  const orderData = {
    'ORD-001': {
      id: 'ORD-001',
      date: new Date('2024-04-20'),
      status: 'Đã nhận',
      total: 149.000,
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
          name: 'Kem dưỡng ẩm', 
          quantity: 2, 
          price: 49.000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_wWTqo34To5d7RJBWaolIuPLIz93JUtqzA&s',
          description: 'Kem dưỡng ẩm da mặt'
        },
        { 
          name: 'Gel Trị Mụn', 
          quantity: 1, 
          price: 51.000,
          image: 'https://naris.vn/uploads/san-pham/2022/11/sp1-18.jpg',
          description: 'Gel trị mụn hiệu quả'
        },
      ],
    },
    'ORD-002': {
      id: 'ORD-002',
      date: new Date('2024-04-18'),
      status: 'Đang xử lý',
      total: 53.000,
      shippingAddress: {
        name: 'Trần Thị B',
        phone: '0987654321',
        address: '456 Đường XYZ, Phường ABC, Quận 2, TP.HCM'
      },
      paymentMethod: 'Thanh toán khi nhận hàng',
      tracking: {
        currentStep: 1,
        steps: [
          { title: 'Đã đặt hàng', description: '18/04/2024 14:00' },
          { title: 'Đang xử lý', description: '18/04/2024 15:30' },
          { title: 'Đang giao', description: null },
          { title: 'Đã nhận', description: null },
        ]
      },
      items: [
        { 
          name: 'Mặt nạ ngủ', 
          quantity: 1, 
          price: 53.000,
          image: 'https://adminbeauty.hvnet.vn/Upload/Files/mat-na-ngu-Laneige-Water-Sleeping-Mask-15ml1.jpg',
          description: 'Mặt nạ ngủ dưỡng da'
        },
      ],
    },
    'ORD-003': {
      id: 'ORD-003',
      date: new Date('2024-04-19'),
      status: 'Đang giao',
      total: 199.00,
      shippingAddress: {
        name: 'Lê Văn C',
        phone: '0369852147',
        address: '789 Đường DEF, Phường GHI, Quận 3, TP.HCM'
      },
      paymentMethod: 'Chuyển khoản ngân hàng',
      tracking: {
        currentStep: 2,
        steps: [
          { title: 'Đã đặt hàng', description: '19/04/2024 09:00' },
          { title: 'Đang xử lý', description: '19/04/2024 10:30' },
          { title: 'Đang giao', description: '20/04/2024 08:00' },
          { title: 'Đã nhận', description: null },
        ]
      },
      items: [
        { 
          name: 'Sữa rửa mặt', 
          quantity: 1, 
          price: 89.000,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ybO1hBzEO34fR3f6a9m9zA0imBaitJMmkw&s',
          description: 'Sữa rửa mặt dịu nhẹ'
        },
        { 
          name: 'Toner', 
          quantity: 1, 
          price: 110.000,
          image: 'https://product.hstatic.net/200000061108/product/1__10__ac89acf85379445183927f4e5c1ce10c_master.jpg',
          description: 'Toner cân bằng da'
        },
      ],
    },
  };

  // Get the order data based on the orderId
  const currentOrder = orderData[orderId];

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

      <Title level={2}>Chi tiết đơn hàng</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Order Status */}
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Text strong>Trạng thái đơn hàng:</Text>
              {getStatusTag(currentOrder.status)}
            </Space>
            <Steps
              current={currentOrder.tracking.currentStep}
              items={currentOrder.tracking.steps.map(step => ({
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
            dataSource={currentOrder.items}
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
              {dateformat(currentOrder.date, 'dd/mm/yyyy HH:MM')}
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              {currentOrder.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              <Text strong>{formatPrice(currentOrder.total.toFixed(3))} ₫</Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Shipping Information */}
        <Card title="Thông tin giao hàng">
          <Descriptions column={1}>
            <Descriptions.Item label="Người nhận">
              {currentOrder.shippingAddress.name}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {currentOrder.shippingAddress.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {currentOrder.shippingAddress.address}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  );
};

export default OrderDetailPage; 