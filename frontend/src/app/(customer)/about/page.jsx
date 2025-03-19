'use client';
import { useAppSelector } from '@/hooks/redux_hooks';

export default function UserPage() {
    const user = useAppSelector('systemState', 'user').user;

    return (
        <div>
            Hello
        </div>

    );
}