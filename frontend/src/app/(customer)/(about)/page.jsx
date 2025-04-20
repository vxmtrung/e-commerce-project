'use client';
import { useAppSelector } from '@/hooks/redux_hooks';
import ProductsPage from './product/page';

export default function UserPage() {
    const user = useAppSelector('systemState', 'user').user;
    return (
        <div className='bg-white'>
            <ProductsPage />
        </div>
    );
}