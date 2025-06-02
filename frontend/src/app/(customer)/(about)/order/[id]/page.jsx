'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Tag, Button, List, Space, Typography, Steps, Descriptions } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dateformat from 'dateformat';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { Step } = Steps;

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;
  const [currentOrder, setCurentOrder] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `http://localhost:3000/orders/${orderId}`,
        {
          method: 'GET'
        }
      ).then(
        async res => {
          const status = ['IN_PROGRESS', 'SENT', 'CANCELLED', 'RECEIVED'];
          const order = await res.json();

          setCurentOrder({
            id: order.orderId,
            date: new Date(order?.createdAt),
            status: order?.status,
            total: order?.totalPrice,
            shippingAddress: {
              name: order?.shippingAddress,
              phone: order?.buyer?.phoneNumber,
              address: order?.shippingAddress
            },
            paymentMethod: order?.paymentMethod,
            tracking: {
              currentStep: Math.max(status.findIndex(s => s === order?.status), 0),
              steps: [
                { title: 'Đã đặt hàng', description: '20/04/2024 10:00' },
                { title: 'Đang xử lý', description: '20/04/2024 11:30' },
                { title: 'Đang giao', description: '21/04/2024 09:00' },
                { title: 'Đã nhận', description: '21/04/2024 15:30' },
              ]
            },
            items: order?.items?.map(item => {
              return {
                name: item?.productName + ' (' + item?.instanceName + ')',
                quantity: item?.quantity,
                price: item?.price,
                image: 'https://naris.vn/uploads/san-pham/2022/11/sp1-18.jpg',
                description: ''
              };
            }),
          });
        }
      ).catch(
        e => console.log(e)
      );
    };
    fetchData();
  }, []);

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
              {getStatusTag(currentOrder?.status)}
            </Space>
            <Steps
              current={currentOrder?.tracking?.currentStep}
              items={currentOrder?.tracking?.steps?.map(step => ({
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
            dataSource={currentOrder?.items}
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
              {dateformat(currentOrder?.date, 'dd/mm/yyyy HH:MM')}
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              {currentOrder?.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              <Text strong>{formatPrice(currentOrder?.total?.toFixed(3))} ₫</Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Shipping Information */}
        <Card title="Thông tin giao hàng">
          <Descriptions column={1}>
            <Descriptions.Item label="Người nhận">
              {currentOrder?.shippingAddress?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {currentOrder?.shippingAddress?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {currentOrder?.shippingAddress?.address}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  );
};

export default OrderDetailPage; 