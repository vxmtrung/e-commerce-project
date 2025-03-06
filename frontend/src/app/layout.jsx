'use client';
import './index.css';

import ReduxProvider from '@/redux/provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Metadata from '@/components/meta_data';


export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <Metadata seoTitle={'Hello'} seoDescription={'Hello Description'} />
            <body style={{ backgroundColor: 'white' }}>
                <ReduxProvider>
                    <AntdRegistry>
                        {children}
                    </AntdRegistry>
                </ReduxProvider>
            </body >
        </html >
    );
}

