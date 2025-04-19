'use client';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Form, Input } from 'antd';

const CategoryModal = forwardRef(({ onSubmit }, ref) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (item) => {
      if (item) {
        setIsEdit(true);
        form.setFieldsValue({ ...item });
      } else {
        setIsEdit(false);
        form.resetFields();
      }
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  const handleOk = () => form.submit();
  const handleCancel = () => setOpen(false);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title={isEdit ? 'Cập nhật Category' : 'Thêm Category'}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="category"
          label="Loại"
          rules={[{ required: true, message: 'Vui lòng nhập mã loại' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên hiển thị"
          rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="id" hidden>
                    <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default CategoryModal;
