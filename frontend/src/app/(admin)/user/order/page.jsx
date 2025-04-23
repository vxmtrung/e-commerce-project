'use client';

const mockData = [
    {
        "orderId": "o1",
        "status": "inProgress",
        "paymentMethod": "COD",
        "paymentStatus": false,
        "createdAt": 1713100000000,
        "userId": "u1",
        "phoneNumber": "0909123456",
        "email": "john.doe@example.com",
        "username": "johnny",
        "shippingAddress": {
            "receiverName": "John Doe",
            "receiverPhone": "0909123456",
            "city": "Hồ Chí Minh",
            "district": "Quận 1",
            "town": "Phường Bến Nghé",
            "additionalInformation": "Tầng 5, toà nhà Bitexco"
        },
        "products": [
            {
                "productId": "p1",
                "name": "Toner Klairs",
                "description": "Nước hoa hồng cho da nhạy cảm",
                "price": 250000,
                "quantity": 2
            },
            {
                "productId": "p2",
                "name": "Serum The Ordinary",
                "description": "Serum phục hồi da",
                "price": 320000,
                "quantity": 1
            }
        ]
    },
    {
        "orderId": "o2",
        "status": "sent",
        "paymentMethod": "MOMO",
        "paymentStatus": true,
        "createdAt": 1713150000000,
        "userId": "u2",
        "phoneNumber": "0988123456",
        "email": "nguyenvana@gmail.com",
        "username": "nguyenvana",
        "shippingAddress": {
            "receiverName": "Nguyễn Văn A",
            "receiverPhone": "0988123456",
            "city": "Hà Nội",
            "district": "Cầu Giấy",
            "town": "Phường Dịch Vọng",
            "additionalInformation": "Nhà số 12, ngõ 8"
        },
        "products": [
            {
                "productId": "p3",
                "name": "Kem dưỡng Innisfree",
                "description": "Dưỡng ẩm chiết xuất trà xanh",
                "price": 180000,
                "quantity": 1
            }
        ]
    },
    {
        "orderId": "o3",
        "status": "received",
        "paymentMethod": "MOMO",
        "paymentStatus": true,
        "createdAt": 1713200000000,
        "userId": "u3",
        "phoneNumber": "0912345678",
        "email": "tranb@gmail.com",
        "username": "tranthib",
        "shippingAddress": {
            "receiverName": "Trần Thị B",
            "receiverPhone": "0912345678",
            "city": "Đà Nẵng",
            "district": "Hải Châu",
            "town": "Phường Hòa Thuận",
            "additionalInformation": "Căn hộ 3B, chung cư A"
        },
        "products": [
            {
                "productId": "p2",
                "name": "Serum The Ordinary",
                "description": "Serum phục hồi da",
                "price": 320000,
                "quantity": 2
            },
            {
                "productId": "p4",
                "name": "Sữa rửa mặt Senka",
                "description": "Làm sạch sâu, dịu nhẹ",
                "price": 90000,
                "quantity": 1
            }
        ]
    },
    {
        "orderId": "o4",
        "status": "cancelled",
        "paymentMethod": "COD",
        "paymentStatus": false,
        "createdAt": 1713250000000,
        "userId": "u4",
        "phoneNumber": "0978123456",
        "email": "cuongle@gmail.com",
        "username": "cuongle",
        "shippingAddress": {
            "receiverName": "Lê Quốc Cường",
            "receiverPhone": "0978123456",
            "city": "Cần Thơ",
            "district": "Ninh Kiều",
            "town": "Phường Xuân Khánh",
            "additionalInformation": "Số nhà 456, đường 3/2"
        },
        "products": [
            {
                "productId": "p5",
                "name": "Tẩy trang Bioderma",
                "description": "Tẩy trang cho da nhạy cảm",
                "price": 270000,
                "quantity": 1
            }
        ]
    },
    {
        "orderId": "o5",
        "status": "inProgress",
        "paymentMethod": "MOMO",
        "paymentStatus": false,
        "createdAt": 1713300000000,
        "userId": "u5",
        "phoneNumber": "0909999999",
        "email": "thuha.pham@gmail.com",
        "username": "thuha",
        "shippingAddress": {
            "receiverName": "Phạm Thu Hà",
            "receiverPhone": "0909999999",
            "city": "Hải Phòng",
            "district": "Lê Chân",
            "town": "Phường Vĩnh Niệm",
            "additionalInformation": "Gần trường THPT Lê Quý Đôn"
        },
        "products": [
            {
                "productId": "p6",
                "name": "Kem chống nắng Anessa",
                "description": "Chống nắng mạnh SPF50+",
                "price": 420000,
                "quantity": 1
            },
            {
                "productId": "p1",
                "name": "Toner Klairs",
                "description": "Nước hoa hồng cho da nhạy cảm",
                "price": 250000,
                "quantity": 1
            }
        ]
    }
];


export default function OrderPage() {
    return <></>;
}