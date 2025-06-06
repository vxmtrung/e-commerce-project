'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, Row, Col, Spin, Empty, Pagination, Select } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOrder, setSortOrder] = useState('default');
  const [categoryId, setCategoryId] = useState(null);
  const pageSize = 10;

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const calculateOriginalPrice = (currentPrice, discountPercent) => {
    if (!discountPercent || discountPercent === 0) return currentPrice;
    return Math.round(currentPrice / (1 - discountPercent / 100));
  };

  useEffect(() => {
    // Lấy categoryId từ query param nếu có
    const catId = searchParams.get('filter')?.split(':')[2] || null;
    setCategoryId(catId);
  }, [searchParams]);

  // Add: get search param from query
  const searchText = searchParams.get('search') || '';

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOrder, categoryId, searchText]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const sortParam = sortOrder !== 'default' ? `&sort=${sortOrder}` : '';
      let filterParam = '';
      if (categoryId) {
        filterParam = `&filter=categoryId:eq:${categoryId}`;
      } else if (searchParams.get('filter')) {
        filterParam = `&filter=${searchParams.get('filter')}`;
      }
      // Add: search filter
      let searchFilter = '';
      if (searchText) {
        searchFilter = `&filter=name:like:${encodeURIComponent(searchText)}`;
      }
      const productsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?page=${currentPage}&size=${pageSize}${sortParam}${filterParam}${searchFilter}`
      );
      const productsData = await productsResponse.json();
      setTotalItems(productsData.totalItems || 0);
      setProducts(productsData.items || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  const handleSortChange = (value) => {
    let sortValue;
    switch (value) {
      case 'price_asc':
        sortValue = 'price:asc';
        break;
      case 'price_desc':
        sortValue = 'price:desc';
        break;
      default:
        sortValue = 'default';
    }
    setSortOrder(sortValue);
    setCurrentPage(0);
  };

  const handleProductClick = (product) => {
    // localStorage.setItem(product.id, JSON.stringify(product));
    router.push(`/product/detail?id=${product.id}`);
  };

  return (
    <div className="container mx-auto px-4 pb-4">
      <div className="mb-4 flex justify-end">
        <Select
          defaultValue="default"
          style={{ width: 200 }}
          onChange={handleSortChange}
          options={[
            { value: 'default', label: 'Mặc định' },
            { value: 'price_asc', label: 'Giá: Thấp đến cao' },
            { value: 'price_desc', label: 'Giá: Cao đến thấp' },
          ]}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No products available at the moment"
          />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => handleProductClick(product)}
                  cover={
                    <div className="overflow-hidden">
                      <img
                        alt={product.name}
                        src={
                          product.lowestInstance?.productImgs?.[0]?.link ||
                          'https://th.bing.com/th/id/OIP.Msemb0oPJ1dkR00ANAh6iwHaHa?rs=1&pid=ImgDetMain'
                        }
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <div className="flex flex-row space-x-2 items-center">
                        <div
                          className="text-lg font-semibold transition-colors duration-300 hover:text-[#ff69b4]"
                          style={{ color: '#ff85c1' }}
                        >
                          {formatPrice(product.lowestPrice)} ₫
                        </div>
                        {product.lowestInstance?.discountPercent > 0 && (
                          <div className="text-sm line-through text-gray-400">
                            {formatPrice(
                              calculateOriginalPrice(
                                product.lowestPrice,
                                product.lowestInstance.discountPercent
                              )
                            )}{' '}
                            ₫
                          </div>
                        )}
                      </div>
                    }
                    description={
                      <div className="space-y-2">
                        <p
                          className="font-bold transition-colors duration-300 hover:text-[#ff69b4]"
                          style={{ color: '#ff85c1' }}
                        >
                          {product.brand?.name || 'Unknown Brand'}
                        </p>
                        <p className="text-gray-600 transition-colors duration-300 hover:text-[#ff69b4]">
                          {product.name || 'Unknown Product Name'}
                        </p>
                        <div className="flex items-center text-gray-500">
                          <ShoppingCartOutlined className="mr-2" />
                          <span>
                            {product.productInstances?.reduce(
                              (total, instance) =>
                                total + (instance.quantity || 0),
                              0
                            ) || 0}
                          </span>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage + 1}
              total={totalItems}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
