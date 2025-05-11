'use client';

import CartTable from '../../components/cart_table';
import CartInfo from '../../components/cart_info';
import { Space } from 'antd';
import React, { useState, useEffect } from 'react';

const initialCartData = [
  {
    key: '1',
    productName: 'Mascara BROWIT 5.5g',
    brand: 'BROWIT',
    initialPrice: 100000,
    price: 97000,
    description: 'Chuốt mi dạng đầu lược Browit My Everyday Mascara 5.5g',
    image: 'https://product.hstatic.net/200000697677/product/294356b6f1774c6e91c0be9d912d5bd6_03f234452e7c47b7b50af4b60e8a801f.jpeg',
    quantity: 1,
  },
  {
    key: '2',
    productName: 'Son kem lì 3CE Velvet Lip Tint 4g',
    brand: '3CE',
    initialPrice: 100000,
    price: 279000,
    description: 'Son Kem Lì 3CE Velvet Lip Tint 4g Hàn Quốc, chất son cực kì mướt, không gây lộ vân môi.',
    image: 'https://image.hsv-tech.io/1987x0/bbx/products/b06abb3b-79ed-4484-897a-e55b4394a48c.webp',
    quantity: 1,
  },
  {
    key: '3',
    productName: 'Cushion APERIRE SPF50+ 13g',
    brand: 'APERIRE',
    initialPrice: 100000,
    price: 319000,
    description: 'Phấn Nước Aperire Day Dream Cover Cushion SPF50+ PA++++ Chống Nắng Che Phủ Cao 13g.',
    image: 'https://product.hstatic.net/200000150709/product/1_4a8259e1f7644d92953f597477eac9c4.png',
    quantity: 1,
  }
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