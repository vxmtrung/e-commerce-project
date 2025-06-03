'use client';
import React, { useRef, useState, useEffect } from 'react';
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


const ProductManagement = () => {
  const [brandData, setBrandData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const categoryRef = useRef();
  const brandRef = useRef();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, categoryRes, productRes] = await Promise.all([
          fetch(`${backendUrl}/brands`),
          fetch(`${backendUrl}/categories`),
          fetch(`${backendUrl}/products?size=50&page=0`), 
        ]);

        if (!brandRes.ok || !categoryRes.ok || !productRes.ok) {
          throw new Error('Lỗi fetch dữ liệu');
        }

        const brands = await brandRes.json();
        const categories = await categoryRes.json();
        const productData = await productRes.json();
        const products = productData.items || [];


        const brandCountMap = products.reduce((acc, product) => {
          const brandId = product.brandId;
          acc[brandId] = (acc[brandId] || 0) + 1;
          return acc;
        }, {});


        const categoryCountMap = products.reduce((acc, product) => {
          const categoryId = product.categoryId;
          acc[categoryId] = (acc[categoryId] || 0) + 1;
          return acc;
        }, {});


        const brandsWithCount = brands.map(brand => ({
          ...brand,
          numbersProduct: brandCountMap[brand.id] || 0,
        }));


        const categoriesWithCount = categories.map(category => ({
          ...category,
          numbersProduct: categoryCountMap[category.id] || 0,
        }));

        setBrandData(brandsWithCount);
        setCategoryData(categoriesWithCount);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        message.error('Không thể tải dữ liệu: ' + err.message);
      }
    };

    fetchData();
  }, []);

  const refreshBrandData = async () => {
    const [brandRes, productRes] = await Promise.all([
      fetch(`${backendUrl}/brands`),
      fetch(`${backendUrl}/products?size=50&page=0`),
    ]);

    const brands = await brandRes.json();
    const productData = await productRes.json();
    const products = productData.items || [];

    const brandCountMap = products.reduce((acc, product) => {
      acc[product.brandId] = (acc[product.brandId] || 0) + 1;
      return acc;
    }, {});
    console.log('Brand count map:', brandCountMap);
    const brandsWithCount = brands.map(brand => ({
      ...brand,
      numbersProduct: brandCountMap[brand.id] || 0,
    }));

    setBrandData(brandsWithCount);
  };

  const refreshCategoryData = async () => {
    const [categoryRes, productRes] = await Promise.all([
      fetch(`${backendUrl}/categories`),
      fetch(`${backendUrl}/products?size=50&page=0`),
    ]);

    const categories = await categoryRes.json();
    const productData = await productRes.json();
    const products = productData.items || [];

    const categoryCountMap = products.reduce((acc, product) => {
      acc[product.categoryId] = (acc[product.categoryId] || 0) + 1;
      return acc;
    }, {});

    const categoriesWithCount = categories.map(category => ({
      ...category,
      numbersProduct: categoryCountMap[category.id] || 0,
    }));

    setCategoryData(categoriesWithCount);
  };

  const handleCreateOrUpdateBrand = async (values) => {
    try {
      const method = values.id ? 'PUT' : 'POST';
      const url = values.id
        ? `${backendUrl}/brands/${values.id}`
        : `${backendUrl}/brands`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      await refreshBrandData();

      message.success(values.id ? 'Cập nhật brand thành công' : 'Thêm brand thành công');
      brandRef.current.close();
    } catch (err) {
      message.error('Thao tác brand thất bại');
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/brands/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      await refreshBrandData();
      message.success('Đã xoá brand');
    } catch (err) {
      message.error('Xoá brand thất bại');
    }
  };

  const handleCreateOrUpdateCategory = async (values) => {
    try {
      const method = values.id ? 'PUT' : 'POST';
      const url = values.id
        ? `${backendUrl}/categories/${values.id}`
        : `${backendUrl}/categories`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      await refreshCategoryData(); 

      message.success(values.id ? 'Cập nhật category thành công' : 'Thêm category thành công');
      categoryRef.current.close();
    } catch (err) {
      message.error('Thao tác category thất bại');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/categories/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      await refreshCategoryData();;
      message.success('Đã xoá category');
    } catch (err) {
      message.error('Xoá category thất bại');
    }
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
    // {
    //   title: 'Loại',
    //   dataIndex: 'category',
    //   key: 'category',
    // },
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
