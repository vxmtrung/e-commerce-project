'use client';
import { Layout } from 'antd';
import Header from './header';
import BreadcrumbNav from './breadcrumb';
import CustomFooter from './footer';
import CategorySidebar from './category_sidebar';

const { Sider, Content } = Layout;

export default function CustomerLayout({ children, isLoggedIn }) {
  return (
    <Layout className="min-h-screen">
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn && <BreadcrumbNav />}
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <CategorySidebar />
        </Sider>
        <Content className="p-6">{children}</Content>
      </Layout>
      <CustomFooter />
    </Layout>
  );
}
