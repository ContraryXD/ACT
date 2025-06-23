"use client";
import { useState, useEffect } from "react";
import { Table, Card, Tag, Button, Space, Modal, Typography, message, Drawer, Form, Input, Select, Switch, DatePicker, InputNumber } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined, FileTextOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { newsAPI } from "@/services/services";
import ImageUpload from "@/components/Admin/ImageUpload";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    document.title = "Quản lý tin tức | ACT Admin";
  }, []);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await newsAPI.getAll();

      if (error) {
        message.error("Không thể tải danh sách tin tức");
        return;
      }

      setNews(data || []);
    } catch (error) {
      console.error("Error loading news:", error);
      message.error("Có lỗi xảy ra khi tải danh sách tin tức");
    } finally {
      setLoading(false);
    }
  };

  const handleViewNews = (newsItem) => {
    setSelectedNews(newsItem);
    setDrawerVisible(true);
  };

  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem);
    form.setFieldsValue({
      ...newsItem,
      published_at: newsItem.published_at ? dayjs(newsItem.published_at) : null,
      tags: newsItem.tags || [],
    });
    setModalVisible(true);
  };

  const handleAddNews = () => {
    setEditingNews(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleDeleteNews = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa bài viết này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          const { error } = await newsAPI.delete(id);
          if (error) {
            message.error("Không thể xóa bài viết");
            return;
          }
          message.success("Đã xóa bài viết thành công");
          loadNews();
        } catch (error) {
          message.error("Không thể xóa bài viết");
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      const newsData = {
        ...values,
        published_at: values.published_at ? values.published_at.format("YYYY-MM-DD HH:mm:ss") : null,
        tags: values.tags || [],
        slug:
          values.title
            ?.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-") || "",
      };

      if (editingNews) {
        const { error } = await newsAPI.update(editingNews.id, newsData);
        if (error) {
          message.error("Không thể cập nhật bài viết");
          return;
        }
        message.success("Đã cập nhật bài viết thành công");
      } else {
        const { error } = await newsAPI.create(newsData);
        if (error) {
          message.error("Không thể tạo bài viết");
          return;
        }
        message.success("Đã tạo bài viết thành công");
      }

      setModalVisible(false);
      loadNews();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => (text?.length > 50 ? `${text.substring(0, 50)}...` : text),
    },
    {
      title: "Trạng thái",
      dataIndex: "is_published",
      key: "is_published",
      render: (isPublished) => (
        <Tag color={isPublished ? "green" : "orange"} icon={isPublished ? <FileTextOutlined /> : <EyeInvisibleOutlined />}>
          {isPublished ? "Đã xuất bản" : "Nháp"}
        </Tag>
      ),
      filters: [
        { text: "Đã xuất bản", value: true },
        { text: "Nháp", value: false },
      ],
      onFilter: (value, record) => record.is_published === value,
    },
    {
      title: "Ngày xuất bản",
      dataIndex: "published_at",
      key: "published_at",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
      sorter: (a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0),
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      render: (views) => views || 0,
      sorter: (a, b) => (b.views || 0) - (a.views || 0),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <div>
          {tags?.slice(0, 2).map((tag, index) => (
            <Tag key={index} color="blue" size="small">
              {tag}
            </Tag>
          ))}
          {tags?.length > 2 && <span>+{tags.length - 2}</span>}
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleViewNews(record)}>
            Xem
          </Button>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEditNews(record)}>
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteNews(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Title level={2}>Quản lý Tin tức</Title>
          <Text type="secondary">Danh sách bài viết tin tức</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNews}>
          Thêm bài viết
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={news}
          rowKey="id"
          loading={loading}
          pagination={{
            total: news.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bài viết`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* View News Drawer */}
      <Drawer title="Chi tiết bài viết" placement="right" width={600} onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {selectedNews && (
          <div className="space-y-4">
            <div>
              <Text strong>Thông tin cơ bản:</Text>
              <div className="mt-2 space-y-2">
                <div>
                  <Text strong className="w-32 inline-block">
                    Tiêu đề:
                  </Text>
                  <Text>{selectedNews.title}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Slug:
                  </Text>
                  <Text type="secondary">{selectedNews.slug}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Trạng thái:
                  </Text>
                  <Tag color={selectedNews.is_published ? "green" : "orange"}>{selectedNews.is_published ? "Đã xuất bản" : "Nháp"}</Tag>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Lượt xem:
                  </Text>
                  <Text>{selectedNews.views || 0}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Xuất bản:
                  </Text>
                  <Text>{selectedNews.published_at ? dayjs(selectedNews.published_at).format("DD/MM/YYYY HH:mm") : "Chưa xuất bản"}</Text>
                </div>
              </div>
            </div>

            {selectedNews.excerpt && (
              <div>
                <Text strong>Tóm tắt:</Text>
                <Paragraph className="mt-2">{selectedNews.excerpt}</Paragraph>
              </div>
            )}

            {selectedNews.content && (
              <div>
                <Text strong>Nội dung:</Text>
                <Paragraph className="mt-2 p-3 bg-gray-50 rounded max-h-60 overflow-y-auto">{selectedNews.content}</Paragraph>
              </div>
            )}

            {selectedNews.tags && selectedNews.tags.length > 0 && (
              <div>
                <Text strong>Tags:</Text>
                <div className="mt-2">
                  {selectedNews.tags.map((tag, index) => (
                    <Tag key={index} color="blue">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Text strong>Thông tin khác:</Text>
              <div className="mt-2 space-y-1">
                <div>
                  <Text type="secondary">Ngày tạo: </Text>
                  <Text>{dayjs(selectedNews.created_at).format("DD/MM/YYYY HH:mm")}</Text>
                </div>
                <div>
                  <Text type="secondary">Cập nhật: </Text>
                  <Text>{dayjs(selectedNews.updated_at).format("DD/MM/YYYY HH:mm")}</Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add/Edit News Modal */}
      <Modal title={editingNews ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={900}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>
          <Form.Item name="excerpt" label="Tóm tắt">
            <TextArea rows={3} placeholder="Nhập tóm tắt bài viết" />
          </Form.Item>
          <Form.Item name="content" label="Nội dung">
            <TextArea rows={10} placeholder="Nhập nội dung bài viết" />
          </Form.Item>{" "}
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Form.Item name="thumbnail" label="Ảnh đại diện">
              <ImageUpload />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="tags" label="Tags">
              <Select mode="tags" placeholder="Nhập tags (có thể thêm nhiều)" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="published_at" label="Ngày xuất bản">
              <DatePicker showTime style={{ width: "100%" }} placeholder="Chọn ngày xuất bản" />
            </Form.Item>

            <Form.Item name="is_published" label="Xuất bản ngay" valuePropName="checked">
              <Switch checkedChildren="Xuất bản" unCheckedChildren="Nháp" />
            </Form.Item>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setModalVisible(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {editingNews ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
