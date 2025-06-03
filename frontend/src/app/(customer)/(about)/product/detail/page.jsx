'use client';

import ProductCard from '@/app/(customer)/components/product_cart';
import ProductDetailMenu from '@/app/(customer)/components/product_detail_menu';
import ReviewSection from '@/app/(customer)/components/review_section';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DetailPage() {
  const id = useSearchParams().get('id');
  const name = useSearchParams().get('name');
  //   const brand = JSON.parse(localStorage.getItem(id)).brand || 'Idk Brand';
  const brand = JSON.parse(localStorage.getItem(id)).brand || 'idk';
  const img =
    JSON.parse(localStorage.getItem(id)).img ||
    'https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg';
  console.log(brand);
  console.log(img);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const [productDetail, setProductDetail] = useState([]);

  const fetchProductDetail = async () => {
    try {
      const productDetailResponse = await fetch(
        `http://localhost:3000/product-instances/${id}/detail`
      );
      const detail = await productDetailResponse.json();
      detail.productName = name;
      detail.brand = brand;
      detail.img = img;

      setProductDetail(detail);
      console.log(detail);

      //cần brand, lấy từ /products/search -> localstorage
      //cần img, lấy từ /product-imgs -> localstorage
      //cần mô tả, lấy từ /products/search or /product-instances/id/detail
    } catch (error) {
      console.error('Error fetching product detail:', error);
      setProductDetail([]);
    }
  };

  return (
    <Space direction="vertical">
      <ProductCard productDetail={productDetail} />
      <ProductDetailMenu productDetail={productDetail} />
      <ReviewSection />
    </Space>
  );
}
