'use client';
import { useAppSelector } from '@/hooks/redux_hooks';

export default function UserPage() {
    const user = useAppSelector('systemState', 'userReducer').user;

    return (
        <div>
            Hello
        </div>
    );
}