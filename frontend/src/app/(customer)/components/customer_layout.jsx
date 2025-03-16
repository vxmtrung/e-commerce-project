'use client';
import { Layout } from 'antd';
import Header from './header';
import BreadcrumbNav from './breadcrumb';
import CustomFooter from './footer';

export default function CustomerLayout({ children, isLoggedIn }) {
    return (
        <Layout className="min-h-screen">
            <Header isLoggedIn={isLoggedIn} />
            {isLoggedIn && <BreadcrumbNav />}
            <Layout.Content className="p-6">{children}</Layout.Content>
            <CustomFooter />
        </Layout>
    );
}