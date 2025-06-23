"use client";
import { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Tag, Button, Space, Pagination, Input, Select, message, Spin } from "antd";
import { CalendarOutlined, UserOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { newsAPI } from "@/services/services";
import BreadCrumb from "@/components/BreadCrumb";
import Link from "next/link";
import Image from "next/image";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    document.title = "Tin tức | ACT Telecommunications";
  }, []);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const pageSize = 9;

  const breadcrumbItems = [{ title: "Trang chủ", href: "/" }, { title: "Tin tức" }];

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await newsAPI.getPublished();

      if (error) {
        message.error("Không thể tải danh sách tin tức");
        return;
      }

      setNews(data || []);
    } catch (error) {
      console.error("Error loading news:", error);
      message.error("Có lỗi xảy ra khi tải tin tức");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort news
  const filteredNews = news
    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.summary?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.published_at) - new Date(a.published_at);
        case "oldest":
          return new Date(a.published_at) - new Date(b.published_at);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.published_at) - new Date(a.published_at);
      }
    });

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
            Tin tức & Sự kiện
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">Cập nhật những tin tức mới nhất về công ty, ngành viễn thông và các sự kiện quan trọng</Paragraph>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search placeholder="Tìm kiếm tin tức..." allowClear enterButton={<SearchOutlined />} size="large" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={(value) => setSearchTerm(value)} />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select size="large" value={sortBy} onChange={setSortBy} style={{ width: "100%" }}>
                <Option value="latest">Mới nhất</Option>
                <Option value="oldest">Cũ nhất</Option>
                <Option value="title">Theo tên</Option>
              </Select>
            </Col>
            <Col xs={24} md={12}>
              <Text type="secondary">Tìm thấy {filteredNews.length} tin tức</Text>
            </Col>
          </Row>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <div className="mt-4">
              <Text>Đang tải tin tức...</Text>
            </div>
          </div>
        ) : (
          <>
            {/* News Grid */}
            {currentNews.length > 0 ? (
              <Row gutter={[24, 24]} className="mb-8">
                {currentNews.map((item) => (
                  <Col key={item.id} xs={24} sm={12} lg={8}>
                    <Card
                      hoverable
                      cover={
                        item.thumbnail ? (
                          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                            <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <EyeOutlined className="text-4xl text-white" />
                          </div>
                        )
                      }
                      actions={[
                        <Link key="view" href={`/News/${item.slug || item.id}`}>
                          <Button type="primary" icon={<EyeOutlined />}>
                            Xem chi tiết
                          </Button>
                        </Link>,
                      ]}
                      className="h-full"
                    >
                      <Card.Meta
                        title={
                          <Link href={`/News/${item.slug || item.id}`}>
                            <Title level={4} className="text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                              {item.title}
                            </Title>
                          </Link>
                        }
                        description={
                          <div>
                            <Paragraph className="text-gray-600 mb-3">{truncateText(item.summary || item.content)}</Paragraph>
                            <Space direction="vertical" size="small" className="w-full">
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <Space>
                                  <CalendarOutlined />
                                  <Text type="secondary">{formatDate(item.published_at)}</Text>
                                </Space>
                                {item.author && (
                                  <Space>
                                    <UserOutlined />
                                    <Text type="secondary">{item.author}</Text>
                                  </Space>
                                )}
                              </div>
                              {item.category && <Tag color="blue">{item.category}</Tag>}
                            </Space>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-12">
                <EyeOutlined className="text-6xl text-gray-300 mb-4" />
                <Title level={3} type="secondary">
                  Không tìm thấy tin tức
                </Title>
                <Paragraph type="secondary">{searchTerm ? "Thử tìm kiếm với từ khóa khác" : "Chưa có tin tức nào được công bố"}</Paragraph>
              </div>
            )}

            {/* Pagination */}
            {filteredNews.length > pageSize && (
              <div className="text-center">
                <Pagination current={currentPage} total={filteredNews.length} pageSize={pageSize} showSizeChanger={false} showQuickJumper showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} tin tức`} onChange={(page) => setCurrentPage(page)} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
