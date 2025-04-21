'use client';

import { useState } from 'react';
import { Tabs, Card, Tag, Button, List, Space, Typography, Modal, Steps } from 'antd';
import { useRouter } from 'next/navigation';
import dateformat from 'dateformat';

const { Title, Text } = Typography;
const { Step } = Steps;

const formatPrice = (price) => {
  if (!price) return 'N/A';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const OrderPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all_orders');
  const [trackingModalVisible, setTrackingModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock order data - replace with actual data from your backend
  const orders = [
    {
      id: 'ORD-001',
      date: new Date('2024-04-20'),
      status: 'Đã nhận',
      total: 299.99,
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
        { name: 'Product 1', quantity: 2, price: 99.99 },
        { name: 'Product 2', quantity: 1, price: 100.00 },
      ],
    },
    {
      id: 'ORD-002',
      date: new Date('2024-04-18'),
      status: 'Đang xử lý',
      total: 149.99,
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
        { name: 'Product 3', quantity: 1, price: 149.99 },
      ],
    },
  ];

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

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setTrackingModalVisible(true);
  };

  const handleViewDetails = (orderId) => {
    router.push(`/order/${orderId}`);
  };

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
                      <Title level={4}>Order #{order.id}</Title>
                      <Text type="secondary">
                        {dateformat(order.date, 'dd/mm/yyyy')}
                      </Text>
                    </div>
                    <Space>
                      {getStatusTag(order.status)}
                      <Text strong>{formatPrice(order.total.toFixed(3))} ₫</Text>
                    </Space>
                  </Space>
                  
                  <List
                    size="small"
                    dataSource={order.items}
                    renderItem={(item) => (
                      <List.Item>
                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                          <Text>{item.name} x {item.quantity}</Text>
                          <Text>{formatPrice((item.price * item.quantity).toFixed(3))} ₫</Text>
                        </Space>
                      </List.Item>
                    )}
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
      children: 'Processing orders will be shown here',
    },
    {
      key: 'send',
      label: 'Đang giao',
      children: 'Processing orders will be shown here',
    },
    {
      key: 'received',
      label: 'Đã nhận',
      children: 'Shipped orders will be shown here',
    },
    {
      key: 'cancelled',
      label: 'Đã hủy',
      children: 'Delivered orders will be shown here',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
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