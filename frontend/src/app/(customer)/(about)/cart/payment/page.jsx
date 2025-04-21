'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Typography, Divider, Space, Row, Col, notification } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;
const { Title, Paragraph } = Typography;

export default function PaymentPage() {
  const [form] = Form.useForm();
  const [checkoutData, setCheckoutData] = useState(null);
  const paymentMethod = Form.useWatch('paymentMethod', form);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('checkoutData');
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = (values) => {
    console.log('Form submitted:', {
      ...values,
      ...checkoutData,
    });
    localStorage.removeItem('checkoutData');
    openSuccessNotification();

    setTimeout(() => {
      router.push('/order');
    }, 1000);
  };

  const openSuccessNotification = () => {
    notification.success({
      message: 'Thành công',
      description: 'Đơn hàng của bạn sẽ được xử lý!',
      placement: 'topRight',
      duration: 2,
    });
  };

  if (!checkoutData) {
    return <div>Loading...</div>;
  }

  return (
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
              label="Họ và tên người nhận"
              name="receiverName"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input placeholder="Nhập họ và tên người nhận" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại người nhận"
                  name="receiverPhone"
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
                💳 Sau khi xác nhận, bạn sẽ được chuyển hướng đến Thanh toán online qua cổng thanh toán <strong>ZaloPay</strong> để hoàn tất việc mua hàng một cách an toàn.
              </Paragraph>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xác nhận thanh toán
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Space>
  );
}
