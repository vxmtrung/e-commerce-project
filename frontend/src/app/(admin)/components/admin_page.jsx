

import { HomeFilled } from '@ant-design/icons';
import { Breadcrumb, Layout, Space } from 'antd';

const { Header, Content } = Layout;

const AdminPage = ({ title, children, breadcrumbItems, icon }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Header style={{
                    background: '#fff',
                    padding: '10px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    position: 'sticky'
                }}>
                    <div style={{ fontSize: '25px', fontWeight: 'bold' }}><Space>{icon}{title}</Space></div>
                    <Breadcrumb
                        items={[
                            {
                                href: '/user',
                                title:
                                    <HomeFilled />
                            },
                            ...breadcrumbItems
                        ]}
                    />
                </Header>
                <Content>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360, overflowY: 'auto' }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
