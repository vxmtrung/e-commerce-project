'use client';
import { useAppSelector } from '@/hooks/redux_hooks';
import ProductItem from '../components/productItem';
import ProductList from '../components/productList';
import Pagination from '../components/pagination';
import SortBar from '../components/sortBar';

const res = {
    totalItems: 20,
    items: [
        {
            id: "566e4b29-43b9-42d5-863f-ca040f11a692",
            name: "Kem dưỡng ẩm",
            description: "Kem dưỡng ẩm chăm sóc da",
            status: true,
            categoryId: "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            brandId: "5bb58152-26be-43ac-8fd5-48b44a77e444",
            createdAt: "2025-03-11T16:46:26.644Z",
            updatedAt: "2025-03-11T16:46:26.644Z",
            deletedAt: null
        },
        {
            id: "2ae6ce83-6986-46f2-a837-058222c6df43",
            name: "Serum Vitamin C",
            description: "Serum Vitamin C",
            status: true,
            categoryId: "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            brandId: "53374039-66da-4747-a4ef-bc2093297dd1",
            createdAt: "2025-03-11T16:47:59.038Z",
            updatedAt: "2025-03-11T16:47:59.038Z",
            deletedAt: null
        },
        {
            id: "d23f4548-c30c-468c-97a9-1206b84040b4",
            name: "Gel Trị Mụn",
            description: "Gel Trị Mụn ClearSkin",
            status: true,
            categoryId: "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            brandId: "50083ee8-40ba-4593-9acb-81b6ffa8e24c",
            createdAt: "2025-03-11T16:49:28.998Z",
            updatedAt: "2025-03-11T16:49:28.998Z",
            deletedAt: null
        },
        {
            id: "31584867-03ea-43c0-abc0-228479b850b0",
            name: "Mặt nạ ngủ",
            description: "Mặt nạ ngủ HydraSleep",
            status: true,
            categoryId: "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            brandId: "32e069dd-c962-473b-a6c7-718455e1923b",
            createdAt: "2025-03-11T16:50:49.163Z",
            updatedAt: "2025-03-11T16:50:49.163Z",
            deletedAt: null
        },
        {
            id: "b8851e27-e599-45c7-a7f6-a9ab464cc792",
            name: "Son Kem Lì",
            description: "Son Kem Lì VelvetMatte",
            status: true,
            categoryId: "926830a8-ed2e-443b-ab39-dad992d86132",
            brandId: "7e21d88a-ae70-478f-ab9a-2134c7bb15e9",
            createdAt: "2025-03-11T16:54:35.468Z",
            updatedAt: "2025-03-11T16:54:35.468Z",
            deletedAt: null
        }
    ],
    page: 0,
    size: 5
}

export default function UserPage() {
    const user = useAppSelector('systemState', 'user').user;
    return (
        <div className='bg-white'>
            <SortBar />
            <ProductList />
            <Pagination />
        </div>
    );
}