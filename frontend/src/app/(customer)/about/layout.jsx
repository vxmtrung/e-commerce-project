'use client';
import Metadata from '@/components/meta_data';
import ReduxProvider from '@/redux/provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import CustomerLayout from '../components/customer_layout';
import { AntdConfigProviderCustomer } from '@/context/config_provider';

export default function CustomerRootLayout({ children }) {
    const isLoggedIn = true;

    return (
        <>
            <Metadata seoTitle="Customer" seoDescription="Customer Panel" />
            <AntdConfigProviderCustomer>
                <CustomerLayout isLoggedIn={isLoggedIn}>{children}</CustomerLayout>
            </AntdConfigProviderCustomer>
        </>
    );
}