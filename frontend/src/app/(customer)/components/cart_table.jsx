'use client';
import { tokenCustomer } from '@/context/config_provider';
import { Button, Col, Image, InputNumber, Row, Space, Table } from 'antd';
import React from 'react';

const columns = [
  {
    title: 'Sản phẩm',
    dataIndex: 'productName',
    key: 'productName',
  },
  { title: 'Giá tiền', dataIndex: 'price', key: 'price', width: '18%' },
  { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', width: '18%' },
  {
    title: 'Thành tiền',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    width: '18%',
  },
];

const data = [
  {
    key: '1',
    productName: (
      <Row gutter={16} align="middle">
        <Col xs={12} sm={10} md={6} lg={3} xl={3}>
          <Image
            src="https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg"
            alt="product"
          ></Image>
        </Col>
        <Col xs={12} sm={14} md={25} lg={21} xl={21}>
          <div style={{ fontWeight: 'bold' }}>Klairs</div>
          <div>Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml</div>
        </Col>
      </Row>
    ),
    price: (
      <Row align="middle">
        <Col>
          <div style={{ fontWeight: 'bold' }}>258.000 đ</div>
          <div style={{ textDecoration: 'line-through' }}>475.000 đ</div>
        </Col>
      </Row>
    ),
    quantity: (
      <InputNumber
        min={1}
        max={10}
        defaultValue={1}
        style={{ width: '60px' }}
      />
    ),

    totalPrice: <div style={{ fontWeight: 'bold' }}>258.000 đ</div>,
  },
  {
    key: '2',
    productName: (
      <Row gutter={16} align="middle">
        <Col xs={12} sm={10} md={6} lg={3} xl={3}>
          <Image
            src="https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg"
            alt="product"
          ></Image>
        </Col>
        <Col xs={12} sm={14} md={25} lg={21} xl={21}>
          <div style={{ fontWeight: 'bold' }}>Klairs</div>
          <div>Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml</div>
        </Col>
      </Row>
    ),
    price: (
      <Row align="middle">
        <Col>
          <div style={{ fontWeight: 'bold' }}>258.000 đ</div>
          <div style={{ textDecoration: 'line-through' }}>475.000 đ</div>
        </Col>
      </Row>
    ),
    quantity: (
      <InputNumber
        min={1}
        max={10}
        defaultValue={1}
        style={{ width: '60px' }}
      />
    ),

    totalPrice: <div style={{ fontWeight: 'bold' }}>258.000 đ</div>,
  },
  {
    key: '3',
    productName: (
      <Row gutter={16} align="middle">
        <Col xs={12} sm={10} md={6} lg={3} xl={3}>
          <Image
            src="https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg"
            alt="product"
          ></Image>
        </Col>
        <Col xs={12} sm={14} md={25} lg={21} xl={21}>
          <div style={{ fontWeight: 'bold' }}>Klairs</div>
          <div>Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml</div>
        </Col>
      </Row>
    ),
    price: (
      <Row align="middle">
        <Col>
          <div style={{ fontWeight: 'bold' }}>258.000 đ</div>
          <div style={{ textDecoration: 'line-through' }}>475.000 đ</div>
        </Col>
      </Row>
    ),
    quantity: (
      <InputNumber
        min={1}
        max={10}
        defaultValue={1}
        style={{ width: '60px' }}
      />
    ),

    totalPrice: <div style={{ fontWeight: 'bold' }}>258.000 đ</div>,
  },
  {
    key: '4',
    productName: (
      <Row gutter={16} align="middle">
        <Col xs={12} sm={10} md={6} lg={3} xl={3}>
          <Image
            src="https://cdn.cosmetics.vn/cham-soc-da/biotherm-aquasource-concentrate-glow-291x291.jpg"
            alt="product"
          ></Image>
        </Col>
        <Col xs={12} sm={14} md={25} lg={21} xl={21}>
          <div style={{ fontWeight: 'bold' }}>Klairs</div>
          <div>Serum Klairs Vitamin C Cho Da Nhạy Cảm 35ml</div>
        </Col>
      </Row>
    ),
    price: (
      <Row align="middle">
        <Col>
          <div style={{ fontWeight: 'bold' }}>258.000 đ</div>
          <div style={{ textDecoration: 'line-through' }}>475.000 đ</div>
        </Col>
      </Row>
    ),
    quantity: (
      <InputNumber
        min={1}
        max={10}
        defaultValue={1}
        style={{ width: '60px' }}
      />
    ),

    totalPrice: <div style={{ fontWeight: 'bold' }}>258.000 đ</div>,
  },
];

export default function CartTable() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ fontSize: '18px' }}>
        Giỏ hàng( <span style={{ color: 'grey' }}>4 sản phẩm</span>)
      </div>
      <Table
        columns={columns}
        dataSource={data}
        components={{
          header: {
            cell: (props) => (
              <th style={{ fontWeight: 'normal' }}>{props.children}</th>
            ),
          },
          footer: {},
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
                    color: tokenCustomer.colorTextBase,
                    fontWeight: 'bold',
                  }}
                >
                  1.032.000 đ
                </span>
              </div>
              <div style={{ color: 'grey' }}>(Đã bao gồm VAT)</div>
              <Button type="primary">Tiến hành đặt hàng</Button>
            </div>
          </div>
        )}
      />
    </Space>
  );
}
