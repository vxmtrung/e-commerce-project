'use client';
import { tokenCustomer } from '@/context/config_provider';
import { Menu, InputNumber, Button } from 'antd';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

export default function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
        if (response.ok) {
          const categoriesData = await response.json();
          const transformed = categoriesData
            .filter(category => category.status)
            .map(category => ({
              key: category.id,
              label: category.name,
              path: `/category/${category.id}`
            }));
          setCategories(transformed);
        } else {
          setCategories([]);
        }
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Lấy categoryId từ query param nếu có
    const catId = searchParams.get('filter')?.split(':')[2] || null;
    setActiveCategory(catId);
  }, [searchParams]);

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const handleApplyPriceFilter = () => {
    // để xử lý
  };

  const handleCategoryClick = (categoryId) => {
    const filterParam = `filter=categoryId:eq:${categoryId}`;
    if (pathname.includes('/product')) {
      // Nếu đang ở trang products, chỉ update query param
      const url = `/product?page=0&size=10&${filterParam}`;
      router.push(url);
    } else {
      // Nếu không phải trang products, redirect sang trang products với filter
      router.push(`/product?page=0&size=10&${filterParam}`);
    }
  };

  return (
    <div>
      <h3 style={{ padding: '16px 24px', margin: 0, fontWeight: 'bold', color: tokenCustomer.colorLinkActive }}>Danh mục</h3>
      <Menu
        mode="inline"
        style={{
          height: '100%',
          borderRight: 0,
          maxHeight: 'calc(80vh - 300px)',
          overflowY: 'auto',
          padding: '0 16px',
        }}
        selectedKeys={activeCategory ? [activeCategory] : []}
        onClick={({ key }) => handleCategoryClick(key)}
        items={categories.map((category) => ({
          key: category.key,
          label: (
            <span
              style={{ color: 'black', cursor: 'pointer', width: '100%', display: 'inline-block' }}
              onMouseEnter={e => (e.target.style.color = tokenCustomer.colorLinkHover)}
              onMouseLeave={e => (e.target.style.color = 'black')}
            >
              {category.label}
            </span>
          ),
        }))}
      />
      <h3 style={{ padding: '16px 24px', marginTop: '8px', fontWeight: 'bold', color: tokenCustomer.colorLinkActive }}>Khoảng giá (VNĐ)</h3>
      <div style={{ padding: '16px 24px' }}>
        <div style={{ marginLeft: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <InputNumber
              style={{ width: '100px' }}
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Tối thiểu"
            />
            <InputNumber
              style={{ width: '100px' }}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Tối đa"
            />
          </div>
          <Button style={{ backgroundColor: tokenCustomer.colorLinkActive }} type="primary" onClick={handleApplyPriceFilter}>
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
}
