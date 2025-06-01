'use client';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useAppRouter } from '@/hooks/router_hook';
import { fetchSystemState, genOtpSystemState, loginSystemState, signUpSystemState } from '@/app/redux';
import { useAppDispatch } from '@/hooks/redux_hooks';
import { T } from '@/app/common';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useAppRouter();
    const [counter, setCounter] = useState(0);
    const [form] = Form.useForm();

    useEffect(() => {
        // dispatch(fetchSystemState()).then(result => {
        //     if (result) {
        //         const sessionUser = result.sessionUser;
        //         sessionUser.isAdmin ? router.push('/user') : router.push('/student');
        //     }
        //     else {
        //         T.cookies.deleteCookie(['token', 'refreshToken']);
        //     }
        // });
    }, []);

    // useEffect(() => {
    //     if (counter === 0) return;
    //     const interval = setInterval(() => {
    //         if (counter <= 1) {
    //             clearInterval(interval);
    //             setCounter(0);
    //         }
    //         else setCounter(counter - 1);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [counter]);

    const handleLogin = async values => {
        const { username, password } = values;
        const user = await dispatch(loginSystemState({ username, password }));
        if (user) {
            user.role == 'ADMIN' ? router.push('/user') : router.push('/product');
        }
    };

    const handleRegister = async (values) => {
        const { name, email, phoneNumber, username, password } = values;
        await signUpSystemState({ name, email, phoneNumber, username, password });
    };

    // const handleGenOtp = async () => {
    //     const email = form.getFieldValue('email');
    //     if (!email) return T.message.error('Chưa nhập địa chỉ email!');
    //     const result = await genOtpSystemState(email);
    //     result && setCounter(60);
    // };

    return (
        <div className='flex justify-center items-center mb-40 mt-40 '>
            <Card className='w-full max-w-md shadow-xl rounded-2xl p-6 '>
                <Tabs
                    defaultActiveKey='login_tab'
                    className='min-h-70%'
                    items={[
                        {
                            key: 'login_tab',
                            label: 'Đăng nhập',
                            children: (
                                <Form
                                    onFinish={handleLogin}
                                >
                                    <Form.Item name='username' rules={[{ required: true, message: 'Vui lòng nhập email hoặc username!' }]}>
                                        <Input placeholder='Username hoặc email' prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                                        <Input.Password placeholder='Mật khẩu' prefix={<LockOutlined />} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' className='w-full' htmlType='submit'>
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )
                        },
                        {
                            key: 'register_tab',
                            label: 'Tạo tài khoản',
                            children: (
                                <Form
                                    onFinish={handleRegister}
                                    form={form}
                                >
                                    <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                                        <Input placeholder='Nguyễn văn A' prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item name='username' rules={[{ required: true, message: 'Vui lòng nhập username!' }]}>
                                        <Input placeholder='Username' prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item name='email' rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không đúng định dạng!' }]}>
                                        <Input placeholder='Email' prefix={<MailOutlined />} />
                                    </Form.Item>
                                    <Form.Item name='phoneNumber' rules={[
                                        () => ({ validator: (_, value) => value && isNaN(parseInt(value)) ? Promise.reject(new Error('Số điện thoại không hợp lệ!')) : Promise.resolve() }),
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' }
                                    ]}
                                    >
                                        <Input placeholder='0123456789' prefix={<PhoneOutlined />} />
                                    </Form.Item>
                                    <Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                                        <Input.Password placeholder='Mật khẩu' prefix={<LockOutlined />} />
                                    </Form.Item>
                                    <Form.Item name='confirmPassword' rules={[
                                        { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                        ({ getFieldValue }) => ({
                                            validator: (_, value) => {
                                                if (!value || value === getFieldValue('password')) return Promise.resolve();
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            }
                                        })
                                    ]}>
                                        <Input.Password placeholder='Xác nhận mật khẩu' prefix={<LockOutlined />} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' htmlType='submit' className='w-full'>
                                            Tạo tài khoản
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )
                        }
                    ]}
                >
                </Tabs>

            </Card>
        </div>
    );
} 