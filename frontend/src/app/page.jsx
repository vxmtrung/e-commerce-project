'use client';
import { useAppRouter } from '@/hooks/router_hook';
import React, { useEffect } from 'react';

export default function MyApp() {
    const router = useAppRouter();
    useEffect(() => {
        router.push('/product');
    }, []);
    return (<></>);
}