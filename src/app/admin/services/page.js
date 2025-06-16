"use client";
import { useState, useEffect } from "react";
import { Table, Card, Button, Space, Modal, Form, Input, Switch, message, Drawer, Typography } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { servicesAPI, adminAPI } from "@/services/services";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await adminAPI.services.getAll();

      if (error) {
        message.error("Không thể tải danh sách dịch vụ");
        return;
      }

      setServices(data || []);
    } catch (error) {
      console.error("Error loading services:", error);
      message.error("Có lỗi xảy ra khi tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingService(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setModalVisible(true);
  };

  const handleView = (service) => {
    setSelectedService(service);
    setDrawerVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa dịch vụ này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          const { error } = await adminAPI.services.delete(id);
          if (error) {
            message.error("Không thể xóa dịch vụ");
            return;
          }
          message.success("Đã xóa dịch vụ thành công");
          loadServices();
        } catch (error) {
          message.error("Không thể xóa dịch vụ");
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (editingService) {
        const { error } = await adminAPI.services.update(editingService.id, values);
        if (error) {
          message.error("Không thể cập nhật dịch vụ");
          return;
        }
        message.success("Đã cập nhật dịch vụ thành công");
      } else {
        const { error } = await adminAPI.services.create(values);
        if (error) {
          message.error("Không thể tạo dịch vụ");
          return;
        }
        message.success("Đã tạo dịch vụ thành công");
      }

      setModalVisible(false);
      loadServices();
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
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => (text?.length > 100 ? `${text.substring(0, 100)}...` : text),
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => <Switch checked={isActive} disabled />,
    },
    {
      title: "Thứ tự",
      dataIndex: "order_index",
      key: "order_index",
      sorter: (a, b) => a.order_index - b.order_index,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleView(record)}>
            Xem
          </Button>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2}>Quản lý Dịch vụ</Title>
          <Text type="secondary">Danh sách các dịch vụ của công ty</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Thêm dịch vụ
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={services}
          rowKey="id"
          loading={loading}
          pagination={{
            total: services.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} dịch vụ`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal title={editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"} open={modalVisible} onCancel={() => setModalVisible(false)} onOk={() => form.submit()} width={800}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
            <Input placeholder="Nhập tiêu đề dịch vụ" />
          </Form.Item>

          <Form.Item name="slug" label="Slug" rules={[{ required: true, message: "Vui lòng nhập slug!" }]}>
            <Input placeholder="Nhập slug (URL-friendly)" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả ngắn">
            <TextArea rows={3} placeholder="Nhập mô tả ngắn" />
          </Form.Item>

          <Form.Item name="content" label="Nội dung chi tiết">
            <TextArea rows={6} placeholder="Nhập nội dung chi tiết" />
          </Form.Item>

          <Form.Item name="image" label="URL hình ảnh">
            <Input placeholder="Nhập URL hình ảnh" />
          </Form.Item>

          <Form.Item name="order_index" label="Thứ tự hiển thị">
            <Input type="number" placeholder="Nhập thứ tự" />
          </Form.Item>

          <Form.Item name="is_active" label="Kích hoạt" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Drawer */}
      <Drawer title="Chi tiết dịch vụ" placement="right" width={600} onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {selectedService && (
          <div className="space-y-4">
            <div>
              <Text strong>Tiêu đề:</Text>
              <p>{selectedService.title}</p>
            </div>
            <div>
              <Text strong>Slug:</Text>
              <p>{selectedService.slug}</p>
            </div>
            <div>
              <Text strong>Mô tả:</Text>
              <p>{selectedService.description}</p>
            </div>
            <div>
              <Text strong>Nội dung:</Text>
              <div className="p-3 bg-gray-50 rounded">{selectedService.content}</div>
            </div>
            <div>
              <Text strong>Trạng thái:</Text>
              <p>{selectedService.is_active ? "Đang hoạt động" : "Không hoạt động"}</p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
