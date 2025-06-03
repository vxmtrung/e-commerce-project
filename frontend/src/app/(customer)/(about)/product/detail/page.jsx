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
  //   const brand = 'idk';
  //   const img =
  //     'https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg';
  //   console.log(brand);
  //   console.log(img);

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

      const parentProductResponse = await fetch(
        `http://localhost:3000/products/search?page=0&size=1&filter=name:eq:${name}`
      );
      const parentProduct = await parentProductResponse.json();

      detail.productName = name;
      detail.brand = parentProduct.items[0].brand.name || 'Unknown Brand';
      detail.img =
        parentProduct.items[0].productInstances.find((item) => item.id == id)
          .productImgs[0]?.link ||
        'https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-1.jpg';
      detail.shortDescription = parentProduct.items[0].description;
      detail.longDescription = detail.description || detail.shortDescription;

      setProductDetail(detail);
      console.log(detail);
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
