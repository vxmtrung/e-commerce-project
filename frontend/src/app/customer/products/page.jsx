'use client';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Pagination } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CustomerLayout from '../../(customer)/components/customer_layout';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const pageSize = 10;

    const formatPrice = (price) => {
        if (!price) return 'N/A';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Fetch products with aggregated data
            const productsResponse = await fetch(`http://localhost:3000/products?page=${currentPage}&size=${pageSize}`);
            const productsData = await productsResponse.json();
            setTotalItems(productsData.totalItems || 0);

            // Fetch all brands at once
            const brandsResponse = await fetch('http://localhost:3000/brands');
            const brandsData = await brandsResponse.json();
            const brandsMap = new Map(brandsData.map(brand => [brand.id, brand]));

            // Combine the data
            const productsWithDetails = productsData.items.map(product => ({
                ...product,
                brand: brandsMap.get(product.brandId) || null
            }));

            setProducts(productsWithDetails);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
        setLoading(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
    };

    return (
        <CustomerLayout>
            <div className="container mx-auto px-4 py-8">
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
                                        cover={
                                            <div className="overflow-hidden">
                                                <img
                                                    alt={product.name}
                                                    src={product.image_url || 'https://th.bing.com/th/id/OIP.Msemb0oPJ1dkR00ANAh6iwHaHa?rs=1&pid=ImgDetMain'}
                                                        //via.placeholder.com/300'}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                                />
                                            </div>
                                        }
                                    >
                                        <Card.Meta
                                            title={
                                                <div className="text-lg font-semibold transition-colors duration-300 hover:text-[#ff69b4]" style={{ color: '#ff85c1' }}>
                                                    {formatPrice(product.lowestPrice)} ₫
                                                </div>
                                            }
                                            description={
                                                <div className="space-y-2">
                                                    <p className="font-bold transition-colors duration-300 hover:text-[#ff69b4]" style={{ color: '#ff85c1' }}>
                                                        {product.brand?.name || 'Unknown Brand'}
                                                    </p>
                                                    <p className="text-gray-600 transition-colors duration-300 hover:text-[#ff69b4]">
                                                        {product.name || 'Unknown Product Name'}
                                                    </p>
                                                    <div className="flex items-center text-gray-500">
                                                        <ShoppingCartOutlined className="mr-2" />
                                                        <span>{product.totalQuantity || 0}</span>
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
        </CustomerLayout>
    );
}