import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, notification, Modal, Input, Form, Select, Space } from "antd";
import Link from "next/link";
import { tokenCustomer } from "@/context/config_provider";
const { confirm } = Modal;

const Product_Card_Admin = ({ id, img, name, brand_name, price, description, refreshProducts }) => {
  const [form] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchProductInstance = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product-instances?product-id=${id}`);
    const instanceData = await response.json();
    setEditing(instanceData);
  };

  useEffect(() => {
    fetchProductInstance();
  }, [id]);

  const showDeleteConfirm = () => {
    confirm({
      title: "Bạn có chắc muốn xóa sản phẩm này?",
      content: `${name} - ${brand_name}`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log("Hủy xóa");
      },
    });
  };

  const handleEdit = async () => {
    form.setFieldsValue({
      name,
      description,
      price: editing[0]['price'],
      quantity: editing[0]['quantity'],
    });
    setShowEditModal(true);
  };


  const handleUpdateProduct = async (values) => {
    setShowEditModal(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description
        }),
      });

      const res1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product-instances/${editing[0]['id']}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: values.price,
          quantity: values.quantity
        }),
      });

      if (res.ok && res1.ok) {
        notification.success({ message: "Cập nhật sản phẩm thành công!" });
        refreshProducts();
        fetchProductInstance();
      } else {
        notification.error({ message: "Cập nhật sản phẩm không thành công!" });
      }
    } catch (error) {
      notification.error({ message: "Cập nhật sản phẩm không thành công!" });
    }
  };

  const handleDelete = async () => {
    try {
      const response1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response1);

      if (response1.ok) {
        notification.success({ message: "Xóa sản phẩm thành công!" });
        refreshProducts();
        fetchProductInstance();
      } else {
        notification.error({ message: "Xóa sản phẩm không thành công!" });
      }
    } catch (error) {
      notification.error({ message: "Xóa sản phẩm không thành công!" });
    }
  };

  return (
    <>
      <Col
        xs={12}
        sm={8}
        md={6}
        lg={6}
        xl={6}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          variant="border"
          style={{
            backgroundColor: "#fff",
            borderColor: "#e8e8e8",
            marginBottom: "15px",
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Row
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img width={200} src={img} alt={name} />
            <div style={{ fontSize: "18px", fontWeight: "500", color: "black" }}>
              {name}
            </div>
            <div style={{ fontSize: "18px", fontWeight: "500", color: "black" }}>
              {brand_name}
            </div>
            <div style={{ marginTop: "10px" }}>
              <Button
                onClick={handleEdit}
                type="primary"
                style={{ marginRight: "10px", backgroundColor: "#fba0ad" }}
                className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
              >
                Chỉnh sửa
              </Button>
              <Button
                onClick={showDeleteConfirm}
                type="primary"
                style={{ backgroundColor: "#F52544" }}
                className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
              >
                Xóa
              </Button>
            </div>
          </Row>
        </Card>
      </Col>

      <Modal
        title="Chỉnh sửa sản phẩm"
        open={showEditModal}
        onCancel={() => {
          setShowEditModal(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdateProduct}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Hãy nhập mô tả!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Hãy nhập số lượng!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Hãy nhập giá!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: tokenCustomer?.colorPrimary || "#1677ff",
                padding: "10px 20px",
              }}
              className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Product_Card_Admin;
