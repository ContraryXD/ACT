"use client";
import { useState, useEffect } from "react";
import { Table, Card, Tag, Button, Space, Modal, Typography, message, Drawer, Form, Input, Select, Switch } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { usersAPI } from "@/services/services";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await usersAPI.getAll();

      if (error) {
        message.error("Không thể tải danh sách người dùng");
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
      message.error("Có lỗi xảy ra khi tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setDrawerVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      ...user,
      password: "", // Don't populate password field
    });
    setModalVisible(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa người dùng này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          const { error } = await usersAPI.delete(id);
          if (error) {
            message.error("Không thể xóa người dùng");
            return;
          }
          message.success("Đã xóa người dùng thành công");
          loadUsers();
        } catch (error) {
          message.error("Không thể xóa người dùng");
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      const userData = {
        username: values.username,
        email: values.email,
        full_name: values.full_name,
        role: values.role,
        is_active: values.is_active,
      };

      // Only include password if it's provided
      if (values.password && values.password.trim()) {
        userData.password = values.password;
      }

      if (editingUser) {
        const { error } = await usersAPI.update(editingUser.id, userData);
        if (error) {
          message.error("Không thể cập nhật người dùng");
          return;
        }
        message.success("Đã cập nhật người dùng thành công");
      } else {
        if (!values.password) {
          message.error("Vui lòng nhập mật khẩu cho người dùng mới");
          return;
        }
        const { error } = await usersAPI.create(userData);
        if (error) {
          message.error("Không thể tạo người dùng");
          return;
        }
        message.success("Đã tạo người dùng thành công");
      }

      setModalVisible(false);
      loadUsers();
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "red";
      case "editor":
        return "blue";
      case "viewer":
        return "green";
      default:
        return "default";
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "editor":
        return "Biên tập viên";
      case "viewer":
        return "Người xem";
      default:
        return role;
    }
  };

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
      key: "full_name",
      render: (name) => name || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color={getRoleColor(role)}>{getRoleText(role)}</Tag>,
      filters: [
        { text: "Quản trị viên", value: "admin" },
        { text: "Biên tập viên", value: "editor" },
        { text: "Người xem", value: "viewer" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => <Tag color={isActive ? "green" : "red"}>{isActive ? "Hoạt động" : "Đã khóa"}</Tag>,
      filters: [
        { text: "Hoạt động", value: true },
        { text: "Đã khóa", value: false },
      ],
      onFilter: (value, record) => record.is_active === value,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleViewUser(record)}>
            Xem
          </Button>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEditUser(record)}>
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteUser(record.id)}
            disabled={record.role === "admin"} // Prevent deleting admin users
          >
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
          <Title level={2}>Quản lý Người dùng</Title>
          <Text type="secondary">Danh sách tài khoản người dùng hệ thống</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            total: users.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* View User Drawer */}
      <Drawer title="Chi tiết người dùng" placement="right" width={500} onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <Text strong>Thông tin cơ bản:</Text>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <UserOutlined className="mr-2" />
                  <Text strong className="w-32">
                    Tên đăng nhập:
                  </Text>
                  <Text>{selectedUser.username}</Text>
                </div>
                <div className="flex items-center">
                  <Text strong className="w-32 ml-6">
                    Họ tên:
                  </Text>
                  <Text>{selectedUser.full_name || "Chưa cập nhật"}</Text>
                </div>
                <div className="flex items-center">
                  <MailOutlined className="mr-2" />
                  <Text strong className="w-32">
                    Email:
                  </Text>
                  <Text>{selectedUser.email}</Text>
                </div>
                <div className="flex items-center">
                  <Text strong className="w-32 ml-6">
                    Vai trò:
                  </Text>
                  <Tag color={getRoleColor(selectedUser.role)}>{getRoleText(selectedUser.role)}</Tag>
                </div>
                <div className="flex items-center">
                  <Text strong className="w-32 ml-6">
                    Trạng thái:
                  </Text>
                  <Tag color={selectedUser.is_active ? "green" : "red"}>{selectedUser.is_active ? "Hoạt động" : "Đã khóa"}</Tag>
                </div>
              </div>
            </div>

            <div>
              <Text strong>Thông tin hệ thống:</Text>
              <div className="mt-2 space-y-1">
                <div>
                  <Text type="secondary">Ngày tạo: </Text>
                  <Text>{dayjs(selectedUser.created_at).format("DD/MM/YYYY HH:mm")}</Text>
                </div>
                <div>
                  <Text type="secondary">Cập nhật lần cuối: </Text>
                  <Text>{dayjs(selectedUser.updated_at).format("DD/MM/YYYY HH:mm")}</Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add/Edit User Modal */}
      <Modal title={editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={600}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
                { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự" },
              ]}
            >
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item name="full_name" label="Họ tên">
              <Input placeholder="Nhập họ tên" />
            </Form.Item>

            <Form.Item name="role" label="Vai trò" initialValue="editor">
              <Select>
                <Option value="admin">Quản trị viên</Option>
                <Option value="editor">Biên tập viên</Option>
                <Option value="viewer">Người xem</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="password"
            label={editingUser ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu"}
            rules={
              editingUser
                ? []
                : [
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                  ]
            }
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item name="is_active" label="Trạng thái hoạt động" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Đã khóa" />
          </Form.Item>

          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setModalVisible(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
