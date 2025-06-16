"use client";
import { useState, useEffect } from "react";
import { Modal, List, Typography, Tag, Button, Space, Empty, message } from "antd";
import { MailOutlined, UserOutlined, CalendarOutlined, CheckOutlined } from "@ant-design/icons";
import { contactsAPI } from "@/services/services";

const { Text, Title } = Typography;

export default function NotificationModal({ visible, onClose, onNotificationChange }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadNotifications();
    }
  }, [visible]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await contactsAPI.getAll();

      if (error) {
        message.error("Không thể tải thông báo");
        return;
      }

      // Create notifications from recent unread contacts and other activities
      const unreadContacts = (data || [])
        .filter((contact) => !contact.is_read)
        .slice(0, 10)
        .map((contact) => ({
          id: `contact-${contact.id}`,
          type: "contact",
          title: "Liên hệ mới",
          description: `${contact.name} đã gửi liên hệ về "${contact.subject}"`,
          time: contact.created_at,
          data: contact,
        }));

      // Add some sample system notifications
      const systemNotifications = [
        {
          id: "system-1",
          type: "system",
          title: "Hệ thống",
          description: "Hệ thống hoạt động bình thường",
          time: new Date().toISOString(),
        },
        {
          id: "system-2",
          type: "system",
          title: "Bảo trì",
          description: "Bảo trì hệ thống định kỳ vào 2:00 AM",
          time: new Date(Date.now() - 3600000).toISOString(),
        },
      ];

      const allNotifications = [...unreadContacts, ...systemNotifications].sort((a, b) => new Date(b.time) - new Date(a.time));

      setNotifications(allNotifications);
    } catch (error) {
      console.error("Error loading notifications:", error);
      message.error("Có lỗi xảy ra khi tải thông báo");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notification) => {
    if (notification.type === "contact" && notification.data) {
      try {
        const { error } = await contactsAPI.markAsRead(notification.data.id);
        if (error) {
          message.error("Không thể đánh dấu đã đọc");
          return;
        }
        message.success("Đã đánh dấu đã đọc");
        loadNotifications(); // Reload to update the list

        // Notify parent component to update badge count
        if (onNotificationChange) {
          onNotificationChange();
        }
      } catch (error) {
        message.error("Không thể đánh dấu đã đọc");
      }
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "contact":
        return <MailOutlined style={{ color: "#1890ff" }} />;
      case "user":
        return <UserOutlined style={{ color: "#52c41a" }} />;
      case "system":
        return <CalendarOutlined style={{ color: "#faad14" }} />;
      default:
        return <MailOutlined style={{ color: "#1890ff" }} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "contact":
        return "blue";
      case "user":
        return "green";
      case "system":
        return "orange";
      default:
        return "blue";
    }
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const now = new Date();
    const diffInHours = (now - time) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - time) / (1000 * 60));
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} giờ trước`;
    } else {
      return time.toLocaleDateString("vi-VN");
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <Title level={4} style={{ margin: 0 }}>
            Thông báo
          </Title>
          <Tag color="blue">{notifications.length} thông báo</Tag>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={600}
      styles={{ body: { padding: 0 } }}
    >
      {notifications.length === 0 ? (
        <div style={{ padding: "40px 24px" }}>
          <Empty description="Không có thông báo mới" />
        </div>
      ) : (
        <List
          loading={loading}
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid #f0f0f0",
              }}
              actions={[
                notification.type === "contact" && (
                  <Button size="small" icon={<CheckOutlined />} onClick={() => handleMarkAsRead(notification)}>
                    Đánh dấu đã đọc
                  </Button>
                ),
              ].filter(Boolean)}
            >
              <List.Item.Meta
                avatar={getNotificationIcon(notification.type)}
                title={
                  <div className="flex items-center justify-between">
                    <span>{notification.title}</span>
                    <Tag color={getNotificationColor(notification.type)} size="small">
                      {notification.type === "contact" ? "Liên hệ" : notification.type === "user" ? "Người dùng" : "Hệ thống"}
                    </Tag>
                  </div>
                }
                description={
                  <div>
                    <Text>{notification.description}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {formatTime(notification.time)}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}
