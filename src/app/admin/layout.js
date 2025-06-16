"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Layout, Menu } from "antd";
import { DashboardOutlined, ProjectOutlined, CustomerServiceOutlined, FileTextOutlined, ContactsOutlined, BankOutlined, TeamOutlined } from "@ant-design/icons";
import Link from "next/link";
import AdminHeader from "@/components/Admin/AdminHeader";

const { Sider, Content } = Layout;

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Skip authentication check for login page
    if (pathname === "/admin/login") {
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user");

    if (!token || !userData) {
      router.push("/admin/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/admin/login");
    }
  }, [router, pathname]);
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };
  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "/admin/services",
      icon: <CustomerServiceOutlined />,
      label: <Link href="/admin/services">Quản lý Dịch vụ</Link>,
    },
    {
      key: "/admin/projects",
      icon: <ProjectOutlined />,
      label: <Link href="/admin/projects">Quản lý Dự án</Link>,
    },
    {
      key: "/admin/news",
      icon: <FileTextOutlined />,
      label: <Link href="/admin/news">Quản lý Tin tức</Link>,
    },
    {
      key: "/admin/jobs",
      icon: <BankOutlined />,
      label: <Link href="/admin/jobs">Quản lý Tuyển dụng</Link>,
    },
    {
      key: "/admin/users",
      icon: <TeamOutlined />,
      label: <Link href="/admin/users">Quản lý Người dùng</Link>,
    },
    {
      key: "/admin/contacts",
      icon: <ContactsOutlined />,
      label: <Link href="/admin/contacts">Liên hệ</Link>,
    },
  ];
  // If this is the login page, render children without layout
  if (pathname === "/admin/login") {
    return children;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          background: "#001529",
        }}
      >
        <div className="flex items-center justify-center py-6 px-4">
          <div className="text-white text-xl font-bold">{collapsed ? "ACT" : "ACT Admin"}</div>
        </div>

        <Menu theme="dark" mode="inline" selectedKeys={[pathname]} items={menuItems} style={{ border: "none" }} />
      </Sider>{" "}
      <Layout>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} user={user} onLogout={handleLogout} />

        <Content
          style={{
            margin: "0",
            padding: "24px",
            background: "#f5f5f5",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
