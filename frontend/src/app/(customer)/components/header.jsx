'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Badge, Input } from 'antd';
import { ShoppingCartOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { tokenCustomer } from '@/context/config_provider';
import { useAppSelector } from '@/hooks/redux_hooks';
import { T } from '@/app/common';
import { useRouter, usePathname } from 'next/navigation';

const { Header: AntHeader } = Layout;

export default function Header({ isLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState('');
  const user = useAppSelector('systemState', 'userReducer').user;
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const searchParam = `search=${encodeURIComponent(searchQuery)}`;
    if (pathname.includes('/product')) {
      // Đang ở trang product, chỉ update query param để trigger API fetch
      const url = `/product?page=0&size=10&${searchParam}`;
      router.push(url);
    } else {
      // Không ở trang product, chuyển hướng sang product với search
      router.push(`/product?page=0&size=10&${searchParam}`);
    }
  };
  const menuItems = user
    ? [
      { key: '1', label: <Link href="/profile">Trang cá nhân</Link> },
      { key: '2', label: <Link href="/cart">Giỏ hàng</Link> },
      { key: '3', label: <Link href="/order">Đơn hàng của tôi</Link> },
      { key: '4', label: <Link href="/login" onClick={() => T.localStorage.storage('token', '')}>Đăng xuất</Link> },
    ]
    : [
      { key: '1', label: <Link href="/login">Đăng nhập</Link> },
      { key: '2', label: <Link href="/login">Đăng ký</Link> },
    ];

  return (
    <AntHeader
      style={{
        backgroundColor: tokenCustomer.colorLinkActive,
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
          Lunera
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Ô tìm kiếm */}
          <Input
            placeholder="Tìm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch}
            suffix={<SearchOutlined onClick={handleSearch} style={{ cursor: 'pointer' }} />}
            style={{ width: '250px' }}
          />

          {user && (
            <Link href="/cart" style={{ color: 'white', fontSize: '20px', position: 'relative' }}>
              <Badge count={2} size="small" offset={[5, -2]} style={{ backgroundColor: '#ff4d4f' }}>
                <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} />
              </Badge>
            </Link>
          )}

          <Dropdown menu={{ items: menuItems }} placement="bottomRight">
            <span>
              <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </span>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
}
