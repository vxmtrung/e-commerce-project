// "use client";
// import React from "react";
// import { useEffect, useState } from "react";
// import { Layout, Pagination, Row, theme } from "antd";
// import Product_Card from "@/components/product_card";
// const { Content } = Layout;

// const Page = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("http://localhost:3000/products");
//       const jsonData = await res.json();
//       setData(jsonData);
//     };

//     fetchData();
//   });
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   if (!data) return <div>Loading...</div>;

//   return (
//     <Layout style={{ backgroundColor: "white" }}>
//       <Content
//         style={{
//           padding: "0 48px",
//         }}
//       >
//         <div
//           style={{
//             minHeight: 280,
//             padding: 24,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Row gutter={16}>
//             {data.map((element) => (
//               <Product_Card
//                 id={element.id}
//                 img={"/productImage.png"}
//                 name={element.name}
//                 brand_name={element.brandId}
//                 price={element.name}
//               />
//             ))}
//           </Row>
//         </div>
//       </Content>
//       <Pagination defaultCurrent={1} total={20} pageSize={3} />;
//     </Layout>
//   );
// };
// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import { Layout, Pagination, Row } from "antd";
import Product_Card from "@/components/product_card";

const { Content } = Layout;

const Page = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleProducts = data.slice(startIndex, endIndex);

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
        total={data.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </Layout>
  );
};

export default Page;
