'use client';
import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    Typography,
    QRCode,
    Button,
    message,
    Descriptions,
    List,
    Space,
    Divider,
    Spin,
    Flex,
    Image,
} from 'antd';
import { useSearchParams } from 'next/navigation';
import { T } from '@/app/common';

const { Title, Text } = Typography;

export default function PaymentPage() {
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);
    const [order, setOrder] = useState(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    // Giả lập gọi API
    useEffect(() => {
        const fetch = async () => {
            try {
                const order = await T.client.get(`/orders/${id}`);
                setOrder(order);
                setLoading(false);
            } catch (error) {
                T.message.error(error);
                return false;
            }
        };
        fetch();
    }, [id]);

    if (loading || !order) {
        return (
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Spin tip="Đang tải đơn hàng..." />
            </Row>
        );
    }

    const total = order.items.reduce(
        (sum, item) => sum + item.price * (1 - item.discountPercent / 100) * item.quantity,
        0
    );

    const paymentUrl = `https://qr.sepay.vn/img?acc=0344253459&bank=MB&amount=${total}&des=${order.orderId}&template=compact`;

    return (
        <Row justify="center" align="top" gutter={24} style={{ padding: 24 }}>
            <Col xs={24} md={10}>
                <Card >
                    <Flex vertical align="center">
                        <Title level={3}>Thanh toán đơn hàng</Title>

                        <Space direction="vertical" size="small" align="center">
                            <Text strong>Mã đơn hàng:</Text>
                            <Text>#{order.orderId}</Text>
                            {/* <QRCode value={paymentUrl} size={200} /> */}
                            {!!paymentUrl && <Image src={paymentUrl} />}
                            <Text type="secondary">Quét mã QR để thanh toán</Text>
                        </Space>

                    </Flex>
                </Card>
            </Col>

            <Col xs={24} md={14}>
                <Card title="Thông tin đơn hàng">
                    <Descriptions
                        bordered
                        size="small"
                        column={1}
                        labelStyle={{ fontWeight: 'bold' }}
                    >
                        <Descriptions.Item label="Mã đơn hàng">
                            {order.orderId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Khách hàng">
                            {order.buyer.name} ({order.buyer.email})
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            {order.buyer.phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ giao hàng">
                            {order.shippingAddress}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">
                            {order.paymentMethod == 'CREDIT_CARD' ? 'Thanh toán online' : 'COD'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái thanh toán">
                            {order.paymentStatus == 'COMPLETED' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {new Date(order.createdAt).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Title level={5}>Sản phẩm</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={order.items}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${item.productName} - ${item.instanceName} (x${item.quantity})`}
                                    description={item.description || ''}
                                />
                                <Text>
                                    {(item.price * (1 - item.discountPercent / 100) * item.quantity).toLocaleString('vi-VN')}₫
                                </Text>
                            </List.Item>
                        )}
                    />

                    <Divider />

                    <Row justify="end">
                        <Text strong>Tổng tiền: {total.toLocaleString('vi-VN')}₫</Text>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}
