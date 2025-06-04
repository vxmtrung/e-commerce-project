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

    const fetch = async (id) => {
        try {
            const item = await T.client.get(`/orders/${id}`);
            setState({ ...state, item, open: true });
        } catch (error) {
            T.message.error(error);
        }
    };

    const { orderId, paymentMethod, paymentStatus, createdAt, status, shippingAddress, items, buyer = {} } = state.item;
    const { name, email, phoneNumber } = buyer;

    useImperativeHandle(ref, () => ({
        show: (item) => item && fetch(item.orderId)
    }));

    const labelMap = {
        'IN_PROGRESS': 'Đang xử lý',
        'SENT': 'Đã gửi',
        'RECEIVED': 'Đã nhận',
        'CANCELLED': 'Đã huỷ',
    };

    const userInfo = [
        { label: "Tên người dùng", children: name, span: 24 },
        { label: "Email", children: email, span: 12 },
        { label: "SĐT", children: phoneNumber, span: 12 },
        { label: "Phương thức thanh toán", children: paymentMethod == 'CREDIT_CARD' ? 'Online' : 'COD', span: 12 },
        { label: "Trạng thái thanh toán", children: paymentStatus == 'COMPLETED' ? "Đã thanh toán" : "Chưa thanh toán", span: 12 },
        { label: "Ngày tạo đơn", children: createdAt && T.dateToText(new Date(createdAt)), span: 12 },
        { label: "Trạng thái đơn hàng", children: labelMap[status], span: 12 },
    ];

    const shippingInfo = [
        { label: "Giao hàng tại", children: shippingAddress, span: 24 }
    ];

    const productColumns = [
        { title: "Tên sản phẩm", dataIndex: "productName", key: "productName" },
        { title: "Loại", dataIndex: "instanceName", key: "instanceName" },
        { title: "Đơn giá", dataIndex: "price", key: "price", render: (price, record) => `${(price * (1 - record.discountPercent / 100)).toLocaleString()} đ` },
        { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
        {
            title: "Tổng",
            key: "total",
            render: (_, record) => `${((record.price * (1 - record.discountPercent / 100)) * record.quantity).toLocaleString()} đ`,
        },
    ];

    let totalCost = 0;
    if (items) totalCost = T.lodash.sum(items.map(record => (record.price * (1 - record.discountPercent / 100)) * record.quantity));

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
                dataSource={items}
                rowKey="instanceId"
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