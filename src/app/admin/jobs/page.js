"use client";
import { useState, useEffect } from "react";
import { Table, Card, Tag, Button, Space, Modal, Typography, message, Drawer, Form, Input, Select, DatePicker, Switch } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { jobsAPI } from "@/services/services";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await jobsAPI.getAll();

      if (error) {
        message.error("Không thể tải danh sách việc làm");
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      message.error("Có lỗi xảy ra khi tải danh sách việc làm");
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setDrawerVisible(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    form.setFieldsValue({
      ...job,
      deadline: job.deadline ? dayjs(job.deadline) : null,
    });
    setModalVisible(true);
  };

  const handleAddJob = () => {
    setEditingJob(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleDeleteJob = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa việc làm này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          const { error } = await jobsAPI.delete(id);
          if (error) {
            message.error("Không thể xóa việc làm");
            return;
          }
          message.success("Đã xóa việc làm thành công");
          loadJobs();
        } catch (error) {
          message.error("Không thể xóa việc làm");
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      const jobData = {
        ...values,
        deadline: values.deadline ? values.deadline.format("YYYY-MM-DD") : null,
      };

      if (editingJob) {
        const { error } = await jobsAPI.update(editingJob.id, jobData);
        if (error) {
          message.error("Không thể cập nhật việc làm");
          return;
        }
        message.success("Đã cập nhật việc làm thành công");
      } else {
        const { error } = await jobsAPI.create(jobData);
        if (error) {
          message.error("Không thể tạo việc làm");
          return;
        }
        message.success("Đã tạo việc làm thành công");
      }

      setModalVisible(false);
      loadJobs();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "full-time":
        return "green";
      case "part-time":
        return "blue";
      case "contract":
        return "orange";
      case "internship":
        return "purple";
      default:
        return "default";
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case "full-time":
        return "Toàn thời gian";
      case "part-time":
        return "Bán thời gian";
      case "contract":
        return "Hợp đồng";
      case "internship":
        return "Thực tập";
      default:
        return type;
    }
  };

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      render: (department) => department || "-",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      render: (location) => location || "-",
    },
    {
      title: "Loại hình",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color={getTypeColor(type)}>{getTypeText(type)}</Tag>,
      filters: [
        { text: "Toàn thời gian", value: "full-time" },
        { text: "Bán thời gian", value: "part-time" },
        { text: "Hợp đồng", value: "contract" },
        { text: "Thực tập", value: "internship" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Mức lương",
      dataIndex: "salary_range",
      key: "salary_range",
      render: (salary) => salary || "Thỏa thuận",
    },
    {
      title: "Hạn nộp",
      dataIndex: "deadline",
      key: "deadline",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "-"),
      sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => <Tag color={isActive ? "green" : "red"}>{isActive ? "Đang tuyển" : "Đã đóng"}</Tag>,
      filters: [
        { text: "Đang tuyển", value: true },
        { text: "Đã đóng", value: false },
      ],
      onFilter: (value, record) => record.is_active === value,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleViewJob(record)}>
            Xem
          </Button>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEditJob(record)}>
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteJob(record.id)}>
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
          <Title level={2}>Quản lý Tuyển dụng</Title>
          <Text type="secondary">Danh sách các vị trí tuyển dụng</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddJob}>
          Thêm việc làm
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={jobs}
          rowKey="id"
          loading={loading}
          pagination={{
            total: jobs.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} việc làm`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* View Job Drawer */}
      <Drawer title="Chi tiết việc làm" placement="right" width={600} onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {selectedJob && (
          <div className="space-y-4">
            <div>
              <Text strong>Thông tin cơ bản:</Text>
              <div className="mt-2 space-y-2">
                <div>
                  <Text strong className="w-32 inline-block">
                    Vị trí:
                  </Text>
                  <Text>{selectedJob.title}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Phòng ban:
                  </Text>
                  <Text>{selectedJob.department || "Không có"}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Địa điểm:
                  </Text>
                  <Text>{selectedJob.location || "Không có"}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Loại hình:
                  </Text>
                  <Tag color={getTypeColor(selectedJob.type)}>{getTypeText(selectedJob.type)}</Tag>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Mức lương:
                  </Text>
                  <Text>{selectedJob.salary_range || "Thỏa thuận"}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Hạn nộp:
                  </Text>
                  <Text>{selectedJob.deadline ? dayjs(selectedJob.deadline).format("DD/MM/YYYY") : "Không có"}</Text>
                </div>
                <div>
                  <Text strong className="w-32 inline-block">
                    Trạng thái:
                  </Text>
                  <Tag color={selectedJob.is_active ? "green" : "red"}>{selectedJob.is_active ? "Đang tuyển" : "Đã đóng"}</Tag>
                </div>
              </div>
            </div>

            {selectedJob.description && (
              <div>
                <Text strong>Mô tả công việc:</Text>
                <Paragraph className="mt-2 p-3 bg-gray-50 rounded">{selectedJob.description}</Paragraph>
              </div>
            )}

            {selectedJob.requirements && (
              <div>
                <Text strong>Yêu cầu:</Text>
                <Paragraph className="mt-2 p-3 bg-gray-50 rounded">{selectedJob.requirements}</Paragraph>
              </div>
            )}

            {selectedJob.benefits && (
              <div>
                <Text strong>Quyền lợi:</Text>
                <Paragraph className="mt-2 p-3 bg-gray-50 rounded">{selectedJob.benefits}</Paragraph>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Add/Edit Job Modal */}
      <Modal title={editingJob ? "Chỉnh sửa việc làm" : "Thêm việc làm mới"} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={800}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="title" label="Vị trí tuyển dụng" rules={[{ required: true, message: "Vui lòng nhập vị trí tuyển dụng" }]}>
              <Input placeholder="Nhập vị trí tuyển dụng" />
            </Form.Item>

            <Form.Item name="department" label="Phòng ban">
              <Input placeholder="Nhập phòng ban" />
            </Form.Item>

            <Form.Item name="location" label="Địa điểm làm việc">
              <Input placeholder="Nhập địa điểm làm việc" />
            </Form.Item>

            <Form.Item name="type" label="Loại hình công việc" initialValue="full-time">
              <Select>
                <Option value="full-time">Toàn thời gian</Option>
                <Option value="part-time">Bán thời gian</Option>
                <Option value="contract">Hợp đồng</Option>
                <Option value="internship">Thực tập</Option>
              </Select>
            </Form.Item>

            <Form.Item name="salary_range" label="Mức lương">
              <Input placeholder="VD: 15-20 triệu, Thỏa thuận" />
            </Form.Item>

            <Form.Item name="deadline" label="Hạn nộp hồ sơ">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item name="is_active" label="Trạng thái tuyển dụng" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Đang tuyển" unCheckedChildren="Đã đóng" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả công việc">
            <TextArea rows={4} placeholder="Nhập mô tả công việc chi tiết" />
          </Form.Item>

          <Form.Item name="requirements" label="Yêu cầu ứng viên">
            <TextArea rows={4} placeholder="Nhập yêu cầu đối với ứng viên" />
          </Form.Item>

          <Form.Item name="benefits" label="Quyền lợi">
            <TextArea rows={4} placeholder="Nhập quyền lợi của ứng viên" />
          </Form.Item>

          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setModalVisible(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {editingJob ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
