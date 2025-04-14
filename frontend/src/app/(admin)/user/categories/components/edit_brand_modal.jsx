'use client';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Form, Input } from 'antd';

const BrandModal = forwardRef(({ onSubmit }, ref) => {
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
            title="Thêm Brand"
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="name"
                    label="Tên Brand"
                    rules={[{ required: true, message: 'Vui lòng nhập tên brand' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default BrandModal;
