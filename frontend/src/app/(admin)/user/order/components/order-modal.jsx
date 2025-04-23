'use client';

import React from "react";
import { Modal, Descriptions, Table } from "antd";

const formatDate = (timestamp) => new Date(timestamp).toLocaleString("en-GB");

const OrderModal = ({ visible, onClose }) => {
    const [state, setState] = React.useState({
        item: {
            "orderId": "o1",
            "status": "inProgress",
            "paymentMethod": "COD",
            "paymentStatus": false,
            "createdAt": 1713100000000,
            "userId": "u1",
            "phoneNumber": "0909123456",
            "email": "john.doe@example.com",
            "username": "johnny",
            "shippingAddress": {
                "receiverName": "John Doe",
                "receiverPhone": "0909123456",
                "city": "Hồ Chí Minh",
                "district": "Quận 1",
                "town": "Phường Bến Nghé",
                "additionalInformation": "Tầng 5, toà nhà Bitexco"
            },
            "products": [
                {
                    "productId": "p1",
                    "name": "Toner Klairs",
                    "description": "Nước hoa hồng cho da nhạy cảm",
                    "price": 250000,
                    "quantity": 2
                },
                {
                    "productId": "p2",
                    "name": "Serum The Ordinary",
                    "description": "Serum phục hồi da",
                    "price": 320000,
                    "quantity": 1
                }
            ]
        },
    });
    const [order, setOrder] = React.useState(null);

    React.useEffect(() => {
        setOrder(state?.item);
    }, [state]);

    const userInfo = [
        { label: "Tên người dùng", children: order?.username },
        { label: "Email", children: order?.email },
        { label: "SĐT", children: order?.phoneNumber },
        { label: "Phương thức thanh toán", children: order?.paymentMethod },
        { label: "Trạng thái thanh toán", children: order?.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán" },
        { label: "Ngày tạo đơn", children: formatDate(order?.createdAt) },
        { label: "Trạng thái đơn hàng", children: order?.status },
    ];

    const shippingInfo = [
        { label: "Người nhận", children: order?.shippingAddress?.receiverName },
        { label: "SĐT người nhận", children: order?.shippingAddress?.receiverPhone },
        { label: "Thành phố", children: order?.shippingAddress?.city },
        { label: "Quận", children: order?.shippingAddress?.district },
        { label: "Phường", children: order?.shippingAddress?.town },
        { label: "Thông tin thêm", children: order?.shippingAddress?.additionalInformation },
    ];

    const productColumns = [
        { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        { title: "Đơn giá", dataIndex: "price", key: "price", render: (price) => `${price.toLocaleString()} đ` },
        { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
        {
            title: "Tổng",
            key: "total",
            render: (_, record) => `${(record.price * record.quantity).toLocaleString()} đ`,
        },
    ];

    return (
        <Modal
            title={`Chi tiết đơn hàng #${order?.orderId}`}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <Descriptions title="Thông tin người dùng" bordered items={userInfo} />
            <Descriptions title="Địa chỉ giao hàng" bordered items={shippingInfo} style={{ marginTop: 20 }} />
            <Table
                title={() => "Danh sách sản phẩm"}
                columns={productColumns}
                dataSource={order?.products}
                rowKey="productId"
                pagination={false}
                style={{ marginTop: 20 }}
            />
        </Modal>
    );
};

export default OrderModal;