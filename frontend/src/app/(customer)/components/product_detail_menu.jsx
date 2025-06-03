'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Menu, Progress, Card } from 'antd';
import { Badge, Descriptions } from 'antd';
import { tokenCustomer } from '@/context/config_provider';
import { StarFilled } from '@ant-design/icons';

const ProductDetailMenu = ({ productDetail }) => {
  const [current, setCurrent] = useState('description');
  const items = [
    {
      label: (
        <a
          href="#description"
          style={{
            color: current == 'description' ? undefined : 'black',
          }}
        >
          Mô tả
        </a>
      ),
      key: 'description',
    },
    {
      label: (
        <a
          href="#detail"
          style={{ color: current == 'detail' ? undefined : 'black' }}
        >
          Thông số
        </a>
      ),
      key: 'detail',
    },
    // {
    //   label: (
    //     <a
    //       href="#review"
    //       style={{ color: current == "review" ? undefined : "black" }}
    //     >
    //       Đánh giá
    //     </a>
    //   ),
    //   key: "review",
    // },
  ];
  const details = [
    {
      key: '1',
      label: 'Barcode',
      children: productDetail.id,
    },
    {
      key: '2',
      label: 'Thương hiệu',
      children: productDetail.brand,
    },
    {
      key: '3',
      label: 'Xuất xứ thương hiệu',
      children: 'Hàn Quốc',
    },
    {
      key: '4',
      label: 'Nơi sản xuất',
      children: 'Korea',
    },
    {
      key: '5',
      label: 'Phiên bản',
      children: productDetail.name,
      span: 2,
    },
  ];
  //   const reviewStats = [
  //     { id: 5, starNo: 5, description: "Rất hài lòng", reviewerNo: 238 },
  //     { id: 4, starNo: 4, description: "Hài lòng", reviewerNo: 56 },
  //     { id: 3, starNo: 3, description: "Bình thường", reviewerNo: 0 },
  //     { id: 2, starNo: 2, description: "Không hài lòng", reviewerNo: 0 },
  //     { id: 1, starNo: 1, description: "Rất tệ", reviewerNo: 0 },
  //   ];

  const descriptionRef = useRef(null);
  const detailRef = useRef(null);

  const handleScroll = () => {
    const descriptionTop =
      descriptionRef.current?.getBoundingClientRect?.().top;
    const detailTop = detailRef.current?.getBoundingClientRect?.().top;

    if (descriptionTop == null || detailTop == null) {
      return;
    }

    if (detailTop < window.innerHeight / 3) {
      setCurrent('detail');
    } else if (descriptionTop < window.innerHeight / 3) {
      setCurrent('description');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Card className="!w-full shadow-xl rounded-2xl">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          position: 'sticky',
          //   top: 64,
          top: 0,
          zIndex: 1000,
          background: 'white',
        }}
      />

      <div
        id="description"
        ref={descriptionRef}
        style={{
          paddingTop: '20px',
          paddingLeft: '13px',
          lineHeight: 2,
          scrollMarginTop: '80px',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '24px' }}>
          Mô tả sản phẩm
        </div>
        {productDetail.longDescription}
        {/* <div>
          Tinh Chất Klairs Vitamin C Dưỡng Sáng Da, Mờ Thâm 35ml là sản phẩm
          tinh chất đến từ thương hiệu Klairs của Hàn Quốc, tiếp thêm sinh lực
          trẻ hóa làn da với sức mạnh của 5% Vitamin C dạng Acid L-ascorbic nhẹ
          dịu; cùng chiết xuất Rau Má không gây kích ứng nhưng vẫn hiệu quả
          trong việc làm mờ các vết mụn và vết nám, cải thiện làn da xỉn và
          không đều màu.
        </div>
        <div>
          Mặc dù luôn nằm trong danh sách những thành phần “vàng” trong làng
          dưỡng da, là thần dược của những làn da thâm mụn, tối màu nhưng
          Vitamin C cũng thường gây tình trạng kích ứng, bong đỏ đối với nhiều
          làn da, nên nhiều tín đồ skincare dù thích vẫn còn dè chừng. Klairs
          Freshly Juiced Vitamin Drop đã được kiểm tra lâm sàng về độ an toàn,
          lành tính kể cả đối với làn da nhạy cảm.
        </div>
        <div>
          2025 là một năm thành công đối với sản phẩm Tinh Chất Vitamin C Dưỡng
          Sáng Da, Mờ Thâm Klairs Freshly Juiced Vitamin Drop, khi được hàng
          triệu khách hàng đón nhận và đạt được rất nhiều thành tựu, giải thưởng
          không chỉ ở Hàn Quốc mà còn ở các thị trường khác trên toàn cầu.
        </div> */}
      </div>

      <hr style={{ margin: '50px 0px' }} />

      <div
        id="detail"
        ref={detailRef}
        style={{
          paddingLeft: '13px',
          scrollMarginTop: '80px',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '24px' }}>Thông số</div>
        <Descriptions Info bordered items={details} column={1} />
      </div>

      {/* <div
        id="review"
        ref={reviewRef}
        style={{ paddingLeft: "13px", scrollMarginTop: "80px" }}
      >
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>Đánh giá</div>

        <div>Đánh giá trung bình</div>

        <Row>
          <Col span={8} align="middle">
            <div
              style={{
                fontSize: "80px",
                fontWeight: "bold",
                color: tokenCustomer["colorTextBase"],
              }}
            >
              4.8
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: tokenCustomer["colorTextBase"],
              }}
            >
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
            <div style={{ marginTop: "10px" }}>294 nhận xét</div>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "28px",
            }}
          >
            <Col span={5} align="middle">
              {reviewStats.map((item) => (
                <div style={{ marginBottom: "10px" }}>{item.starNo} sao</div>
              ))}
            </Col>
            <Col span={6}>
              {reviewStats.map((item) => (
                <Progress
                  percent={(item.reviewerNo / 294) * 100}
                  showInfo={false}
                  style={{ marginBottom: "10px" }}
                />
              ))}
            </Col>
            <Col span={3} align="middle">
              {reviewStats.map((item) => (
                <div style={{ color: "#a3a0a1", marginBottom: "10px" }}>
                  {item.reviewerNo}
                </div>
              ))}
            </Col>
            <Col span={8}>
              {reviewStats.map((item) => (
                <div style={{ color: "#a3a0a1", marginBottom: "10px" }}>
                  {item.description}
                </div>
              ))}
            </Col>
          </Col>
          <Col span={8}>Viết bình luận....</Col>
        </Row>
      </div> */}
    </Card>
  );
};

export default ProductDetailMenu;
