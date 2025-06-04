'use client';
import { tokenCustomer } from '@/context/config_provider';
import { Button, Col, Image, InputNumber, Row, Space, Table } from 'antd';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartTable({ data = [], onQuantityChange = () => {} }) {
  const renderProduct = (item) => (
    <Row gutter={16} align="middle">
      <Col xs={12} sm={10} md={6} lg={3} xl={3}>
        <Image src={item.image} alt={item.productName} />
      </Col>
      <Col xs={12} sm={14} md={25} lg={21} xl={21}>
        <div style={{ fontWeight: 'bold' }}>
          <Link
            href={`/product/detail?id=${item.productId}`}
            style={{ color: tokenCustomer.colorLinkActive }}
          >
            {item.productName}
          </Link>
        </div>
        <div>
          {item.description}, {item.name}
        </div>
      </Col>
    </Row>
  );

  const renderPrice = (item) => (
    <Row align="middle">
      <Col>
        <div style={{ fontWeight: 'bold' }}>
          {item.price.toLocaleString()} đ
        </div>
        <div style={{ textDecoration: 'line-through' }}>
          {item.initialPrice.toLocaleString()} đ
        </div>
      </Col>
    </Row>
  );

  const renderQuantity = (item) => (
    <InputNumber
      min={1}
      max={10}
      value={item.quantity}
      onChange={(value) => onQuantityChange(item.key, value)}
      style={{ width: '60px' }}
    />
  );

  const renderTotalPrice = (item) => (
    <div style={{ fontWeight: 'bold' }}>
      {(item.price * (item.quantity || 1)).toLocaleString()} đ
    </div>
  );

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (_, item) => renderProduct(item),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      width: '18%',
      render: (_, item) => renderPrice(item),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '18%',
      render: (_, item) => renderQuantity(item),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '18%',
      render: (_, item) => renderTotalPrice(item),
    },
  ];

  const subtotal = data.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const router = useRouter();
  const handleProceedToPayment = () => {
    var discount = 0;
    var total = subtotal;
    const checkoutData = { subtotal, discount, total, data };
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    router.push('/cart/payment');
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ fontSize: '18px' }}>
        Giỏ hàng (<span style={{ color: 'grey' }}>{data.length} sản phẩm</span>)
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
        components={{
          header: {
            cell: (props) => (
              <th style={{ fontWeight: 'normal' }}>{props.children}</th>
            ),
          },
        }}
        footer={() => (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'right',
                gap: '10px',
              }}
            >
              <div>
                Tạm tính:{' '}
                <span
                  style={{
                    color: tokenCustomer.colorLinkActive,
                    fontWeight: 'bold',
                  }}
                >
                  {subtotal.toLocaleString()} đ
                </span>
              </div>
              <div style={{ color: 'grey' }}>(Đã bao gồm VAT)</div>
              <Button
                style={{ backgroundColor: tokenCustomer.colorLinkActive }}
                type="primary"
                onClick={handleProceedToPayment}
              >
                Tiến hành đặt hàng
              </Button>
            </div>
          </div>
        )}
      />
    </Space>
  );
}
