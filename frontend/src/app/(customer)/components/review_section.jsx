'use client';
import { Rate, Progress, Button, Pagination, Select, Avatar, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { tokenCustomer } from '@/context/config_provider';

const { Option } = Select;

const ReviewItem = ({ reviewItem }) => {
  const convertToStringTime = (time) => {
    if (!time) {
      return '';
    }

    const getFormatedTime = (time) => {
      if (!time) {
        return '--';
      }

      if (time < 10) {
        return `0${time}`;
      }
      return time;
    };

    const date = new Date(parseInt(time, 10));
    return `${getFormatedTime(date.getHours())}:${getFormatedTime(
      date.getMinutes()
    )} | ${getFormatedTime(date.getDate())}-${getFormatedTime(
      date.getMonth() + 1
    )}-${getFormatedTime(date.getFullYear())}`;
  };

  return (
    <div className="border-t py-4">
      <div className="flex items-start gap-4">
        <Avatar icon={<UserOutlined />} />
        <div>
          <div className="flex items-center gap-2">
            <Rate disabled defaultValue={5} className="text-sm" />
            <span className="font-semibold text-green-600">
              {reviewItem?.reviewerName}
            </span>
            <span className="text-gray-500 text-sm">
              | {reviewItem?.productName}
            </span>
          </div>

          <p className="mt-2">{reviewItem?.reviewContents}</p>

          <div className="bg-gray-100 px-3 py-2 mt-2 rounded text-sm text-gray-700">
            {reviewItem?.replyContents}
          </div>

          <span className="text-gray-400 text-xs">
            {convertToStringTime(reviewItem?.time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ReviewSection() {
  const [averageRating, setAverageRating] = React.useState(4.8);
  const [totalReviews, setTotalReviews] = React.useState(129);
  const [ratingData, setRatingData] = React.useState([
    { star: 5, count: 107 },
    { star: 4, count: 22 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ]);
  const [reviews, setReviews] = React.useState([
    {
      reviewerName: 'Trương Bảo Mẫn',
      productName: 'Nước Hoa Hồng Klairs Dành Cho Da Nhạy Cảm 180ml',
      reviewContents: 'tui xài này r , dùng rất oki cũng giảm mụn tí',
      replyContents:
        'Hasaki xin chào! Cảm ơn Trương Bảo Mẫn đã dành thời gian đánh giá. Sự hài lòng của ' +
        'khách hàng là động lực to lớn để Hasaki ngày càng phát triển hơn nữa về chất lượng dịch vụ. Cảm ơn bạn đã tin tưởng và mua sắm tại Hasaki.',
      time: '1549312452000',
    },
    {
      reviewerName: 'Trương Bảo Mẫn',
      productName: 'Nước Hoa Hồng Klairs Dành Cho Da Nhạy Cảm 180ml',
      reviewContents: 'tui xài này r , dùng rất oki cũng giảm mụn tí',
      replyContents:
        'Hasaki xin chào! Cảm ơn Trương Bảo Mẫn đã dành thời gian đánh giá. Sự hài lòng của ' +
        'khách hàng là động lực to lớn để Hasaki ngày càng phát triển hơn nữa về chất lượng dịch vụ. Cảm ơn bạn đã tin tưởng và mua sắm tại Hasaki.',
      time: '1549312452000',
    },
  ]);

  // React.useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const res = await fetch(
  //         "http://localhost:3000/products?page=0&size=10"
  //       );
  //       const jsonData = await res.json();
  //       setReviews(jsonData.items);
  //     } catch (error) {
  //       console.error("error fetching reviews", error);
  //     }
  //   };

  //   fetchReviews();
  // }, []);

  return (
    <Card className="!w-full shadow-xl rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Đánh giá</h2>

      <div className="text-gray-500 dark:text-gray-400">
        Đánh giá trung bình
      </div>

      <div className="flex gap-10 mb-6">
        <div className="flex flex-col items-center">
          <span className="text-6xl font-bold">{averageRating}</span>
          <Rate allowHalf disabled defaultValue={averageRating} />
          <p className="text-gray-500">{totalReviews} nhận xét</p>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {ratingData.map((item) => (
            <div key={item.star} className="flex items-center gap-2">
              <span>{item.star} sao</span>
              <Progress
                percent={(item.count / totalReviews) * 100}
                showInfo={false}
                strokeColor={tokenCustomer.colorTextBase}
                className="w-48"
              />
              <span className="text-sm text-gray-600">
                {item.star === 5
                  ? 'Rất hài lòng'
                  : item.star === 4
                  ? 'Hài lòng'
                  : ''}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-gray-500 dark:text-gray-400">
            Chia sẻ nhận xét của bạn về sản phẩm này
          </div>

          <Button type="primary">Viết Bình luận</Button>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mb-4">
        <p className="font-medium">{totalReviews} bình luận cho sản phẩm này</p>
        <Select defaultValue="Ngày đánh giá">
          <Option value="recent">Ngày đánh giá</Option>
          <Option value="top">Đánh giá cao</Option>
        </Select>
      </div>

      {reviews.map((reviewItem, index) => (
        <ReviewItem key={index} reviewItem={reviewItem} />
      ))}

      <div className="flex justify-center mt-6">
        <Pagination defaultCurrent={1} total={13 * 10} pageSize={10} />
      </div>
    </Card>
  );
}
