'use client';
import React, { useRef, useState } from 'react';
import {
  Tabs,
  Table,
  Button,
  FloatButton,
  Space,
  Popconfirm,
  message,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
} from '@ant-design/icons';
import AdminPage from '../../components/admin_page';
import { T } from '@/app/common';
import CategoryModal from './components/edit_cate_modal';
import BrandModal from './components/edit_brand_modal';

const { TabPane } = Tabs;

const brands = [
  { id: 1, name: 'Klairs', numbersProduct: 12 },
  { id: 2, name: 'The Ordinary', numbersProduct: 12 },
  { id: 3, name: 'Innisfree', numbersProduct: 12 },
];

const categories = [
  { id: 1, category: 'Toner', name: 'Nước hoa hồng', numbersProduct: 12 },
  { id: 2, category: 'Serum', name: 'Tinh chất', numbersProduct: 8 },
  { id: 3, category: 'Moisturizer', name: 'Kem dưỡng', numbersProduct: 15 },
];

const ProductManagement = () => {
  const [brandData, setBrandData] = useState(brands);
  const [categoryData, setCategoryData] = useState(categories);
  const categoryRef = useRef();
  const brandRef = useRef();

  const handleActionCategory = async (values) => {
    //TODO
    categoryRef.current.close();
  };

  const handleActionBrand = async (values) => {
    //TODO
    brandRef.current.close();
  };

  const brandColumns = [
    {
      title: 'Tên Brand',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'numbersProduct',
      key: 'numbersProduct',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} type='primary' onClick={() => brandRef.current.open(record)} />
          <Popconfirm
            title="Bạn có chắc muốn xoá?"
          >
            <Button icon={<DeleteOutlined />} color='danger' variant='solid' />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const categoryColumns = [
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'numbersProduct',
      key: 'numbersProduct',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} type='primary' onClick={() => categoryRef.current.open(record)} />
          <Popconfirm
            title="Bạn có chắc muốn xoá?"
          >
            <Button icon={<DeleteOutlined />} color='danger' variant='solid' />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AdminPage
      title='Quản lý phân loại'
      icon={<BookOutlined />}
      breadcrumbItems={[
        {
          title: 'Phân loại'
        }
      ]}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Brand" key="1">
          <Table dataSource={brandData} columns={brandColumns} rowKey="id" />
          <BrandModal ref={brandRef} onSubmit={handleActionBrand} />
          <FloatButton icon={<PlusOutlined />} tooltip="Thêm brand" type='primary' onClick={() => brandRef.current.open()} />
        </TabPane>
        <TabPane tab="Category" key="2">
          <Table dataSource={categoryData} columns={categoryColumns} rowKey="id" />
          <CategoryModal ref={categoryRef} onSubmit={handleActionCategory} />
          <FloatButton icon={<PlusOutlined />} tooltip="Thêm category" type='primary' onClick={() => categoryRef.current.open()} />
        </TabPane>
      </Tabs>
    </AdminPage>
  );
};

export default ProductManagement;
