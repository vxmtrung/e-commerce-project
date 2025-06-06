'use client';
import './index.css';

import ReduxProvider from '@/redux/provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Metadata from '@/components/meta_data';
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Metadata seoTitle={'Lunera'} seoDescription={'E - cosmetic'} />
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
