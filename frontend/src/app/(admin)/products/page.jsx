'use client';
import { useState, useEffect } from 'react';
import { Card, Button, notification, Modal, Input, Form, Select } from 'antd';
import { Layout, Pagination, Row } from "antd";
import Product_Card_Admin from "@/components/product_card_admin";
import { v4 as uuidv4 } from 'uuid';
const { Content } = Layout;

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const pageSize = 8;

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await fetch("http://localhost:3000/products?page=0&size=100");
          const jsonData = await res.json();
          setProducts(jsonData["items"]);
        } catch (error) {
          console.error("Error fetching products", error);
        }
      };

      const fetchCategories = async () => {
        try {
          const res = await fetch("http://localhost:3000/categories?page=0&size=100");
          const data = await res.json();
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories", error);
        }
      };

      const fetchBrands = async () => {
        try {
          const res = await fetch("http://localhost:3000/brands?page=0&size=100");
          const data = await res.json();
          setBrands(data["items"]);
        } catch (error) {
          console.error("Error fetching brands", error);
        }
      };

      fetchProducts();
      fetchCategories();
      fetchBrands();
    }, []);

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
              name: values.name,
              description: values.description,
              status: 't',
              category_id: values.category_id,
              brand_id: values.brand_id,
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
                price: 50000,
                quantity: 30,
                product_id: newProduct.id,
                status: 't',
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null,
              }),
            });
      
            if (instanceRes.ok) {
              const newInstance = await instanceRes.json();
              setProducts([...products, newProduct]);
              notification.success({ message: "Product and product instance added successfully!" });
              setShowModal(false);
              form.resetFields();
            } else {
              notification.error({ message: "Error adding product instance." });
            }
          } else {
            notification.error({ message: "Error adding product." });
          }
        } catch (error) {
          console.error("Error adding product", error);
          notification.error({ message: "Error adding product." });
        }
      };
      

    return (
      <Layout style={{ backgroundColor: "white", padding: "20px" }}>
        <Content>
          <div style={{ minHeight: 280, padding: 24 }}>
            <Button
              type="primary"
              onClick={() => setShowModal(true)}
              style={{ marginBottom: 20 }}
            >
              Add New Product
            </Button>
            <Row gutter={16}>
              {visibleProducts.length > 0 ? (
                visibleProducts.map((product) => (
                  <Product_Card_Admin
                    key={product.id}
                    id={product.id}
                    img={"/productImage.png"}
                    name={product.name}
                    brand_name={product.brandId}
                    price={product.price}
                  />
                ))
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>
                  No products available.
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
          title="Add New Product"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAddProduct}>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true, message: 'Please input the product name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input the product description!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category_id"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select placeholder="Select a category">
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand_id"
              rules={[{ required: true, message: 'Please select a brand!' }]}
            >
              <Select placeholder="Select a brand">
                {brands.map((brand) => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    );
}
