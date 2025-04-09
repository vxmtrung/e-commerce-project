"use client";
import React, { useEffect, useState } from "react";
import { Layout, Pagination, Row } from "antd";
import Product_Card from "@/components/product_card";
import client from "@/core/fetch/fetch_api.jsx";

const { Content } = Layout;

const Page = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const data = await client["get"]("/products?page=0&size=0");
  //       setProducts(data.items);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/products?page=0&size=10"
        );
        const jsonData = await res.json();
        setProducts(jsonData["items"]);
      } catch (error) {
        console.error("error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleProducts = products.slice(startIndex, endIndex);
  console.log(products);

  return (
    <Layout style={{ backgroundColor: "white", padding: "20px" }}>
      <Content>
        <div style={{ minHeight: 280, padding: 24 }}>
          <Row gutter={16}>
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <Product_Card
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
    </Layout>
  );
};

export default Page;