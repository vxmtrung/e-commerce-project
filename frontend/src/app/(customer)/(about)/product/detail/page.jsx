'use client';

import ProductCard from '@/app/(customer)/components/product_cart';
import ProductDetailMenu from '@/app/(customer)/components/product_detail_menu';
import ReviewSection from '@/app/(customer)/components/review_section';
import { Space } from 'antd';

export default function DetailPage() {

    return (
        <Space direction='vertical'>
            <ProductCard />
            <ProductDetailMenu />
            <ReviewSection />
        </Space>
    );
}