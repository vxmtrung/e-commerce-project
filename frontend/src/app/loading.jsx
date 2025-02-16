import { Spin } from 'antd';

export default function Loading() {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-100 bg-opacity-80 z-50'>
            <Spin tip='Loading...' size='large' />
        </div>
    );
}