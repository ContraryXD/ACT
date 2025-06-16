"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Form, Input, Button, Typography, message, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function AdminLogin() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message: messageApi } = App.useApp();

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const result = await response.json();

      // Store token in localStorage
      localStorage.setItem("admin_token", result.token);
      localStorage.setItem("admin_user", JSON.stringify(result.user));

      messageApi.success("Đăng nhập thành công!");
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      messageApi.error(error.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <App>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
            <div className="text-center mb-8">
              <Title level={2} className="text-gray-800 mb-2">
                ACT Admin
              </Title>
              <Text type="secondary">Đăng nhập vào hệ thống quản trị</Text>
            </div>

            <Form form={form} name="admin-login" onFinish={handleLogin} layout="vertical" size="large" requiredMark={false}>
              <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
                <Input prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" autoComplete="username" />
              </Form.Item>

              <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" autoComplete="current-password" />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button type="primary" htmlType="submit" loading={loading} className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700">
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 text-center">
              <Text type="secondary" className="text-sm">
                Chỉ dành cho quản trị viên hệ thống ACT
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </App>
  );
}
