"use client";

import BreadCrumb from "@/components/Common/BreadCrumb";
import Image from "next/image";
import { Row, Col, Card, Typography, Space } from "antd";
import ServiceItems from "@/data/services";

const { Title, Paragraph } = Typography;

export default function Services() {
  const title = "Dịch vụ";

  return (
    <>
      <BreadCrumb title={title} breadcrumbImg="/assets/images/services_banner.jpg" />

      {/* Services Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Title level={1} className="text-4xl font-bold text-black mb-4">
              Dịch vụ của chúng tôi
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">Công ty Cổ phần Viễn thông ACT cung cấp đa dạng các dịch vụ viễn thông chuyên nghiệp, từ thiết kế và thi công hạ tầng viễn thông đến quản lý vận hành và cung cấp giải pháp CNTT toàn diện.</Paragraph>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <Row gutter={[32, 32]} justify="center">
            {ServiceItems.map((service, index) => (
              <Col key={service.key} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  className="h-full shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  cover={<div className="h-64 overflow-hidden">{service.icon}</div>}
                  bodyStyle={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    height: "200px",
                  }}
                >
                  <Space direction="vertical" size="middle" className="flex-1">
                    <Title level={4} className="text-blue-900 font-bold mb-3 text-center">
                      {service.title}
                    </Title>
                    <Paragraph className="text-gray-600 text-sm leading-relaxed flex-1">{service.content}</Paragraph>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-900">
        <div className="container mx-auto px-6 text-center">
          <Title level={2} className="text-white mb-4">
            Cần hỗ trợ dịch vụ viễn thông?
          </Title>
          <Paragraph className="text-white text-lg mb-8 max-w-2xl mx-auto">Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết cho các dịch vụ viễn thông phù hợp với nhu cầu của bạn.</Paragraph>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">Liên hệ ngay</button>
        </div>
      </section>
    </>
  );
}
