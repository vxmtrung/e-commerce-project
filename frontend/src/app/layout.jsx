'use client';
import './index.css';

import ReduxProvider from '@/redux/provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Metadata from '@/components/meta_data';
import { Layout } from 'antd';
import Header from '@/components/customer/layout/header';
import CustomFooter from '@/components/customer/layout/footer';
import BreadcrumbNav from '@/components/customer/layout/breadcrumb';

export default function RootLayout({ children }) {
    const isLoggedIn = true;

    return (
        <html lang="en">
            <Metadata seoTitle={'Hello'} seoDescription={'Hello Description'} />
            <body style={{ backgroundColor: 'white' }}>
                <ReduxProvider>
                    <AntdRegistry>
                        <Layout className="min-h-screen">
                            <Header isLoggedIn={isLoggedIn} />
                            {isLoggedIn && <BreadcrumbNav />}
                            <Layout.Content className="p-6">{children}</Layout.Content>
                            <CustomFooter />
                        </Layout>
                    </AntdRegistry>
                </ReduxProvider>
            </body>
        </html>
    );
}
