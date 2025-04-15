'use client';
import { useState, useEffect } from 'react';
import { Card, Button, notification, Modal, Input, Form, Select, Space, Table, Popconfirm, Upload } from 'antd';
import { Layout, Pagination, Row } from "antd";
import Product_Card_Admin from "@/components/product_card_admin";
import AdminPage from "@/app/(admin)/components/admin_page";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
} from '@ant-design/icons';

const { Content } = Layout;

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [productValues, setProductValues] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products?page=0&size=100");
    const jsonData = await res.json();
    setProducts(jsonData["items"]);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories?page=0&size=100");
    const data = await res.json();
    setCategories(data);
  };

  const fetchBrands = async () => {
    const res = await fetch("http://localhost:3000/brands?page=0&size=100");
    const data = await res.json();
    setBrands(data["items"]);
  };

  useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = async (values) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productValues.name,
          description: productValues.description,
          status: true,
          categoryId: productValues.category_id,
          brandId: productValues.brand_id
        }),
      });

      const newProduct = await res.json();

      if (res.ok) {
        const instanceRes = await fetch("http://localhost:3000/product-instances", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `Phiên bản ${new Date().getFullYear()}`,
            price: values.price,
            quantity: values.quantity,
            productId: newProduct.id,
            status: true
          }),
        });

        if (instanceRes.ok) {
          notification.success({ message: "Thêm sản phẩm thành công!" });
          fetchProducts();
          setShowModal(false);
          form.resetFields();
        } else {
          notification.error({ message: "Thêm sản phẩm bị lỗi!" });
        }
      } else {
        notification.error({ message: "Thêm sản phẩm bị lỗi!" });
      }
    } catch (error) {
      console.error("Thêm sản phẩm bị lỗi!", error);
      notification.error({ message: "Thêm sản phẩm bị lỗi!" });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response1 = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response1.ok) {
          notification.success({ message: "Xóa sản phẩm thành công!" });
          fetchProducts();
      } else {
        notification.error({ message: "Xóa sản phẩm không thành công!" });
      }
    } catch (error) {
      notification.error({ message: "Xóa sản phẩm không thành công!" });
    }
  };

  const handleEdit = async (id, name, description) => {
    const temp = await fetch(`http://localhost:3000/product-instances?product-id=${id}`);
    const editing = await temp.json();
    editForm.setFieldsValue({
      name: name,
      description: description,
      price: editing[0]['price'],
      quantity: editing[0]['quantity'],
      id: id,
      instance_id: editing[0]['id']
    });
    setShowEditModal(true);
  };
  
  const [showEditModal, setShowEditModal] = useState(false);
  const handleUpdateProduct = async (values) => {
    setShowEditModal(false);
    try {
      const res = await fetch(`http://localhost:3000/products/${values.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description
        }),
      });

      const res1 = await fetch(`http://localhost:3000/product-instances/${values.instance_id}`, {
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
        fetchProducts();
      } else {
        notification.error({ message: "Cập nhật sản phẩm không thành công!" });
      }
    } catch (error) {
      notification.error({ message: "Cập nhật sản phẩm không thành công!" });
    }
  };

  const productColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record.id, record.name, record.description)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xoá sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Huỷ"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AdminPage
      title="Quản lý sản phẩm"
      icon={<BookOutlined />}
      breadcrumbItems={[{ title: 'Sản phẩm' }]}
    >

      <Content>
        <div style={{ minHeight: 280, padding: 24 }}>
          <Button
            type="primary"
            onClick={() => setShowModal(true)}
            icon={<PlusOutlined />}
            // style={{ marginBottom: 20, backgroundColor: tokenCustomer.colorPrimary, paddingTop: 20, paddingBottom: 20, paddingRight: 16, paddingLeft: 16 }}
            style = {{ marginBottom: 16 }}
            className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
          >
            Thêm sản phẩm
          </Button>
          <Table dataSource={products} columns={productColumns} rowKey="id" />
        </div>
      </Content>

      <Modal
        title="Thêm sản phẩm"
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
          setProductValues([]);
          setCurrentStep(1);
        }}
        footer={null}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <Form.Item
              label="Ảnh sản phẩm"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
              >
                <div>
                  <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                </div>
              </Upload>
            </Form.Item>
          </div>

          <div style={{ flex: 2 }}>
            <Form
              form={form}
              onFinish={handleAddProduct}
              style={{ marginTop: 20 }}
            >
              {currentStep === 1 && (
                <>
                  <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập tên sản phẩm!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item
                    label="Danh mục"
                    name="category_id"
                    rules={[{ required: true, message: 'Hãy chọn danh mục!' }]}
                  >
                    <Select placeholder="Chọn danh mục">
                      {categories.map((category) => (
                        <Select.Option key={category.id} value={category.id}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Nhãn hàng"
                    name="brand_id"
                    rules={[{ required: true, message: 'Hãy chọn nhãn hàng!' }]}
                  >
                    <Select placeholder="Chọn nhãn hàng">
                      {brands.map((brand) => (
                        <Select.Option key={brand.id} value={brand.id}>
                          {brand.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={async () => {
                        try {
                          await form.validateFields(['name', 'description', 'category_id', 'brand_id']);
                          setProductValues(form.getFieldsValue());
                          setCurrentStep(2);
                        } catch (err) {}
                      }}
                      className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
                    >
                      Tiếp tục
                    </Button>
                  </Form.Item>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Hãy nhập giá!' }]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button
                        onClick={() => setCurrentStep(1)}
                        style={{ padding: '10px 20px' }}
                        className="hover:brightness-110 rounded-lg shadow-md transition duration-200"
                      >
                        Quay lại
                      </Button>

                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ padding: '10px 20px' }}
                        className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
                      >
                        Thêm
                      </Button>
                    </Space>
                  </Form.Item>
                </>
              )}
            </Form>
          </div>
        </div>
      </Modal>


      <Modal
        title="Chỉnh sửa sản phẩm"
        open={showEditModal}
        onCancel={() => {
          setShowEditModal(false);
          form.resetFields();
        }}
        footer={null}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <img
              src="/productImage.png"
              alt="Product"
              style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
            />
          </div>

          <div style={{ flex: 2 }}>
            <Form
              form={editForm}
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

              <Form.Item name="id" hidden>
                <Input />
              </Form.Item>

              <Form.Item name="instance_id" hidden>
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    padding: "10px 20px",
                  }}
                  className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>

    </AdminPage>
  );
}
