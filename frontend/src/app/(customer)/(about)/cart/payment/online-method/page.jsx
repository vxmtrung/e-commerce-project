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

const { Title, Text } = Typography;

export default function PaymentPage() {
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);
    const [order, setOrder] = useState(null);
    const [paymentUrl, setPaymentUrl] = useState('');
    // Giả lập gọi API
    useEffect(() => {
        setTimeout(() => {
            setOrder({
                orderId: 'o1',
                status: 'inProgress',
                paymentMethod: 'COD',
                paymentStatus: false,
                createdAt: 1713100000000,
                userId: 'u1',
                phoneNumber: '0909123456',
                email: 'john.doe@example.com',
                username: 'johnny',
                receiverName: 'johnny',
                shippingAddress: {
                    receiverName: 'John Doe',
                    receiverPhone: '0909123456',
                    city: 'Hồ Chí Minh',
                    district: 'Quận 1',
                    town: 'Phường Bến Nghé',
                    additionalInformation: 'Tầng 5, toà nhà Bitexco',
                },
                products: [
                    {
                        productId: 'p1',
                        name: 'Toner Klairs',
                        description: 'Nước hoa hồng cho da nhạy cảm',
                        price: 250000,
                        quantity: 2,
                    },
                    {
                        productId: 'p2',
                        name: 'Serum The Ordinary',
                        description: 'Serum phục hồi da',
                        price: 320000,
                        quantity: 1,
                    },
                ],
            });
            setLoading(false);
            setPaymentUrl(`https://qr.sepay.vn/img?acc=0344253459&bank=MB&amount=50000&des=123&template=compact`);
        }, 1000); // giả lập delay gọi API
    }, []);

    const handleCheckPayment = () => {
        setChecking(true);
        setTimeout(() => {
            setChecking(false);
            message.success('Thanh toán thành công!');
        }, 2000);
    };

    if (loading || !order) {
        return (
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Spin tip="Đang tải đơn hàng..." />
            </Row>
        );
    }

    const total = order.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // const paymentUrl = `https://example.com/pay/${order.orderId}`;

    return (
        <Row justify="center" align="top" gutter={24} style={{ padding: 24 }}>
            <Col xs={24} md={10}>
                <Card >
                    <Flex vertical align="center">
                        <Title level={3}>Thanh toán đơn hàng</Title>

                        <Space direction="vertical" size="small" align="center">
                            <Text strong>Mã đơn hàng:</Text>
                            <Text>#123456</Text>
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
                            {order.username} ({order.email})
                        </Descriptions.Item>
                        <Descriptions.Item label="Người nhận">
                            {order.receiverName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            {order.phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ giao hàng">
                            {`${order.shippingAddress.receiverName}, ${order.shippingAddress.town}, ${order.shippingAddress.district}, ${order.shippingAddress.city}. ${order.shippingAddress.additionalInformation}`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">
                            {order.paymentMethod}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái thanh toán">
                            {order.paymentStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {new Date(order.createdAt).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Title level={5}>Sản phẩm</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={order.products}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${item.name} (x${item.quantity})`}
                                    description={item.description}
                                />
                                <Text>
                                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
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
