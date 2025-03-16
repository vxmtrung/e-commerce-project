'use client';
import { useEffect, useState } from 'react';
import Metadata from '@/components/meta_data';
import AntdConfigProvider from '@/context/config_provider';
import { AdminLayout, loadMenu } from '../components/admin_layout';
import { useAppSelector } from '@/hooks/redux_hooks';

export default function RootLayout({ children }) {
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        const menus = loadMenu();
        setMenus(menus);
    }, []);

    return (
        <>
            <Metadata seoTitle={'User'} seoDescription={'User Description'} />
            <AntdConfigProvider>
                <AdminLayout menus={menus}>
                    {children}
                </AdminLayout>
            </AntdConfigProvider>
        </>
    );
}

