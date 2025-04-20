'use client';

import React from 'react';
import { Table, Collapse } from 'antd';

const { Panel } = Collapse;

const OrderTable = () => {
    const [orders, setOrders] = React.useState([
        {
            key: '1',
            orderId: 'ORD123456',
            buyer: {
                name: 'John Doe',
                email: 'john@example.com',
            },
            payment: {
                status: 'Paid',
                method: 'Credit Card',
            },
            products: [
                { name: 'T-shirt', quantity: 2 },
                { name: 'Sneakers', quantity: 1 },
            ],
            total: 89.99,
        },
        {
            key: '2',
            orderId: 'ORD654321',
            buyer: {
                name: 'Jane Smith',
                email: 'jane@example.com',
            },
            payment: {
                status: 'Pending',
                method: 'PayPal',
            },
            products: [
                { name: 'Hat', quantity: 1 },
                { name: 'Sunglasses', quantity: 1 },
                { name: 'Watch', quantity: 1 },
            ],
            total: 120.5,
        },
    ]);
    const columns = [
        {
        title: 'Order ID',
        dataIndex: 'orderId',
        key: 'orderId',
        render: (text) => <span className="font-medium">{text}</span>,
        },
        {
        title: 'Buyer Info',
        dataIndex: 'buyer',
        key: 'buyer',
        render: (buyer) => (
            <div>
            <p className="font-semibold">{buyer.name}</p>
            <p className="text-gray-500 text-sm">{buyer.email}</p>
            </div>
        ),
        },
        {
        title: 'Payment Info',
        dataIndex: 'payment',
        key: 'payment',
        render: (payment) => (
            <div>
            <p className="text-green-600 font-medium">{payment.status}</p>
            <p className="text-sm text-gray-500">{payment.method}</p>
            </div>
        ),
        },
        {
        title: 'Products',
        dataIndex: 'products',
        key: 'products',
        render: (products) => (
            <Collapse ghost>
            <Panel header={`${products.length} item(s)`} key="1">
                <ul className="list-disc ml-5">
                {products.map((product, idx) => (
                    <li key={idx}>
                    {product.name} × {product.quantity}
                    </li>
                ))}
                </ul>
            </Panel>
            </Collapse>
        ),
        },
        {
        title: 'Total Price',
        dataIndex: 'total',
        key: 'total',
        render: (price) => <span className="font-semibold">{price.toFixed(2)} VND</span>,
        },
    ];

    // React.useEffect(() => {
    //     async function fetchData() {
    //         await getOrdersInfo().then(

    //         ).catch(
    //             e => console.log(e)
    //         )
    //     }
    //     fetchData();
    // }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Order Information</h2>
        <Table
            columns={columns}
            dataSource={orders}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 'max-content' }}
        />
        </div>
    );
};

export default OrderTable;