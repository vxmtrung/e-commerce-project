'use client';
import { tokenCustomer } from '@/context/config_provider';
import { Menu, InputNumber, Button } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { key: 'vaseline', label: 'Vaseline', path: '/category/vaseline' },
  { key: 'lip-ice', label: 'LipIce', path: '/category/lip-ice' },
  { key: 'silky-girl', label: 'SilkyGirl', path: '/category/silky-girl' },
  { key: 'nivea', label: 'Nivea', path: '/category/nivea' },
  { key: 'cocoon', label: 'Cocoon', path: '/category/cocoon' },
  { key: 'bare-soul', label: 'BareSoul', path: '/category/bare-soul' },
];

export default function CategorySidebar() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const handleApplyPriceFilter = () => {
    // to be implemented
  };

  return (
    <div>
      <h3 style={{ padding: '16px 24px', margin: 0, fontWeight: 'bold', color: tokenCustomer.colorLinkActive }}>Category</h3>
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
              style={{
                color: 'black',
              }}
              onMouseEnter={(e) => (e.target.style.color = tokenCustomer.colorLinkHover)}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              {category.label}
            </a>
          ),
        }))}
      />
      <h3 style={{ padding: '16px 24px', marginTop: '8px', fontWeight: 'bold', color: tokenCustomer.colorLinkActive }}>Price range ($)</h3>
      <div style={{ padding: '16px 24px' }}>
        <div style={{ marginLeft: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <InputNumber
              style={{ width: '100px' }}
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Min"
            />
            <InputNumber
              style={{ width: '100px' }}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Max"
            />
          </div>
          <Button style={{ backgroundColor: tokenCustomer.colorLinkActive }} type="primary" onClick={handleApplyPriceFilter}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}