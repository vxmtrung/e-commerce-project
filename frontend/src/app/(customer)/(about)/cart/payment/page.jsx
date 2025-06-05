'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Typography, Divider, Space, Row, Col, App, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux_hooks';
import { useAppRouter } from '@/hooks/router_hook';
import { T } from '@/app/common';

const { Option } = Select;
const { Title, Paragraph } = Typography;

export default function PaymentPage() {
  const client = T.client;
  const [form] = Form.useForm();
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useAppRouter();
  const user = useAppSelector('systemState', 'userReducer').user;
  const paymentMethod = Form.useWatch('paymentMethod', form);

  useEffect(() => {
    const storedData = localStorage.getItem('checkoutData');
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    }
    // console.log('Checkout Data:', JSON.parse(storedData));
  }, []);

  const handleSubmit = async (values) => {
    if (loading) return;
    setLoading(true);
    // console.log('Checkout Data:', checkoutData);
    try {
      // Map payment method to backend enum
      const paymentMethodMap = {
        'tra_truoc': 'CREDIT_CARD',
        'tra_sau': 'CASH_ON_DELIVERY'
      };

      const orderData = {
        ...values,
        userId: user.id,
        paymentMethod: paymentMethodMap[values.paymentMethod],
        data: checkoutData.data.map(item => ({
          brand: item.brand || '',
          description: item.description || '',
          image: item.image || '',
          initialPrice: item.initialPrice?.toString() || '0',
          key: item.id || '',
          price: item.price?.toString() || '0',
          productName: item.name || '',
          quantity: item.quantity?.toString() || '0'
        })),
        discount: checkoutData.discount || 0,
        subtotal: checkoutData.subtotal || 0,
        total: checkoutData.total || 0
      };
      // console.log('Order Data:', orderData);
      const response = await client.post('/orders', orderData);

      localStorage.removeItem('checkoutData');
      openSuccessNotification();

      // Redirect based on payment method
      if (values.paymentMethod === 'tra_truoc') {
        // Store order ID for the payment page
        localStorage.setItem('pendingOrderId', response.id);
        router.push('payment/online-method', { id: response.id });
      } else {
        router.push('/order');
      }
    } catch (error) {
      message.error({
        content: 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!',
      });
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };
  const openSuccessNotification = () => {
    message.success({
      content: paymentMethod === 'tra_truoc'
        ? 'Đơn hàng đã được tạo. Vui lòng tiến hành thanh toán!'
        : 'Đơn hàng của bạn sẽ được xử lý!',
    });
  }; if (!user) {
    router.push('/login');
    return null;
  }

  if (!checkoutData) {
    return (
      <App>
        <div>Loading...</div>
      </App>
    );
  }

  return (
    <App>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Thông tin thanh toán</Title>

        <Row gutter={32} align="start">
          <Col xs={24} md={10} lg={6}>
            <div style={{ marginBottom: 24 }}>
              <Title level={4}>Tóm tắt đơn hàng</Title>
              <p>Tạm tính: {new Intl.NumberFormat('vi-VN').format(checkoutData.subtotal)} ₫</p>
              <p>Giảm giá: {new Intl.NumberFormat('vi-VN').format(checkoutData.discount)} ₫</p>
              <p><strong>Tổng cộng: {new Intl.NumberFormat('vi-VN').format(checkoutData.total)} ₫</strong></p>
            </div>
          </Col>

          <Col xs={24} md={14} lg={18}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Tên tài khoản"
                name="username"
                initialValue={user?.username}
              >
                <Input disabled />
              </Form.Item>            <Form.Item
                label="Email"
                name="email"
                initialValue={user?.email || 'ecommerce@gmail.com'}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Họ và tên người nhận"
                name="receiverName"
                initialValue={user?.name}
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
              >
                <Input placeholder="Nhập họ và tên người nhận" />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Số điện thoại người nhận"
                    name="receiverPhone"
                    initialValue={user?.phoneNumber}
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại!' },
                      { pattern: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                  >
                    <Input placeholder="Số điện thoại người nhận" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Số điện thoại dự phòng"
                    name="backupPhone"
                    rules={[
                      { pattern: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                  >
                    <Input placeholder="Số điện thoại dự phòng" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Địa chỉ nhận"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input placeholder="Nhập địa chỉ giao hàng" />
              </Form.Item>

              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
              >
                <Select placeholder="Chọn phương thức thanh toán">
                  <Option value="tra_truoc">Thanh toán online</Option>
                  <Option value="tra_sau">Thanh toán khi nhận hàng</Option>
                </Select>
              </Form.Item>

              {paymentMethod === 'tra_truoc' && (
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  💳 Sau khi xác nhận, bạn sẽ được chuyển hướng đến Thanh toán online qua cổng thanh toán để hoàn tất việc mua hàng một cách an toàn.
                </Paragraph>
              )}            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Xác nhận thanh toán
                </Button>
              </Form.Item>
            </Form>
          </Col>      </Row>
      </Space>
    </App>
  );
}
