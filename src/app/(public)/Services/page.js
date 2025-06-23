"use client";

import { useState, useEffect } from "react";
import BreadCrumb from "@/components/Common/BreadCrumb";
import Image from "next/image";
import { Row, Col, Card, Typography, Space, Form, Input, Button, App, Spin } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";
import { servicesAPI } from "@/services/services";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function Services() {
  const title = "Dịch vụ";
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { message } = App.useApp();

  useEffect(() => {
    // Set page title
    document.title = "Dịch vụ | ACT Telecommunications";
  }, []);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await servicesAPI.getAll();

      if (error) {
        setError(error);
        return;
      }

      setServices(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Check if response is ok first
      if (!response.ok) {
        let errorMessage = "Failed to submit contact form";

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          // If JSON parsing fails, use status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }

        throw new Error(errorMessage);
      }

      // Try to parse the success response
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        throw new Error("Invalid response format from server");
      }

      message.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
      form.resetFields();
    } catch (err) {
      console.error("Contact form error:", err);
      message.error(err.message || "Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <BreadCrumb title={title} breadcrumbImg="/assets/images/services_banner.jpg" />
      {/* Services Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {" "}
          <div className="text-center mb-12">
            <Title level={1} className="text-4xl font-bold text-black mb-4 font-serif">
              Lĩnh vực kinh doanh
            </Title>
          </div>
        </div>
      </section>{" "}
      {/* Services Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 space-y-16">
          {loading ? (
            <div className="text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Đang tải dịch vụ...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Lỗi: {error}</p>
              <Button onClick={loadServices} type="primary">
                Thử lại
              </Button>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Không có dịch vụ nào để hiển thị.</p>
            </div>
          ) : (
            services.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={service.id} className="">
                  <Card className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300" styles={{ body: { padding: 30 } }}>
                    <Row className="min-h-[250px]" gutter={0}>
                      {/* Content Column - 2/3 width */}
                      <Col xs={24} md={16} className={`flex items-center ${isEven ? "md:order-1" : "md:order-2"}`}>
                        <div className="p-6 md:p-8 h-full flex flex-col justify-center">
                          <Title level={2} className="text-blue-900 font-bold mb-4 text-xl md:text-2xl">
                            {service.title}
                          </Title>
                          <Paragraph className="text-gray-700 text-base leading-relaxed">{service.description}</Paragraph>
                        </div>
                      </Col>
                      {/* Image Column - 1/3 width */}
                      <Col xs={24} md={8} className={`${isEven ? "md:order-2" : "md:order-1"}`}>
                        <div className="h-full min-h-[200px] md:min-h-[250px] relative overflow-hidden">
                          <div className="absolute inset-0 transform transition-transform duration-500 hover:scale-105">
                            {service.image_url ? (
                              <Image src={service.image_url} alt={service.title} fill className="object-cover" />
                            ) : (
                              <div className="bg-gray-200 h-full flex items-center justify-center">
                                <span className="text-gray-500">Không có hình ảnh</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              );
            })
          )}
        </div>
      </section>
      {/* Contact Form Section */}
      <section className="py-16 contact-form-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Title level={2} className="text-3xl font-bold text-white mb-4">
                Liên hệ với chúng tôi
              </Title>
              <Paragraph className="text-lg text-gray-200">Bạn cần tư vấn về dịch vụ viễn thông? Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất.</Paragraph>
            </div>

            <Card className="shadow-lg rounded-lg px-10">
              <Form form={form} name="contact" onFinish={handleSubmit} layout="vertical" size="large">
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ tên!" },
                        { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
                      ]}
                    >
                      <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Nhập họ và tên của bạn" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                      ]}
                    >
                      <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Nhập địa chỉ email" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ pattern: /^[0-9+\-\s()]+$/, message: "Số điện thoại không hợp lệ!" }]}>
                      <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Nhập số điện thoại (tùy chọn)" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item name="subject" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
                      <Input prefix={<MessageOutlined className="text-gray-400" />} placeholder="Nhập tiêu đề liên hệ" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="message"
                      label="Nội dung"
                      rules={[
                        { required: true, message: "Vui lòng nhập nội dung!" },
                        { min: 10, message: "Nội dung phải có ít nhất 10 ký tự!" },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Nhập nội dung chi tiết về yêu cầu của bạn..." />
                    </Form.Item>
                  </Col>

                  <Col xs={24} className="text-center">
                    <Form.Item>
                      <Button type="primary" htmlType="submit" loading={submitting} size="large" className="bg-blue-900 hover:bg-blue-800 px-8 py-2 h-auto">
                        {submitting ? "Đang gửi..." : "Gửi liên hệ"}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
    </>
  );
}
