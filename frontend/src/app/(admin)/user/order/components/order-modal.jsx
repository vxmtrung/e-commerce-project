'use client';

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Modal, Descriptions, Table, Flex, Typography } from "antd";
import { T } from "@/app/common";


const OrderModal = forwardRef((props, ref) => {
    const [state, setState] = React.useState({
        item: {},
        open: false
    });

    useEffect(() => {

    }, []);

    const { orderId, username, email, phoneNumber, paymentMethod, paymentStatus, createdAt, status, shippingAddress = {}, products } = state.item;
    const { receiverName, receiverPhone, city, district, town, additionalInformation } = shippingAddress;

    useImperativeHandle(ref, () => ({
        show: (item) => item && setState({ ...state, item, open: true })
    }));

    const labelMap = {
        inProgress: 'Đang xử lý',
        sent: 'Đã gửi',
        received: 'Đã nhận',
        cancelled: 'Đã huỷ',
    };

    const userInfo = [
        { label: "Tên người dùng", children: username, span: 24 },
        { label: "Email", children: email, span: 12 },
        { label: "SĐT", children: phoneNumber, span: 12 },
        { label: "Phương thức thanh toán", children: paymentMethod, span: 12 },
        { label: "Trạng thái thanh toán", children: paymentStatus ? "Đã thanh toán" : "Chưa thanh toán", span: 12 },
        { label: "Ngày tạo đơn", children: createdAt && T.dateToText(new Date(parseInt(createdAt))), span: 12 },
        { label: "Trạng thái đơn hàng", children: labelMap[status], span: 12 },
    ];

    const shippingInfo = [
        { label: "Người nhận", children: receiverName, span: 24 },
        { label: "SĐT người nhận", children: receiverPhone, span: 24 },
        { label: "Thành phố", children: city, span: 8 },
        { label: "Quận", children: district, span: 8 },
        { label: "Phường", children: town, span: 8 },
        { label: "Thông tin thêm", children: additionalInformation, span: 24 },
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

    let totalCost = 0;
    if (products) totalCost = T.lodash.sum(products.map(item => item.price * item.quantity));

    return (
        <Modal
            title={`Chi tiết đơn hàng #${orderId}`}
            open={state.open}
            onCancel={() => setState({ ...state, item: {}, open: false })}
            footer={null}
            width={800}
        >
            <Table
                columns={productColumns}
                dataSource={products}
                rowKey="productId"
                pagination={false}
                style={{ marginTop: 20 }}
            />
            <Flex justify='flex-end'>
                <Typography.Title level={5}>TỔNG TIỀN: {totalCost.toLocaleString()}đ</Typography.Title>
            </Flex>
            <Descriptions column={24} title="Thông tin người dùng" bordered items={userInfo} />
            <Descriptions column={24} title="Địa chỉ giao hàng" bordered items={shippingInfo} style={{ marginTop: 20 }} />
        </Modal>
    );
});

export default OrderModal;