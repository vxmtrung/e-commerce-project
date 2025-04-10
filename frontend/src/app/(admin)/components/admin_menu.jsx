'use client';
import { Logo } from '@/components/logo';
import { COLOR } from '@/context/config_provider';
import { useAppSelector } from '@/hooks/redux_hooks';
import { ConfigProvider, Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
const { Sider } = Layout;

export default function SideNav({ ...others }) {
    const nodeRef = useRef(null);
    const pathname = usePathname();
    const listPart = pathname.split('/');
    const [openKeys, setOpenKeys] = useState(['']);
    const [current, setCurrent] = useState('');
    const rootSubmenuKeys = others.menus.map((menu) => menu.key);
    const user = useAppSelector('systemState', 'user').user;

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    useEffect(() => {
        let findOpenKeys = others.menus.find((menu) => menu.children?.find((child) => child.key === pathname || (child.subpaths && child.subpaths.some(path => path.split('/').every((part, idx) => listPart[idx] && part.startsWith(':') || part === listPart[idx]))))) || {};
        if (!findOpenKeys.key) {
            findOpenKeys = others.menus.find(menu => menu.key === pathname || (menu.subpaths && menu.subpaths.some(path => path.split('/').every((part, idx) => listPart[idx] && part.startsWith(':') || part === listPart[idx])))) || {};
        }
        let current;
        if (findOpenKeys.subpaths) {
            current = findOpenKeys.subpaths.some(path => path.split('/').every((part, idx) => listPart[idx] && part.startsWith(':') || part === listPart[idx])) && findOpenKeys.key || pathname;
        }
        else current = findOpenKeys.children?.find(child => child.subpaths && child.subpaths.some(path => path.split('/').every((part, idx) => listPart[idx] && part.startsWith(':') || part === listPart[idx])))?.key || pathname;
        setOpenKeys([findOpenKeys.key]);
        setCurrent(current);
    }, [pathname, others.menus]);
    return (
        <Sider ref={nodeRef} breakpoint='lg' collapsedWidth='0' {...others}>
            <Logo
                title={'HAHAHA'}
                logoPublicPath={'/vercel.svg'}
                color='blue'
                asLink
                href={'/'}
                justify='center'
                gap='small'
                imgSize={{ h: 28, w: 28 }}
                style={{ padding: '1rem 0' }}
            />
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemBg: 'none',
                            itemSelectedBg: COLOR['100'],
                            itemHoverBg: COLOR['50'],
                            itemSelectedColor: COLOR['600'],
                        },
                    },
                }}
            >
                <Menu
                    mode='inline'
                    items={others.menus}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={[current]}
                    style={{ border: 'none' }}
                />
            </ConfigProvider>
        </Sider>
    );
}