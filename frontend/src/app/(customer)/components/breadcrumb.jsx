'use client';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const breadcrumbMap = {
  '/': 'Trang chủ',
  '/cart': 'Giỏ hàng',
  '/product': 'Sản phẩm',
  '/product/detail': 'Chi tiết sản phẩm',
};

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = breadcrumbMap[url] || segment;

    return (
      <Breadcrumb.Item key={url}>
        <Link href={url}>{name}</Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <div style={{ padding: '10px 24px' }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/">
            <HomeOutlined /> <span>Trang chủ</span>
          </Link>
        </Breadcrumb.Item>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  );
}
