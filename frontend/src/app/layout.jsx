'use client';
import './index.css';

import ReduxProvider from '@/redux/provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Metadata from '@/components/meta_data';
import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Layout } from 'antd';
// import Header from '@/components/customer/layout/header';
// import CustomFooter from '@/components/customer/layout/footer';
// import BreadcrumbNav from '@/components/customer/layout/breadcrumb';

export default function RootLayout({ children }) {
    const isLoggedIn = true;

    return (
        <html lang="en">
            <Metadata seoTitle={'Hello'} seoDescription={'Hello Description'} />
            <body style={{ backgroundColor: 'white' }}>
                <ReduxProvider>
                    <AntdRegistry>
                        {children}
                        <SpeedInsights />
                    </AntdRegistry>
                </ReduxProvider>
            </body>
        </html>
    );
}
