'use client';

import CartTable from '../../components/cart_table';
import CartInfo from '../../components/cart_info';
import { Space } from 'antd';
import React, { useState, useEffect } from 'react';

const initialCartData = [
  {
    key: '1',
    productName: 'Klairs 1',
    brand: 'Klairs',
    initialPrice: 100000,
    price: 50000,
    description: 'Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml',
    image: 'https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg',
    quantity: 1,
  },
  {
    key: '2',
    productName: 'Klairs 2',
    brand: 'Klairs',
    initialPrice: 100000,
    price: 50000,
    description: 'Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml',
    image: 'https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg',
    quantity: 1,
  },
  {
    key: '3',
    productName: 'Klairs 3',
    brand: 'Klairs',
    initialPrice: 100000,
    price: 50000,
    description: 'Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml',
    image: 'https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg',
    quantity: 1,
  },
  {
    key: '3',
    productName: 'Klairs 3',
    brand: 'Klairs',
    initialPrice: 100000,
    price: 50000,
    description: 'Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml',
    image: 'https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg',
    quantity: 1,
  },
  {
    key: '4',
    productName: 'Klairs 4',
    brand: 'Klairs',
    initialPrice: 100000,
    price: 50000,
    description: 'Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml',
    image: 'https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg',
    quantity: 1,
  },
  {
    key: '5',
    productName: 'Klairs 5',
    brand: 'Klairs',
    initialPrice: 100000,
    price: 50000,
    description: 'Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml',
    image: 'https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg',
    quantity: 1,
  },
  {
    key: '6',
    productName: 'Klairs 6',
    brand: 'Klairs',
    initialPrice: 100000,
    price: 50000,
    description: 'Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml',
    image: 'https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg',
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartData);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal - discount);
  }, [cartItems, discount]);

  const handleQuantityChange = (key, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.key === key ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <Space direction="horizontal" size="large" style={{ width: '100%', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <CartTable data={cartItems} onQuantityChange={handleQuantityChange} />
      </div>
      <CartInfo subtotal={subtotal} discount={discount} total={total} data={cartItems}/>
    </Space>
  );
}