'use client';
import Link from 'next/link';
import { Layout } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Footer } = Layout;

export default function CustomFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#333', color: 'white', padding: '24px 16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
          <Link href="/policy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '18px' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'white' }}>
            <FacebookOutlined />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{ color: 'white' }}>
            <TwitterOutlined />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'white' }}>
            <InstagramOutlined />
          </a>
        </div>

        <div style={{ fontSize: '14px' }}>
          &copy; {currentYear} E-Commerce. All rights reserved.
        </div>
      </div>
    </Footer>
  );
}