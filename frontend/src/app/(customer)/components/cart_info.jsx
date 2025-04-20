'use client';

import { tokenCustomer } from '@/context/config_provider';
import { Button, Card } from 'antd';
import React from 'react';

function CartInfo({ subtotal, discount, total, gift, giftNote }) {
  return (
    <Card
      title="Hóa đơn của bạn"
      style={{ width: 300 }}
      bodyStyle={{ padding: '20px' }}
    >
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Tạm tính:</span>
        <span style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('vi-VN').format(subtotal)} ₫</span>
      </div>
      <div style={{ marginBottom: '15px', borderTop: '1px solid #e8e8e8', paddingTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 'bold' }}>Tổng cộng:</span>
        <span style={{ fontWeight: 'bold', color: tokenCustomer.colorLinkActive, fontSize: '1.2em' }}>{new Intl.NumberFormat('vi-VN').format(total)} ₫</span>
      </div>
      <div style={{ marginBottom: '10px', color: 'grey', fontSize: '0.9em' }}>(Đã bao gồm VAT)</div>
      <Button type="primary" style={{ backgroundColor: tokenCustomer.colorLinkActive }} block size="large">
        Tiến hành đặt hàng
      </Button>
    </Card>
  );
}

export default CartInfo;