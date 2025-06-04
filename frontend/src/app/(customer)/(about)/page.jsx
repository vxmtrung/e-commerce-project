'use client';
import { useAppSelector } from '@/hooks/redux_hooks';
import ProductsPage from './product/page';

export default function UserPage() {
    const user = useAppSelector('systemState', 'userReducer').user;
    return (
        <div className='bg-white'>
            <ProductsPage />
        </div>
    );
}