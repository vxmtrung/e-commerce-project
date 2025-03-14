'use client';
import { useEffect, useState } from 'react';
import {
    Table, Select, Button, Form, Modal, Input
} from 'antd';
import client from '@/core/fetch/fetch_api.jsx';

export default function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await client['get']('/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    };

    const updateOrderStatus = async (id, status) => {
    try {
        await client['put'](`/orders/${id}/status`, { status });
        fetchOrders();
    } catch (error) {
        console.error('Error updating order status:', error);
    }
    };

    const deleteOrder = async (id) => {
        try {
            await client['delete'](`/orders/${id}`);
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const createOrder = async (values) => {
        try {
            await client['post']('/orders', values);
            setIsModalVisible(false);
            fetchOrders();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Shipping Address', dataIndex: 'shipping_address', key: 'shipping_address' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
            <Select defaultValue={text} onChange={(value) => updateOrderStatus(record.id, value)}>
                {Object.values(OrderStatus).map((status) => (
                    <Select.Option key={status} value={status}>{status}</Select.Option>
                ))}
            </Select>
        ),
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Button type="danger" onClick={() => deleteOrder(record.id)}>Delete</Button>
        ),
    },
    ];

    return (
        <div>
            <h1>Manage Orders</h1>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>Create Order</Button>
            <Table dataSource={orders} columns={columns} loading={loading} rowKey="id" />
            
            <Modal
                title="Create Order"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
            >
            <Form form={form} onFinish={createOrder} layout="vertical">
                <Form.Item name="shipping_address" label="Shipping Address" rules={[{ required: true, message: 'Please enter the shipping address' }]}> 
                <Input />
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true }]}> 
                <Select>
                    {
                        orders.map((order, index) => (
                            <Select.Option key={index} value={order.status}>{order.status}</Select.Option>
                        ))
                    }
                </Select>
                </Form.Item>
            </Form>
            </Modal>
        </div>
    );
};