'use client';

import ProductCard from '@/app/(customer)/components/product_cart';
import ProductDetailMenu from '@/app/(customer)/components/product_detail_menu';
import ReviewSection from '@/app/(customer)/components/review_section';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DetailPage() {
  const id = useSearchParams().get('id');
  const [product, setProduct] = useState({});
  const [productInstances, setProductInstances] = useState([]);
  const [brand, setBrand] = useState('');

  const [instance, setInstance] = useState(null);
  useEffect(() => {
    fetchProduct();
    fetchProductInstances();
  }, []);

  const fetchProduct = async () => {
    try {
      const productResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/detail`
      );
      const productJson = await productResponse.json();
      setProduct(productJson);
      console.log('product: ', productJson);

      fetchBrand(productJson.brandId);
    } catch (error) {
      console.error('Error fetching product: ', error);
      setProduct({});
    }
  };

  const fetchProductInstances = async () => {
    try {
      const productInstancesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-instances?product-id=${id}`
      );
      const productInstancesJson = await productInstancesResponse.json();
      setProductInstances(productInstancesJson);
      console.log('product instances: ', productInstancesJson);
    } catch (error) {
      console.error('Error fetching product instances: ', error);
      setProductInstances([]);
    }
  };

  const fetchBrand = async (brandId) => {
    try {
      const brandsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/brands`);
      const brandsJson = await brandsResponse.json();
      const brandName = brandsJson.find((item) => item.id == brandId)?.name;
      setBrand(brandName || '');
      console.log('brand: ', brandName);
    } catch (error) {
      console.error('Error fetching brand: ', error);
      setBrand('');
    }
  };

  const options = productInstances.map((item) => ({
    id: item.id,
    name: item.name.substring(10),
  }));
  console.log('options: ', options);

  return (
    <Space direction="vertical">
      <ProductCard
        options={options}
        product={product}
        productInstances={productInstances}
        brand={brand}
      />
      <ReviewSection />
    </Space>
  );
}
