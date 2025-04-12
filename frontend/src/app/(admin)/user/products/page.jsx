'use client';
import { useState, useEffect } from 'react';
import { Card, Button, notification, Modal, Input, Form, Select, Space } from 'antd';
import { Layout, Pagination, Row } from "antd";
import Product_Card_Admin from "@/components/product_card_admin";
import { v4 as uuidv4 } from 'uuid';
import AdminPage from "@/app/(admin)/components/admin_page";

import { tokenCustomer } from "@/context/config_provider";
const { Content } = Layout;

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(1);
    const [productValues, setProductValues] = useState([]);

    useEffect(() => {
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

      fetchBrands();
      fetchCategories();
      fetchProducts();
    }, []);

    const refreshProducts = async () => {
      const res = await fetch("http://localhost:3000/products?page=0&size=100");
      const jsonData = await res.json();
      setProducts(jsonData["items"]);
    };

    const getBrandNameById = (brandId) => {
      const brand = brands.find((b) => b.id === brandId);
      return brand ? brand.name : "";
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleProducts = products.slice(startIndex, endIndex);

    const handleAddProduct = async (values) => {
      try {
        const res = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: uuidv4(),
            name: productValues.name,
            description: productValues.description,
            status: true,
            categoryId: productValues.category_id,
            brandId: productValues.brand_id,
            created_at: new Date(),
            updated_at: new Date(),
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
              id: uuidv4(),
              name: `Phiên bản ${new Date().getFullYear()}`,
              price: values.price,
              quantity: values.quantity,
              productId: newProduct.id,
              status: true,
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: null,
            }),
          });
    
          if (instanceRes.ok) {
            const newInstance = await instanceRes.json();
            setProducts([...products, newProduct]);
            notification.success({ message: "Thêm sản phẩm thành công!" });
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
      

    return (
    <AdminPage
      title="Quản lý sản phẩm"
      breadcrumbItems={[
        { title: 'Trang chủ', href: '/' },
        { title: 'Quản lý sản phẩm' }
      ]}
    >
      
        <Content>
          <div style={{ minHeight: 280, padding: 24 }}>
            <Button
              type="primary"
              onClick={() => setShowModal(true)}
              style={{ marginBottom: 20, backgroundColor: tokenCustomer.colorPrimary, paddingTop: 20, paddingBottom: 20, paddingRight: 16, paddingLeft: 16 }}
              className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
            >
              Thêm sản phẩm
            </Button>
            <Row gutter={16}>
              {visibleProducts.length > 0 ? (
                visibleProducts.map((product) => (
                  <Product_Card_Admin
                    key={product.id}
                    id={product.id}
                    img={"/productImage.png"}
                    name={product.name}
                    brand_name={getBrandNameById(product.brandId)}
                    price={1}
                    description={product.description}
                    refreshProducts={refreshProducts}
                  />
                ))
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>
                  Không có sản phẩm nào.
                </p>
              )}
            </Row>
          </div>
        </Content>
        <Pagination
          current={currentPage}
          total={products.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />

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
                      } catch (err) {
                      }
                    }}
                    style={{ padding: '10px 20px', backgroundColor: tokenCustomer.colorPrimary }}
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
                      style={{
                        backgroundColor: tokenCustomer.colorPrimary,
                        padding: '10px 20px',
                      }}
                      className="hover:brightness-110 text-white rounded-lg shadow-md transition duration-200"
                    >
                      Thêm
                    </Button>
                  </Space>
                </Form.Item>
              </>
            )}
          </Form>
        </Modal>
    </AdminPage>
    );
}
