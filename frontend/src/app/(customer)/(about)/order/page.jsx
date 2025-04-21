'use client';

import { useState } from 'react';
import { Tabs, Card, Tag, Button, List, Space, Typography } from 'antd';
import dateformat from 'dateformat';

const { Title, Text } = Typography;

const formatPrice = (price) => {
  if (!price) return 'N/A';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock order data - replace with actual data from your backend
  const orders = [
    {
      id: 'ORD-001',
      date: new Date('2024-04-20'),
      status: 'Đã nhận',
      total: 299.99,
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
                    <Button type="default">View Details</Button>
                    <Button type="primary">Track Order</Button>
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
        defaultActiveKey="all"
        items={items}
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
};

export default OrderPage; 