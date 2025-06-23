"use client";
import { useState, useEffect } from "react";
import { Table, Card, Tag, Button, Space, Modal, Typography, message, Drawer, Form, Input, Select, DatePicker, Switch, Upload, Image } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { projectsAPI } from "@/services/services";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    document.title = "Quản lý dự án | ACT Admin";
  }, []);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await projectsAPI.getAll();

      if (error) {
        message.error("Không thể tải danh sách dự án");
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);
      message.error("Có lỗi xảy ra khi tải danh sách dự án");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setDrawerVisible(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    form.setFieldsValue({
      ...project,
      start_date: project.start_date ? dayjs(project.start_date) : null,
      end_date: project.end_date ? dayjs(project.end_date) : null,
      technologies: project.technologies || [],
      images: project.images || [],
    });
    setModalVisible(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleDeleteProject = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa dự án này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          const { error } = await projectsAPI.delete(id);
          if (error) {
            message.error("Không thể xóa dự án");
            return;
          }
          message.success("Đã xóa dự án thành công");
          loadProjects();
        } catch (error) {
          message.error("Không thể xóa dự án");
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      const projectData = {
        ...values,
        start_date: values.start_date ? values.start_date.format("YYYY-MM-DD") : null,
        end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
        technologies: values.technologies || [],
        images: values.images || [],
      };

      if (editingProject) {
        const { error } = await projectsAPI.update(editingProject.id, projectData);
        if (error) {
          message.error("Không thể cập nhật dự án");
          return;
        }
        message.success("Đã cập nhật dự án thành công");
      } else {
        const { error } = await projectsAPI.create(projectData);
        if (error) {
          message.error("Không thể tạo dự án");
          return;
        }
        message.success("Đã tạo dự án thành công");
      }

      setModalVisible(false);
      loadProjects();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "ongoing":
        return "blue";
      case "planning":
        return "orange";
      case "paused":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "ongoing":
        return "Đang thực hiện";
      case "planning":
        return "Lên kế hoạch";
      case "paused":
        return "Tạm dừng";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "Tên dự án",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Khách hàng",
      dataIndex: "client",
      key: "client",
      render: (client) => client || "-",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>,
      filters: [
        { text: "Hoàn thành", value: "completed" },
        { text: "Đang thực hiện", value: "ongoing" },
        { text: "Lên kế hoạch", value: "planning" },
        { text: "Tạm dừng", value: "paused" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Nổi bật",
      dataIndex: "is_featured",
      key: "is_featured",
      render: (isFeatured) => <Tag color={isFeatured ? "gold" : "default"}>{isFeatured ? "Nổi bật" : "Thường"}</Tag>,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleViewProject(record)}>
            Xem
          </Button>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEditProject(record)}>
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteProject(record.id)}>
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
          <Title level={2}>Quản lý Dự án</Title>
          <Text type="secondary">Danh sách các dự án của công ty</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProject}>
          Thêm dự án
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="id"
          loading={loading}
          pagination={{
            total: projects.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} dự án`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* View Project Drawer */}
      <Drawer title="Chi tiết dự án" placement="right" width={600} onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {selectedProject && (
          <div className="space-y-4">
            <div>
              <Text strong>Thông tin cơ bản:</Text>
              <div className="mt-2 space-y-2">
                <div>
                  <Text strong className="w-32 inline-block">
                    Tên dự án:
                  </Text>
                  <Text>{selectedProject.name}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Khách hàng:
                  </Text>
                  <Text>{selectedProject.client || "Không có"}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Trạng thái:
                  </Text>
                  <Tag color={getStatusColor(selectedProject.status)}>{getStatusText(selectedProject.status)}</Tag>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Nổi bật:
                  </Text>
                  <Tag color={selectedProject.is_featured ? "gold" : "default"}>{selectedProject.is_featured ? "Có" : "Không"}</Tag>
                </div>
              </div>
            </div>

            {selectedProject.description && (
              <div>
                <Text strong>Mô tả:</Text>
                <Paragraph className="mt-2">{selectedProject.description}</Paragraph>
              </div>
            )}

            <div>
              <Text strong>Thời gian:</Text>
              <div className="mt-2 space-y-1">
                <div>
                  <Text type="secondary">Bắt đầu: </Text>
                  <Text>{selectedProject.start_date ? dayjs(selectedProject.start_date).format("DD/MM/YYYY") : "Chưa xác định"}</Text>
                </div>
                <div>
                  <Text type="secondary">Kết thúc: </Text>
                  <Text>{selectedProject.end_date ? dayjs(selectedProject.end_date).format("DD/MM/YYYY") : "Chưa xác định"}</Text>
                </div>
              </div>
            </div>

            {selectedProject.technologies && selectedProject.technologies.length > 0 && (
              <div>
                <Text strong>Công nghệ sử dụng:</Text>
                <div className="mt-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <Tag key={index} color="blue">
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.images && selectedProject.images.length > 0 && (
              <div>
                <Text strong>Hình ảnh:</Text>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {selectedProject.images.map((image, index) => (
                    <Image key={index} src={image} alt={`Project image ${index + 1}`} width={200} height={150} style={{ objectFit: "cover" }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Add/Edit Project Modal */}
      <Modal title={editingProject ? "Chỉnh sửa dự án" : "Thêm dự án mới"} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={800}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="name" label="Tên dự án" rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}>
              <Input placeholder="Nhập tên dự án" />
            </Form.Item>

            <Form.Item name="client" label="Khách hàng">
              <Input placeholder="Nhập tên khách hàng" />
            </Form.Item>

            <Form.Item name="status" label="Trạng thái" initialValue="planning">
              <Select>
                <Option value="planning">Lên kế hoạch</Option>
                <Option value="ongoing">Đang thực hiện</Option>
                <Option value="completed">Hoàn thành</Option>
                <Option value="paused">Tạm dừng</Option>
              </Select>
            </Form.Item>

            <Form.Item name="is_featured" label="Dự án nổi bật" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="start_date" label="Ngày bắt đầu">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="end_date" label="Ngày kết thúc">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={4} placeholder="Nhập mô tả dự án" />
          </Form.Item>

          <Form.Item name="technologies" label="Công nghệ sử dụng">
            <Select mode="tags" placeholder="Nhập công nghệ (có thể thêm nhiều)" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="images" label="Hình ảnh">
            <Select mode="tags" placeholder="Nhập URL hình ảnh (có thể thêm nhiều)" style={{ width: "100%" }} />
          </Form.Item>

          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setModalVisible(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {editingProject ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
