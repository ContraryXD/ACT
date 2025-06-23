"use client";
import { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Table, Tag, Typography, Space, Button } from "antd";
import { UserOutlined, ProjectOutlined, CustomerServiceOutlined, FileTextOutlined, ContactsOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import { servicesAPI, projectsAPI, newsAPI, contactsAPI } from "@/services/services";

const { Title, Text } = Typography;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    news: 0,
    contacts: 0,
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | ACT Admin";
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load statistics
      const [servicesData, projectsData, newsData, contactsData] = await Promise.all([servicesAPI.getAll(), projectsAPI.getAll(), newsAPI.getPublished(), contactsAPI.getAll()]);

      setStats({
        services: servicesData.data?.length || 0,
        projects: projectsData.data?.length || 0,
        news: newsData.data?.length || 0,
        contacts: contactsData.data?.length || 0,
      });

      // Set recent data
      setRecentContacts(contactsData.data?.slice(0, 5) || []);
      setRecentProjects(projectsData.data?.slice(0, 5) || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactColumns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chủ đề",
      dataIndex: "subject",
      key: "subject",
      render: (text) => (text?.length > 30 ? `${text.substring(0, 30)}...` : text),
    },
    {
      title: "Trạng thái",
      dataIndex: "is_read",
      key: "is_read",
      render: (isRead) => <Tag color={isRead ? "green" : "orange"}>{isRead ? "Đã đọc" : "Chưa đọc"}</Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small">
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  const projectColumns = [
    {
      title: "Tên dự án",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khách hàng",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "completed" ? "green" : "blue"}>{status === "completed" ? "Hoàn thành" : "Đang thực hiện"}</Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link href={`/admin/projects/${record.id}`}>
            <Button type="text" icon={<EditOutlined />} size="small">
              Sửa
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Title level={2}>Dashboard</Title>
        <Text type="secondary">Tổng quan hệ thống quản trị ACT</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Dịch vụ" value={stats.services} prefix={<CustomerServiceOutlined />} valueStyle={{ color: "#1890ff" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Dự án" value={stats.projects} prefix={<ProjectOutlined />} valueStyle={{ color: "#52c41a" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Tin tức" value={stats.news} prefix={<FileTextOutlined />} valueStyle={{ color: "#faad14" }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Liên hệ" value={stats.contacts} prefix={<ContactsOutlined />} valueStyle={{ color: "#f5222d" }} />
          </Card>
        </Col>
      </Row>

      {/* Recent Data Tables */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="Liên hệ gần đây"
            extra={
              <Link href="/admin/contacts">
                <Button type="text" size="small">
                  Xem tất cả
                </Button>
              </Link>
            }
          >
            <Table columns={contactColumns} dataSource={recentContacts} rowKey="id" pagination={false} size="small" loading={loading} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Dự án gần đây"
            extra={
              <Link href="/admin/projects">
                <Button type="text" size="small">
                  Xem tất cả
                </Button>
              </Link>
            }
          >
            <Table columns={projectColumns} dataSource={recentProjects} rowKey="id" pagination={false} size="small" loading={loading} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
