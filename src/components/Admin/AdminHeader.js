"use client";
import { useState, useEffect } from "react";
import { Button, Avatar, Dropdown, Typography, Space, Badge, Breadcrumb } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NotificationModal from "./NotificationModal";
import { contactsAPI } from "@/services/services";

const { Text, Title } = Typography;

export default function AdminHeader({ collapsed, setCollapsed, user, onLogout }) {
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    loadUnreadCount();
    // Reload count every 30 seconds
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    try {
      const { count } = await contactsAPI.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error loading unread count:", error);
    }
  };

  const handleNotificationClick = () => {
    setNotificationModalVisible(true);
    // Reload count when modal is opened
    loadUnreadCount();
  };
  const getPageTitle = () => {
    switch (pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/services":
        return "Quản lý Dịch vụ";
      case "/admin/projects":
        return "Quản lý Dự án";
      case "/admin/news":
        return "Quản lý Tin tức";
      case "/admin/jobs":
        return "Quản lý Tuyển dụng";
      case "/admin/users":
        return "Quản lý Người dùng";
      case "/admin/contacts":
        return "Liên hệ";
      default:
        return "Admin Panel";
    }
  };

  const getBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      {
        title: (
          <Link href="/admin/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        ),
      },
    ];

    if (pathSegments.length > 2) {
      breadcrumbs.push({
        title: getPageTitle(),
      });
    }

    return breadcrumbs;
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: onLogout,
    },
  ];

  return (
    <div
      style={{
        padding: "0 24px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Top row with controls */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
            }}
          />

          <div>
            <Title level={3} style={{ color: "#fff", margin: 0 }}>
              {getPageTitle()}
            </Title>
            <Breadcrumb
              items={getBreadcrumbs()}
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "12px",
              }}
            />
          </div>
        </div>{" "}
        <Space size="middle">
          {" "}
          <Badge count={unreadCount} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              onClick={handleNotificationClick}
              style={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
              }}
            />
          </Badge>
          <div className="flex items-center space-x-2">
            <Text style={{ color: "rgba(255,255,255,0.8)" }}>Xin chào,</Text>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Button
                type="text"
                className="flex items-center"
                style={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} size="small" />
                <span>{user.full_name || user.username}</span>
              </Button>
            </Dropdown>
          </div>{" "}
        </Space>
      </div>

      <NotificationModal visible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)} onNotificationChange={loadUnreadCount} />
    </div>
  );
}
