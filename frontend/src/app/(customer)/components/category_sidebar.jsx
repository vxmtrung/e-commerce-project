'use client';
import { tokenCustomer } from '@/context/config_provider';
import { Menu, InputNumber, Button } from 'antd';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

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

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const handleApplyPriceFilter = () => {
    // để xử lý
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
        items={categories.map((category) => ({
          key: category.key,
          label: (
            <a
              href={category.path}
              style={{ color: 'black' }}
              onMouseEnter={e => (e.target.style.color = tokenCustomer.colorLinkHover)}
              onMouseLeave={e => (e.target.style.color = 'black')}
            >
              {category.label}
            </a>
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
