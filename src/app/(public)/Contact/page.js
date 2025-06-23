"use client";
import { useState, useEffect } from "react";
import { Form, Input, Button, Card, Row, Col, Typography, Space, message, Divider } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined, SendOutlined } from "@ant-design/icons";
import { contactsAPI } from "@/services/services";
import BreadCrumb from "@/components/BreadCrumb";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Liên hệ | ACT Telecommunications";
  }, []);

  const breadcrumbItems = [{ title: "Trang chủ", href: "/" }, { title: "Liên hệ" }];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data, error } = await contactsAPI.create(values);

      if (error) {
        message.error("Không thể gửi liên hệ. Vui lòng thử lại!");
        return;
      }

      message.success("Gửi liên hệ thành công! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting contact:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <EnvironmentOutlined className="text-2xl text-blue-600" />,
      title: "Địa chỉ",
      content: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    },
    {
      icon: <PhoneOutlined className="text-2xl text-green-600" />,
      title: "Điện thoại",
      content: "+84 (28) 1234 5678",
    },
    {
      icon: <MailOutlined className="text-2xl text-orange-600" />,
      title: "Email",
      content: "contact@act.vn",
    },
    {
      icon: <ClockCircleOutlined className="text-2xl text-purple-600" />,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 6: 8:00 - 17:30\nThứ 7: 8:00 - 12:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
            Liên hệ với chúng tôi
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi để được tư vấn tốt nhất.</Paragraph>
        </div>

        <Row gutter={[32, 32]}>
          {/* Contact Information */}
          <Col xs={24} lg={8}>
            <Card className="h-full">
              <Title level={3} className="text-center mb-6">
                Thông tin liên hệ
              </Title>

              <Space direction="vertical" size="large" className="w-full">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{info.icon}</div>
                    <div>
                      <Text strong className="block mb-1">
                        {info.title}
                      </Text>
                      <Text type="secondary" className="whitespace-pre-line">
                        {info.content}
                      </Text>
                    </div>
                  </div>
                ))}
              </Space>

              <Divider />

              <div className="text-center">
                <Title level={4}>Theo dõi chúng tôi</Title>
                <Space size="large">
                  <Button type="primary" shape="circle" size="large" style={{ backgroundColor: "#1877f2" }}>
                    F
                  </Button>
                  <Button type="primary" shape="circle" size="large" style={{ backgroundColor: "#1da1f2" }}>
                    T
                  </Button>
                  <Button type="primary" shape="circle" size="large" style={{ backgroundColor: "#0077b5" }}>
                    L
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col xs={24} lg={16}>
            <Card>
              <Title level={3} className="text-center mb-6">
                Gửi tin nhắn cho chúng tôi
              </Title>

              <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ tên!" },
                        { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
                      ]}
                    >
                      <Input placeholder="Nhập họ và tên của bạn" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                      ]}
                    >
                      <Input placeholder="your.email@example.com" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ pattern: /^[0-9+\-\s()]+$/, message: "Số điện thoại không hợp lệ!" }]}>
                      <Input placeholder="Số điện thoại của bạn" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item name="subject" label="Chủ đề" rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}>
                      <Input placeholder="Chủ đề liên hệ" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="message"
                  label="Nội dung"
                  rules={[
                    { required: true, message: "Vui lòng nhập nội dung!" },
                    { min: 10, message: "Nội dung phải có ít nhất 10 ký tự!" },
                  ]}
                >
                  <TextArea rows={6} placeholder="Nhập nội dung chi tiết về yêu cầu của bạn..." />
                </Form.Item>

                <Form.Item className="text-center">
                  <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />} size="large" className="px-8">
                    Gửi liên hệ
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <Title level={3} className="text-center mb-6">
              Vị trí của chúng tôi
            </Title>
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <EnvironmentOutlined className="text-6xl text-gray-400 mb-4" />
                <Text type="secondary" className="text-lg">
                  Bản đồ Google Maps sẽ được tích hợp tại đây
                </Text>
                <br />
                <Text type="secondary">123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
