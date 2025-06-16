"use client";
import { useState, useEffect } from "react";
import { Typography, Tag, Space, Button, message, Spin, Divider } from "antd";
import { CalendarOutlined, UserOutlined, ArrowLeftOutlined, ShareAltOutlined } from "@ant-design/icons";
import { newsAPI } from "@/services/services";
import BreadCrumb from "@/components/BreadCrumb";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const { Title, Text, Paragraph } = Typography;

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  const breadcrumbItems = [{ title: "Trang chủ", href: "/" }, { title: "Tin tức", href: "/News" }, { title: news?.title || "Chi tiết tin tức" }];
  useEffect(() => {
    const loadData = async () => {
      if (!params.slug) return;

      try {
        setLoading(true);
        const { data, error } = await newsAPI.getBySlug(params.slug);

        if (error) {
          message.error("Không thể tải chi tiết tin tức");
          return;
        }

        setNews(data);

        // Load related news
        try {
          const { data: relatedData, error: relatedError } = await newsAPI.getPublished(4);
          if (!relatedError && relatedData) {
            const filtered = relatedData.filter((item) => item.slug !== params.slug);
            setRelatedNews(filtered.slice(0, 3));
          }
        } catch (error) {
          console.error("Error loading related news:", error);
        }
      } catch (error) {
        console.error("Error loading news detail:", error);
        message.error("Có lỗi xảy ra khi tải tin tức");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      message.success("Đã sao chép link vào clipboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BreadCrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Spin size="large" />
            <div className="mt-4">
              <Text>Đang tải tin tức...</Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BreadCrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Title level={3} type="secondary">
              Không tìm thấy tin tức
            </Title>
            <Paragraph type="secondary">Tin tức không tồn tại hoặc đã bị xóa</Paragraph>
            <Link href="/News">
              <Button type="primary" icon={<ArrowLeftOutlined />}>
                Quay lại danh sách tin tức
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/News">
            <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách tin tức</Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {" "}
          {/* Featured Image */}
          {news.thumbnail && (
            <div className="relative h-96">
              <Image src={news.thumbnail} alt={news.title} fill className="object-cover" />
            </div>
          )}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <Title level={1} className="text-3xl font-bold text-gray-800 mb-4">
                {news.title}
              </Title>

              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <Space wrap>
                  <Space>
                    <CalendarOutlined />
                    <Text type="secondary">{formatDate(news.published_at)}</Text>
                  </Space>
                  {news.users?.full_name && (
                    <Space>
                      <UserOutlined />
                      <Text type="secondary">{news.users.full_name}</Text>
                    </Space>
                  )}
                  {news.category && <Tag color="blue">{news.category}</Tag>}
                </Space>

                <Button icon={<ShareAltOutlined />} onClick={handleShare}>
                  Chia sẻ
                </Button>
              </div>

              {news.summary && <Paragraph className="text-lg text-gray-600 font-medium leading-relaxed">{news.summary}</Paragraph>}
            </div>

            <Divider />

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: news.content }} className="text-gray-700 leading-relaxed" />
            </div>

            {news.tags && (
              <>
                <Divider />
                <div>
                  <Text strong>Tags: </Text>
                  <Space wrap>
                    {news.tags.split(",").map((tag, index) => (
                      <Tag key={index} color="geekblue">
                        {tag.trim()}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-12">
            <Title level={2} className="text-2xl font-bold text-gray-800 mb-6">
              Tin tức liên quan
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <Link key={item.id} href={`/News/${item.slug || item.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {" "}
                    {item.thumbnail ? (
                      <div className="relative h-48">
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <CalendarOutlined className="text-4xl text-white" />
                      </div>
                    )}
                    <div className="p-4">
                      <Title level={4} className="text-gray-800 line-clamp-2 mb-2">
                        {item.title}
                      </Title>
                      <Text type="secondary" className="text-sm">
                        {formatDate(item.published_at)}
                      </Text>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
