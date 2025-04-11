'use client';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty } from 'antd';
import client from '@/core/fetch/fetch_api.jsx';
import CustomerLayout from '../../(customer)/components/customer_layout';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await client['get']('/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
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
                    <Row gutter={[16, 16]}>
                        {products.map((product) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={product.name}
                                            src={product.image_url || 'https://via.placeholder.com/300'}
                                            className="h-48 object-cover"
                                        />
                                    }
                                >
                                    <Card.Meta
                                        title={product.name}
                                        description={
                                            <div>
                                                <p className="text-lg font-semibold text-blue-600">
                                                    ${product.price}
                                                </p>
                                                <p className="text-gray-600 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </CustomerLayout>
    );
}