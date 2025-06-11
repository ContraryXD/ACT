"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Drawer, Button, Row, Col, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { navigation } from "../../data/menu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm bg-white">
      <Row align="middle" justify="space-between" className="ps-6 pe-12 py-6">
        {/* Logo */}
        <Col>
          <Link href="/" className="flex items-center">
            <Image src="/assets/images/logo_site.png" alt="Logo" width={110} height={55} className="ms-3" />
          </Link>
        </Col>{" "}
        {/* Desktop Menu */}
        <Col className="hidden lg:block">
          <Space size="large">
            {navigation.map((item, index) => (
              <Link
                key={item.href === "#" ? `nav-${index}` : item.href}
                href={item.href}
                style={{
                  color: pathname === item.href ? "#0033a0" : "#000000",
                  fontSize: "24px",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#1e40af";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = pathname === item.href ? "#1e40af" : "#000000";
                }}
              >
                {item.name}
              </Link>
            ))}
          </Space>
        </Col>
        {/* Mobile Menu Button */}
        <Col className="lg:hidden">
          <Button type="text" icon={<MenuOutlined style={{ fontSize: "24px" }} />} onClick={() => setIsOpen(true)} aria-label="Toggle Menu" />
        </Col>
      </Row>{" "}
      {/* Mobile Drawer */}
      <Drawer
        title={
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image src="/assets/images/logo_site.png" alt="Logo" width={110} height={55} />
          </Link>
        }
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={300}
      >
        {" "}
        <div className="flex flex-col space-y-4">
          {navigation.map((item, index) => (
            <Link
              key={item.href === "#" ? `nav-${index}` : item.href}
              href={item.href}
              style={{
                color: pathname === item.href ? "#1e40af" : "#000000",
                fontSize: "20px",
                fontWeight: "600",
                textDecoration: "none",
                padding: "8px 0",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#1e40af";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = pathname === item.href ? "#1e40af" : "#000000";
              }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </header>
  );
}
