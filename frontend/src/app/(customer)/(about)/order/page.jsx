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
      total: 358.000,
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
        { name: 'Dầu gội TRESemmé 640g', quantity: 2, price: 179.000 },
      ],
    },
    {
      id: 'ORD-002',
      date: new Date('2024-04-18'),
      status: 'Đang xử lý',
      total: 695.000,
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
        { name: 'Mascara BROWIT 5.5g', quantity: 1, price: 97.000 },
        { name: 'Son kem lì 3CE Velvet Lip Tint 4g', quantity: 1, price: 279.000 },
        { name: 'Cushion APERIRE SPF50+ 13g', quantity: 1, price: 319.000 }
      ],
    },
    {
      id: 'ORD-003',
      date: new Date('2024-04-19'),
      status: 'Đang giao',
      total: 159.000,
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
        { name: 'Kem dưỡng ẩm COCOON Thạch Hoa Hồng 30ml', quantity: 1, price: 159.000 }
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
                      <Title level={4}>Đơn hàng</Title>
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
          locale={{ emptyText: 'Không có đơn hàng nào đang xử lý' }}
        />
      ),
    },
    {
      key: 'send',
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
          locale={{ emptyText: 'Không có đơn hàng nào đã hủy' }}
        />
      ),
    },
  ];

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