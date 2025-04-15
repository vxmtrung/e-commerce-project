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
import CategoryModal from './components/edit_cate_modal';
import BrandModal from './components/edit_brand_modal';

const { TabPane } = Tabs;

const initialBrands = [
  { id: 1, name: 'Klairs', numbersProduct: 12 },
  { id: 2, name: 'The Ordinary', numbersProduct: 12 },
  { id: 3, name: 'Innisfree', numbersProduct: 12 },
];

const initialCategories = [
  { id: 1, category: 'Toner', name: 'Nước hoa hồng', numbersProduct: 12 },
  { id: 2, category: 'Serum', name: 'Tinh chất', numbersProduct: 8 },
  { id: 3, category: 'Moisturizer', name: 'Kem dưỡng', numbersProduct: 15 },
];

const ProductManagement = () => {
  const [brandData, setBrandData] = useState(initialBrands);
  const [categoryData, setCategoryData] = useState(initialCategories);
  const categoryRef = useRef();
  const brandRef = useRef();

  const handleCreateOrUpdateBrand = async (values) => {
    if (values.id) {
      const updated = brandData.map(item =>
        item.id === values.id ? { ...item, ...values } : item
      );
      setBrandData(updated);
      message.success('Cập nhật brand thành công');
    } else {
      const newId = Math.max(...brandData.map(item => item.id), 0) + 1;
      setBrandData([...brandData, { ...values, id: newId, numbersProduct: 0 }]);
      message.success('Thêm brand thành công');
    }
    brandRef.current.close();
  };

  const handleDeleteBrand = (id) => {
    setBrandData(brandData.filter(item => item.id !== id));
    message.success('Đã xoá brand');
  };

  const handleCreateOrUpdateCategory = async (values) => {
    if (values.id) {
      const updated = categoryData.map(item =>
        item.id === values.id ? { ...item, ...values } : item
      );
      setCategoryData(updated);
      message.success('Cập nhật category thành công');
    } else {
      const newId = Math.max(...categoryData.map(item => item.id), 0) + 1;
      setCategoryData([...categoryData, { ...values, id: newId, numbersProduct: 0 }]);
      message.success('Thêm category thành công');
    }
    categoryRef.current.close();
  };

  const handleDeleteCategory = (id) => {
    setCategoryData(categoryData.filter(item => item.id !== id));
    message.success('Đã xoá category');
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
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => brandRef.current.open(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xoá brand này?"
            onConfirm={() => handleDeleteBrand(record.id)}
            okText="Đồng ý"
            cancelText="Huỷ"
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
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => categoryRef.current.open(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xoá category này?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Đồng ý"
            cancelText="Huỷ"
          >
            <Button icon={<DeleteOutlined />} color='danger' variant='solid' />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AdminPage
      title="Quản lý phân loại"
      icon={<BookOutlined />}
      breadcrumbItems={[{ title: 'Phân loại' }]}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Brand" key="1">
          <FloatButton type='primary' icon={<PlusOutlined />} onClick={() => brandRef.current.open()} tooltip='Thêm loại thương hiệu' />
          <Table dataSource={brandData} columns={brandColumns} rowKey="id" />

          <BrandModal ref={brandRef} onSubmit={handleCreateOrUpdateBrand} />
        </TabPane>
        <TabPane tab="Category" key="2">
          <Table dataSource={categoryData} columns={categoryColumns} rowKey="id" />
          <FloatButton type='primary' icon={<PlusOutlined />} onClick={() => categoryRef.current.open()} tooltip='Thêm loại sản phẩm' />

          <CategoryModal ref={categoryRef} onSubmit={handleCreateOrUpdateCategory} />
        </TabPane>

      </Tabs>
    </AdminPage>
  );
};

export default ProductManagement;
