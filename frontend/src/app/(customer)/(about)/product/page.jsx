'use client';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Pagination, Select } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(40);
    const [sortOrder, setSortOrder] = useState('default');
    const pageSize = 8;

    const formatPrice = (price) => {
        if (!price) return 'N/A';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const mockData = {
        "totalItems": 40,
        "items": [
            {
                "id": "31584867-03ea-43c0-abc0-228479b850b0",
                "name": "Mascara 5.5g",
                "description": "Mặt nạ ngủ HydraSleep",
                "status": true,
                "categoryId": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
                "brand": {
                    "name": "BROWIT"
                },
                "image_url": "https://product.hstatic.net/200000697677/product/294356b6f1774c6e91c0be9d912d5bd6_03f234452e7c47b7b50af4b60e8a801f.jpeg",
                "brandId": "32e069dd-c962-473b-a6c7-718455e1923b",
                "createdAt": "2025-03-11T16:50:49.163Z",
                "updatedAt": "2025-03-11T16:50:49.163Z",
                "deletedAt": null,
                "lowestPrice": 97000,
                "totalQuantity": 33
              },
              {
                "id": "31584867-03ea-43c0-abc0-228479b850b0",
                "name": "Phấn mắt 12 ô",
                "description": "Mặt nạ ngủ HydraSleep",
                "status": true,
                "categoryId": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
                "brand": {
                    "name": "SUNSET MAGIC"
                },
                "image_url": "https://bizweb.dktcdn.net/thumb/grande/100/516/042/products/www-reallygreatsite-com-1.png?v=1717760521943",
                "brandId": "32e069dd-c962-473b-a6c7-718455e1923b",
                "createdAt": "2025-03-11T16:50:49.163Z",
                "updatedAt": "2025-03-11T16:50:49.163Z",
                "deletedAt": null,
                "lowestPrice": 130000,
                "totalQuantity": 33
              },
          {
            "id": "566e4b29-43b9-42d5-863f-ca040f11a692",
            "name": "Serum Vitamin C 3% 30ml",
            "description": "Kem dưỡng ẩm chăm sóc da",
            "status": true,
            "categoryId": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            "brand": {
                "name": "BALANCE"
            },
            "image_url": "https://hasaki.vn/_next/image?url=https%3A%2F%2Fmedia.hcdn.vn%2Fcatalog%2Fproduct%2Fg%2Fo%2Fgoogle-shopping-tinh-chat-balance-active-formula-vitamin-c-sang-da-30ml-1736496659.jpg&w=640&q=75",
            "brandId": "5bb58152-26be-43ac-8fd5-48b44a77e444",
            "createdAt": "2025-03-11T16:46:26.644Z",
            "updatedAt": "2025-03-11T16:46:26.644Z",
            "deletedAt": null,
            "lowestPrice": 135000,
            "totalQuantity": 30
          },
          {
            "id": "2ae6ce83-6986-46f2-a837-058222c6df43",
            "name": "Kem dưỡng ẩm Thạch Hoa Hồng 30ml",
            "description": "Serum Vitamin C",
            "status": true,
            "categoryId": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            "brand": {
                "name": "COCOON"
            },
            "image_url": "https://product.hstatic.net/200000060700/product/dgm_nttt_thach-hoa-hong-duong-am-rose-aqua-gel-cream-cocoon_5cf507a992924c6895f8cb600707455f_grande.jpg",
            "brandId": "53374039-66da-4747-a4ef-bc2093297dd1",
            "createdAt": "2025-03-11T16:47:59.038Z",
            "updatedAt": "2025-03-11T16:47:59.038Z",
            "deletedAt": null,
            "lowestPrice": 159000,
            "totalQuantity": 31
          },
          {
            "id": "d23f4548-c30c-468c-97a9-1206b84040b4",
            "name": "Dầu gội 640g",
            "description": "Gel Trị Mụn ClearSkin",
            "status": true,
            "categoryId": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            "brand": {
                "name": "TRESemmé"
            },
            "image_url": "https://lanchi.vn/wp-content/uploads/2021/11/DAU-GOI-TRESEMME-SALON-REBOND-640G.jpg",
            "brandId": "50083ee8-40ba-4593-9acb-81b6ffa8e24c",
            "createdAt": "2025-03-11T16:49:28.998Z",
            "updatedAt": "2025-03-11T16:49:28.998Z",
            "deletedAt": null,
            "lowestPrice": 179000,
            "totalQuantity": 32
          },
          {
            "id": "31584867-03ea-43c0-abc0-228479b850b0",
            "name": "Xịt tóc 100ml",
            "description": "Mặt nạ ngủ HydraSleep",
            "status": true,
            "categoryId": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            "brand": {
                "name": "ROSEMARY"
            },
            "image_url": "https://hasaki.vn/_next/image?url=https%3A%2F%2Fmedia.hcdn.vn%2Fcatalog%2Fproduct%2Fg%2Fo%2Fgoogle-shopping-xit-duong-chan-toc-aromatica-chiet-xuat-huong-thao-100ml-1692420869.jpg&w=3840&q=75",
            "brandId": "32e069dd-c962-473b-a6c7-718455e1923b",
            "createdAt": "2025-03-11T16:50:49.163Z",
            "updatedAt": "2025-03-11T16:50:49.163Z",
            "deletedAt": null,
            "lowestPrice": 200000,
            "totalQuantity": 33
          },
          {
            "id": "38e13126-2d92-4d88-b678-0be4328d4bd7",
            "name": "Son kem lì Velvet Lip Tint 4g",
            "description": "Nước Hoa Body Mist DreamyScents ",
            "status": true,
            "categoryId": "0d3bcf73-3126-4254-83cf-bc08065155ff",
            "brand": {
                "name": "3CE"
            },
            "image_url": "https://image.hsv-tech.io/1987x0/bbx/products/b06abb3b-79ed-4484-897a-e55b4394a48c.webp",
            "brandId": "3ea9d56d-4fc2-41ad-bf75-10e1111c94d5",
            "createdAt": "2025-03-11T17:10:53.815Z",
            "updatedAt": "2025-03-11T17:10:53.815Z",
            "deletedAt": null,
            "lowestPrice": 279000,
            "totalQuantity": 50
          },
          {
            "id": "e743180a-5885-4efe-8402-8a57ff887293",
            "name": "Cushion SPF50+ 13g",
            "description": "Xịt Khử Mùi FreshShield",
            "status": true,
            "categoryId": "0d3bcf73-3126-4254-83cf-bc08065155ff",
            "brand": {
                "name": "APERIRE"
            },
            "image_url": "https://product.hstatic.net/200000150709/product/1_4a8259e1f7644d92953f597477eac9c4.png",
            "brandId": "b0d2103f-7c3b-4cfa-b537-0803e47f63f5",
            "createdAt": "2025-03-11T17:10:12.029Z",
            "updatedAt": "2025-04-14T07:23:17.380Z",
            "deletedAt": null,
            "lowestPrice": 319000,
            "totalQuantity": 80
          }
        ],
        "page": 1,
        "size": 8
      }

    useEffect(() => {
        setProducts(mockData.items);
    }, [currentPage, sortOrder]);

    // const fetchProducts = async () => {
    //     setLoading(true);
    //     try {
    //         const sortParam = sortOrder !== 'default' ? `&sort=${sortOrder}` : '';
    //         // Fetch products with aggregated data
    //         const productsResponse = await fetch(`http://localhost:3000/products?page=${currentPage}&size=${pageSize}${sortParam}`);
    //         const productsData = await productsResponse.json();
    //         setTotalItems(productsData.totalItems || 0);

    //         // Fetch all brands at once
    //         const brandsResponse = await fetch('http://localhost:3000/brands');
    //         const brandsData = await brandsResponse.json();
    //         const brandsMap = new Map(brandsData.map(brand => [brand.id, brand]));

    //         // Combine the data
    //         const productsWithDetails = productsData.items.map(product => ({
    //             ...product,
    //             brand: brandsMap.get(product.brandId) || null
    //         }));

    //         setProducts(productsWithDetails);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //         setProducts([]);
    //     }
    //     setLoading(false);
    // };

    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
    };

    const handleSortChange = (value) => {
        // Convert frontend sort value to backend format
        let sortValue;
        switch (value) {
            case 'price_asc':
                sortValue = 'price:asc';
                break;
            case 'price_desc':
                sortValue = 'price:desc';
                break;
            default:
                sortValue = undefined;
        }
        setSortOrder(sortValue);
        setCurrentPage(0); // Reset to first page when sorting changes
    };

    return (
        // <CustomerLayout>
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
        // </CustomerLayout>
    );
}
