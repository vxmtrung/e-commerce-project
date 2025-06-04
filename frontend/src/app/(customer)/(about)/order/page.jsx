'use client';

import { useState, useEffect } from 'react';
import { Tabs, Card, Tag, Button, List, Space, Typography, Modal, Steps } from 'antd';
import { useRouter } from 'next/navigation';
import dateformat from 'dateformat';
import { useAppSelector } from '@/hooks/redux_hooks';
import { T } from '@/app/common';
const { Title, Text } = Typography;
const { Step } = Steps;

const formatPrice = (price) => {
  if (!price) return 'N/A';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const OrderPage = () => {
  const client = T.client;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all_orders');
  const [trackingModalVisible, setTrackingModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const user = useAppSelector('systemState', 'userReducer').user;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id) return;
        const data = await client.get(`/orders/user/${user.id}`);
        // const response = await fetch(`http://localhost:3000/orders/user/${user.id}`, {
        //   headers: {
        //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MWRlNzllLTU0NWMtNGY1MS1iZmZkLTIwZjBmYWU1MDhkNCIsIm5hbWUiOiJOZ3V5ZW4iLCJ1c2VybmFtZSI6Im5ndXllbmdsMDMiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0ODk1MTg2NywiZXhwIjoxNzQ5MDM4MjY3fQ.Od_Ju44jZQe2CWiXRlKAGQ2ouNfQOUzcaeVAAYs3qr4`
        //   }
        // });
        // const data = await response.json();
        // console.log('Orders:', data);
        // Status mapping from backend to frontend display text
        const statusMap = {
          'IN_PROGRESS': 'Đang xử lý',
          'SENT': 'Đang giao',
          'CANCELLED': 'Đã hủy',
          'RECEIVED': 'Đã nhận'
        }; setOrders(data.map(order => {
          const orderStatus = statusMap[order?.status] || 'Đang xử lý';
          const steps = [
            { title: 'Đã đặt hàng', description: dateformat(order?.createdAt, 'dd/mm/yyyy HH:MM') },
            { title: 'Đang xử lý', description: order?.status === 'IN_PROGRESS' ? dateformat(order?.updatedAt, 'dd/mm/yyyy HH:MM') : null },
            { title: 'Đang giao', description: order?.status === 'SENT' ? dateformat(order?.updatedAt, 'dd/mm/yyyy HH:MM') : null },
            { title: 'Đã nhận', description: order?.status === 'RECEIVED' ? dateformat(order?.updatedAt, 'dd/mm/yyyy HH:MM') : null },
          ];

          return {
            id: order?.orderId,
            date: new Date(order?.createdAt),
            status: orderStatus,
            total: order?.totalPrice,
            discount: order?.discount,
            subtotal: order?.subtotal,
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
            })),
          };
        }));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, [user?.id]);
  const getStatusTag = (status) => {
    const statusColors = {
      'Đã nhận': 'success',
      'Đang xử lý': 'processing',
      'Đã hủy': 'error',
      'Đang giao': 'warning',
    };

    const color = statusColors[status] || 'default';

    return (
      <Tag color={color}>
        {status}
      </Tag>
    );
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setTrackingModalVisible(true);
  };

  const handleViewDetails = (orderId) => {
    router.push(`/order/${orderId}`);
  };

  const renderOrderItem = (item) => (
    <List.Item>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Text>{item.name} x {item.quantity}</Text>
        <Space direction="vertical" align="end">
          {item.discountPercent > 0 && (
            <Text delete type="secondary" style={{ fontSize: '12px' }}>
              {formatPrice((item.price * item.quantity).toFixed(0))} ₫
            </Text>
          )}
          <Text type={item.discountPercent > 0 ? "danger" : undefined}>
            {formatPrice((item.finalPrice * item.quantity).toFixed(0))} ₫
          </Text>
        </Space>
      </Space>
    </List.Item>
  );

  const items = [
    {
      key: 'all_orders',
      label: 'Tất cả',
      children: (
        <List
          itemLayout="vertical"
          dataSource={orders}
          renderItem={(order) => (
            <List.Item>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <Title level={4}>Đơn hàng</Title>
                      <Text type="secondary">
                        {dateformat(order.date, 'dd/mm/yyyy')}
                      </Text>
                    </div>
                    <Space>
                      {getStatusTag(order.status)}
                      <Text strong>{formatPrice(order.total.toFixed(0))} ₫</Text>
                    </Space>
                  </Space>

                  <List
                    size="small"
                    dataSource={order.items}
                    renderItem={renderOrderItem}
                  />

                  <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
                    <Button type="default" onClick={() => handleViewDetails(order.id)}>Xem chi tiết</Button>
                    <Button type="primary" onClick={() => handleTrackOrder(order)}>Theo dõi đơn hàng</Button>
                  </Space>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'in_progress',
      label: 'Đang xử lý',
      children: (
        <List
          itemLayout="vertical"
          dataSource={orders.filter(order => order.status === 'Đang xử lý')}
          renderItem={(order) => (
            <List.Item>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <Title level={4}>Đơn hàng</Title>
                      <Text type="secondary">
                        {dateformat(order.date, 'dd/mm/yyyy')}
                      </Text>
                    </div>
                    <Space>
                      {getStatusTag(order.status)}
                      <Text strong>{formatPrice(order.total.toFixed(0))} ₫</Text>
                    </Space>
                  </Space>

                  <List
                    size="small"
                    dataSource={order.items}
                    renderItem={renderOrderItem}
                  />

                  <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
                    <Button type="default" onClick={() => handleViewDetails(order.id)}>Xem chi tiết</Button>
                    <Button type="primary" onClick={() => handleTrackOrder(order)}>Theo dõi đơn hàng</Button>
                  </Space>
                </Space>
              </Card>
            </List.Item>
          )} locale={{ emptyText: 'Không có đơn hàng nào đang xử lý' }}
        />
      ),
    },
    {
      key: 'sent',
      label: 'Đang giao',
      children: (
        <List
          itemLayout="vertical"
          dataSource={orders.filter(order => order.status === 'Đang giao')}
          renderItem={(order) => (
            <List.Item>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <Title level={4}>Đơn hàng</Title>
                      <Text type="secondary">
                        {dateformat(order.date, 'dd/mm/yyyy')}
                      </Text>
                    </div>
                    <Space>
                      {getStatusTag(order.status)}
                      <Text strong>{formatPrice(order.total.toFixed(0))} ₫</Text>
                    </Space>
                  </Space>

                  <List
                    size="small"
                    dataSource={order.items}
                    renderItem={renderOrderItem}
                  />

                  <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
                    <Button type="default" onClick={() => handleViewDetails(order.id)}>Xem chi tiết</Button>
                    <Button type="primary" onClick={() => handleTrackOrder(order)}>Theo dõi đơn hàng</Button>
                  </Space>
                </Space>
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: 'Không có đơn hàng nào đang giao' }}
        />
      ),
    },
    {
      key: 'received',
      label: 'Đã nhận',
      children: (
        <List
          itemLayout="vertical"
          dataSource={orders.filter(order => order.status === 'Đã nhận')}
          renderItem={(order) => (
            <List.Item>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <Title level={4}>Đơn hàng</Title>
                      <Text type="secondary">
                        {dateformat(order.date, 'dd/mm/yyyy')}
                      </Text>
                    </div>
                    <Space>
                      {getStatusTag(order.status)}
                      <Text strong>{formatPrice(order.total.toFixed(0))} ₫</Text>
                    </Space>
                  </Space>

                  <List
                    size="small"
                    dataSource={order.items}
                    renderItem={renderOrderItem}
                  />

                  <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
                    <Button type="default" onClick={() => handleViewDetails(order.id)}>Xem chi tiết</Button>
                    <Button type="primary" onClick={() => handleTrackOrder(order)}>Theo dõi đơn hàng</Button>
                  </Space>
                </Space>
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: 'Không có đơn hàng nào đã nhận' }}
        />
      ),
    },
    {
      key: 'cancelled',
      label: 'Đã hủy',
      children: (
        <List
          itemLayout="vertical"
          dataSource={orders.filter(order => order.status === 'Đã hủy')}
          renderItem={(order) => (
            <List.Item>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <Title level={4}>Đơn hàng</Title>
                      <Text type="secondary">
                        {dateformat(order.date, 'dd/mm/yyyy')}
                      </Text>
                    </div>
                    <Space>
                      {getStatusTag(order.status)}
                      <Text strong>{formatPrice(order.total.toFixed(0))} ₫</Text>
                    </Space>
                  </Space>

                  <List
                    size="small"
                    dataSource={order.items}
                    renderItem={renderOrderItem}
                  />

                  <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
                    <Button type="default" onClick={() => handleViewDetails(order.id)}>Xem chi tiết</Button>
                    <Button type="primary" onClick={() => handleTrackOrder(order)}>Theo dõi đơn hàng</Button>
                  </Space>
                </Space>
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: 'Không có đơn hàng nào đã hủy' }}
        />
      ),
    },
  ];
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 pb-4" >
      <Title level={2}>Đơn hàng của tôi</Title>
      <Tabs
        defaultActiveKey="all_orders"
        items={items}
        onChange={(key) => setActiveTab(key)}
      />

      <Modal
        title={`Theo dõi đơn hàng #${selectedOrder?.id}`}
        open={trackingModalVisible}
        onCancel={() => setTrackingModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedOrder && (
          <div>
            <Steps
              current={selectedOrder.tracking.currentStep}
              direction="vertical"
              items={selectedOrder.tracking.steps.map(step => ({
                title: step.title,
                description: step.description,
              }))}
            />
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Text type="secondary">
                {selectedOrder.tracking.currentStep === selectedOrder.tracking.steps.length - 1
                  ? 'Đơn hàng đã được giao thành công'
                  : selectedOrder.tracking.currentStep === 2
                    ? 'Đơn hàng đang được giao đến bạn'
                    : 'Đơn hàng đang được xử lý'}
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderPage;