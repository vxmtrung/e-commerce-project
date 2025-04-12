'use client';
import { useState } from 'react';

const SORT_OPTIONS = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Bán chạy', value: 'bestseller' },
  { label: 'Giá thấp đến cao', value: 'price-asc' },
  { label: 'Giá cao đến thấp', value: 'price-desc' }
];

export default function SortBar() {
  const [active, setActive] = useState('bestseller');

  const handleClick = (value) => {
    setActive(value);
    onSortChange?.(value);
  };

  return (
    <div className="bg-gray-100 p-3 flex items-center space-x-2">
      <span className="font-medium mr-2">Sắp xếp</span>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`px-4 py-1 border rounded ${
            active === option.value
              ? 'bg-[#ff1493] text-white'
              : 'bg-white text-black'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}