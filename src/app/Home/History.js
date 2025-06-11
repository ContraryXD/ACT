"use client";

import Image from "next/image";
import { Col, Row, Button } from "antd";

export default function History() {
  return (
    <>
      <section className="history">
        <div className="container mx-auto max-w-[1200px]">
          <Row gutter={[15, 0]}>
            <Col xl={12}>
              <div className="history__photo">
                <Image src="/assets/images/home_2-1.jpg" alt="homeImage1" width={500} height={500} />
                <Image src="/assets/images/home_2-2.png" alt="homeImage2" width={500} height={500} />
              </div>
            </Col>
            <Col xl={12}>
              <div className="history__content">
                <div className="history__content--head">
                  <h1>
                    {" "}
                    TỪ NĂM <span>2011</span>
                  </h1>
                </div>
                <h2>
                  Chúng tôi có <span>20+</span> năm kinh nghiệm
                </h2>
                <p className="para1">Công ty Cổ phần Viễn thông ACT thành lập ngày 21 tháng 11 năm 2011; Hoạt động trên phạm vi toàn quốc, với các lĩnh vực kinh doanh thuộc ngành viễn thông như: Thiết kế hạ tầng viễn thông; Cho thuê hạ tầng viễn thông cáp quang; Thi công công trình viễn thông; Dịch vụ quản lý vận hành hạ tầng viễn thông; Cung cấp thiết bị truyền hình số; Cung cấp hàng hóa, thiết bị viễn thông; Cung cấp sản phẩm và giải pháp CNTT…</p>
                <p className="para2">Với phương châm đặt chất lượng dịch vụ lên hàng đầu, cùng với sự tận tâm và trách nhiệm, chúng tôi hoàn toàn tin tưởng sẽ đáp ứng được sự kỳ vọng của Quý Khách hàng một cách tốt nhất.</p>
                <button className="history__btn btn btn-blue">Về Chúng Tôi</button>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}
