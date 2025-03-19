'use client';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

// Define display name for each path
const breadcrumbMap = {
  '/': 'Home',
  '/profile': 'Profile',
  '/cart': 'Cart',
  '/product': 'Product',
  '/checkout': 'Checkout',
  '/about': 'About',
  '/policy': 'Privacy Policy',
  '/contact': 'Contact',
};

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <div style={{ padding: '10px 24px', background: '#f5f5f5' }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined /> <span>Home</span>
        </Breadcrumb.Item>
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
          return <Breadcrumb.Item key={url}>{breadcrumbMap[url] || segment}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
    </div>
  );
}