"use client";
import { useState, useEffect } from "react";
import { Table, Card, Tag, Button, Space, Modal, Typography, message, Drawer } from "antd";
import { EyeOutlined, DeleteOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { contactsAPI } from "@/services/services";

export const metadata = {
  title: "Quản lý liên hệ | ACT Admin",
  description: "Quản lý thông tin liên hệ từ khách hàng ACT Telecommunications.",
};

const { Title, Text, Paragraph } = Typography;

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await contactsAPI.getAll();

      if (error) {
        message.error("Không thể tải danh sách liên hệ");
        return;
      }

      setContacts(data || []);
    } catch (error) {
      console.error("Error loading contacts:", error);
      message.error("Có lỗi xảy ra khi tải danh sách liên hệ");
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setDrawerVisible(true);
  };
  const handleReplyContact = (contact) => {
    const subject = `Re: ${contact.subject}`;
    const body = `Kính chào ${contact.name},

Cảm ơn bạn đã liên hệ với chúng tôi về "${contact.subject}".

---
Tin nhắn gốc:
${contact.message}

Trân trọng,
ACT Team`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  const handleMarkAsRead = async (contact) => {
    try {
      const { error } = await contactsAPI.markAsRead(contact.id);
      if (error) {
        message.error("Không thể đánh dấu đã đọc");
        return;
      }

      message.success("Đã đánh dấu liên hệ là đã đọc");

      // Update local state
      setContacts((prev) => prev.map((item) => (item.id === contact.id ? { ...item, is_read: true } : item)));

      // Update selected contact if it's the same one
      if (selectedContact && selectedContact.id === contact.id) {
        setSelectedContact({ ...selectedContact, is_read: true });
      }
    } catch (error) {
      message.error("Không thể đánh dấu đã đọc");
    }
  };
  const handleDeleteContact = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa liên hệ này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          const { error } = await contactsAPI.delete(id);
          if (error) {
            message.error("Không thể xóa liên hệ");
            return;
          }
          message.success("Đã xóa liên hệ thành công");
          loadContacts();
        } catch (error) {
          message.error("Không thể xóa liên hệ");
        }
      },
    });
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "-",
    },
    {
      title: "Chủ đề",
      dataIndex: "subject",
      key: "subject",
      render: (text) => (text?.length > 50 ? `${text.substring(0, 50)}...` : text),
    },
    {
      title: "Trạng thái",
      dataIndex: "is_read",
      key: "is_read",
      render: (isRead) => <Tag color={isRead ? "green" : "orange"}>{isRead ? "Đã đọc" : "Chưa đọc"}</Tag>,
      filters: [
        { text: "Đã đọc", value: true },
        { text: "Chưa đọc", value: false },
      ],
      onFilter: (value, record) => record.is_read === value,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleString("vi-VN"),
      sorter: (a, b) => new Date(b.created_at) - new Date(a.created_at),
      defaultSortOrder: "descend",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} size="small" onClick={() => handleViewContact(record)}>
            Xem
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteContact(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Title level={2}>Quản lý Liên hệ</Title>
        <Text type="secondary">Danh sách các liên hệ từ khách hàng</Text>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={contacts}
          rowKey="id"
          loading={loading}
          pagination={{
            total: contacts.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} liên hệ`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      <Drawer title="Chi tiết liên hệ" placement="right" width={500} onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        {selectedContact && (
          <div className="space-y-4">
            <div>
              <Text strong>Thông tin liên hệ:</Text>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <Text strong className="w-20">
                    Tên:
                  </Text>
                  <Text>{selectedContact.name}</Text>
                </div>
                <div className="flex items-center">
                  <MailOutlined className="mr-2" />
                  <Text>{selectedContact.email}</Text>
                </div>
                {selectedContact.phone && (
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2" />
                    <Text>{selectedContact.phone}</Text>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Text strong>Chủ đề:</Text>
              <Paragraph className="mt-2">{selectedContact.subject}</Paragraph>
            </div>
            <div>
              <Text strong>Nội dung:</Text>
              <Paragraph className="mt-2 p-3 bg-gray-50 rounded">{selectedContact.message}</Paragraph>
            </div>
            <div>
              <Text strong>Thông tin khác:</Text>
              <div className="mt-2 space-y-1">
                <div>
                  <Text type="secondary">Trạng thái: </Text>
                  <Tag color={selectedContact.is_read ? "green" : "orange"}>{selectedContact.is_read ? "Đã đọc" : "Chưa đọc"}</Tag>
                </div>
                <div>
                  <Text type="secondary">Ngày gửi: </Text>
                  <Text>{new Date(selectedContact.created_at).toLocaleString("vi-VN")}</Text>
                </div>
              </div>
            </div>{" "}
            <div className="pt-4 border-t">
              <Space>
                <Button type="primary" disabled={selectedContact.is_read} onClick={() => handleMarkAsRead(selectedContact)}>
                  {selectedContact.is_read ? "Đã đọc" : "Đánh dấu đã đọc"}
                </Button>
                <Button type="default" icon={<MailOutlined />} onClick={() => handleReplyContact(selectedContact)}>
                  Phản hồi qua Gmail
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
