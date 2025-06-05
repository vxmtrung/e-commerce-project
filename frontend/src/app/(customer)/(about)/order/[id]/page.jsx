'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Tag, Button, List, Space, Typography, Steps, Descriptions, App } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dateformat from 'dateformat';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux_hooks';
import { T } from '@/app/common';
import { useAppRouter } from '@/hooks/router_hook';

const { Title, Text } = Typography;
const { Step } = Steps;

const OrderDetailPage = ({ params }) => {
  const client = T.client;
  const router = useAppRouter();
  const orderId = params.id;
  const [currentOrder, setCurentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector('systemState', 'userReducer').user;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const order = await client.get(`/orders/${orderId}`);
        // const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        //   headers: {
        //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MWRlNzllLTU0NWMtNGY1MS1iZmZkLTIwZjBmYWU1MDhkNCIsIm5hbWUiOiJOZ3V5ZW4iLCJ1c2VybmFtZSI6Im5ndXllbmdsMDMiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0ODk1MTg2NywiZXhwIjoxNzQ5MDM4MjY3fQ.Od_Ju44jZQe2CWiXRlKAGQ2ouNfQOUzcaeVAAYs3qr4`
        //   }
        // });
        // const order = await response.json();
        // console.log('Order:', order);
        // Status mapping from backend to frontend display text
        const statusMap = {
          'IN_PROGRESS': 'Đang xử lý',
          'SENT': 'Đang giao',
          'CANCELLED': 'Đã hủy',
          'RECEIVED': 'Đã nhận'
        };

        // Create tracking steps based on order status and timestamps
        const steps = [
          { title: 'Đã đặt hàng', description: dateformat(order?.createdAt, 'dd/mm/yyyy HH:MM') },
          { title: 'Đang xử lý', description: order?.status === 'IN_PROGRESS' ? dateformat(order?.updatedAt, 'dd/mm/yyyy HH:MM') : null },
          { title: 'Đang giao', description: order?.status === 'SENT' ? dateformat(order?.updatedAt, 'dd/mm/yyyy HH:MM') : null },
          { title: 'Đã nhận', description: order?.status === 'RECEIVED' ? dateformat(order?.updatedAt, 'dd/mm/yyyy HH:MM') : null }
        ];

        setCurentOrder({
          id: order.orderId,
          date: new Date(order?.createdAt),
          status: statusMap[order?.status] || 'Đang xử lý',
          total: order?.totalPrice,
          shippingAddress: {
            name: order?.buyer.name,
            phone: order?.buyer.phoneNumber,
            address: order?.shippingAddress
          },
          paymentMethod: order?.paymentMethod === 'CREDIT_CARD' ? 'Thanh toán online' : 'Thanh toán khi nhận hàng',
          paymentStatus: order?.paymentStatus === 'COMPLETED' ? 'Đã thanh toán' : 'Đợi thanh toán',
          tracking: {
            currentStep: order?.status === 'CANCELLED' ? -1 : Math.max(['IN_PROGRESS', 'SENT', 'RECEIVED'].indexOf(order?.status), 0),
            steps: order?.status === 'CANCELLED' ?
              [{ title: 'Đã đặt hàng', description: dateformat(order?.createdAt, 'dd/mm/yyyy HH:MM') },
              { title: 'Đã hủy', description: dateformat(order?.updatedAt, 'dd/mm/yyyy HH:MM') }] : steps
          },
          items: order?.items?.map(item => ({
            name: item?.productName + (item?.instanceName ? ` (${item?.instanceName})` : ''),
            quantity: item?.quantity,
            price: item?.price,
            discountPercent: item?.discountPercent || 0,
            finalPrice: item?.price * (100 - (item?.discountPercent || 0)) / 100
          }))
        });
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
      // console.log('Current Order:', currentOrder);
    };

    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const getStatusTag = (status) => {
    const statusColors = {
      'Đã nhận': 'success',
      'Đang xử lý': 'processing',
      'Đã hủy': 'error',
      'Đang giao': 'warning'
    };

    return (
      <Tag color={statusColors[status] || 'default'}>
        {status}
      </Tag>
    );
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  if (loading || !currentOrder) {
    return (
      <App>
        <div style={{ padding: '24px' }}>
          <Card loading={true} />
        </div>
      </App>
    );
  }

  return (
    <App>
      <div style={{ padding: '24px' }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          style={{ marginBottom: 16 }}
        >
          Quay lại
        </Button>

        <Title level={2}>Chi tiết đơn hàng </Title>

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
                  <Space style={{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Space>
                      <img
                        src={item.image || "https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg"}
                        alt={item.name}
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                      />
                      <div>
                        <Text strong>{item.name}</Text>
                        {item.description && <div><Text type="secondary">{item.description}</Text></div>}
                      </div>
                    </Space>                    <Space direction="vertical" align="end" style={{ minWidth: '150px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        {item.discountPercent > 0 ? (
                          <>
                            <Text delete type="secondary">{formatPrice(item.price)} ₫</Text>
                            <Text type="danger">{formatPrice(item.finalPrice)} ₫</Text>
                          </>
                        ) : (
                          <Text>{formatPrice(item.price)} ₫</Text>
                        )}
                      </div>
                      <Text>Số lượng: {item.quantity}</Text>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        {item.discountPercent > 0 && (
                          <Text delete type="secondary" style={{ fontSize: '12px' }}>
                            Tổng: {formatPrice(item.price * item.quantity)} ₫
                          </Text>
                        )}
                        <Text strong type={item.discountPercent > 0 ? "danger" : undefined}>
                          Tổng: {formatPrice(item.finalPrice * item.quantity)} ₫
                        </Text>
                      </div>
                    </Space>
                  </Space>
                </List.Item>
              )}
            />
          </Card>

          {/* Order Information */}
          <Card title="Thông tin đơn hàng">
            <Descriptions column={1}>
              <Descriptions.Item label="Mã đơn hàng">
                {currentOrder.id}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng">
                {dateformat(currentOrder.date, 'dd/mm/yyyy HH:MM')}
              </Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">
                {currentOrder.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Tình trạng thanh toán">
                {currentOrder.paymentStatus}
                {
                  currentOrder.paymentMethod == 'Thanh toán online' && currentOrder.paymentStatus == 'Đợi thanh toán' &&
                  <>{' - '}<Typography.Link onClick={() => router.push('/cart/payment/online-method', { id: params.id })}>Thanh toán ngay</Typography.Link></>
                }
              </Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">
                <Text strong>{formatPrice(currentOrder.total)} ₫</Text>
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
    </App>
  );
};

export default OrderDetailPage;