'use client';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const CategoryModal = forwardRef(({ onSubmit }, ref) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        open: (item) => {
            item ? form.setFieldsValue({ ...item }) : form.resetFields();
            setOpen(true);
        },
        close: () => setOpen(false),
    }));

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleFinish = (values) => {
        onSubmit(values);
        form.resetFields();
        setOpen(false);
    };

    return (
        <Modal
            title="Thêm Category"
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="category"
                    label="Loại"
                    rules={[{ required: true, message: 'Vui lòng nhập loại' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập tên category' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default CategoryModal;
