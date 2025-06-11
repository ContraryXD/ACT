"use client"; // This component uses hooks, so it must be a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Destructure the breadcrumbImg and title props
export default function BreadCrumb({ breadcrumbImg, title }) {
  const pathname = usePathname();
  // Split path, remove empty segments (like leading '/'), and decode URI components
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment)
    .map(decodeURIComponent);

  const backgroundStyle = breadcrumbImg ? { backgroundImage: `url(${typeof breadcrumbImg === "string" ? breadcrumbImg : breadcrumbImg.src})` } : {};

  // Create breadcrumb items for Ant Design
  const breadcrumbItems = [
    {
      href: "/",
      title: (
        <span className="text-white text-lg flex items-center">
          <HomeOutlined className="mr-1" />
          Home
        </span>
      ),
    },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;
      const displayName = capitalizeFirstLetter(segment.replace(/[-_]/g, " "));

      return {
        href: isLast ? undefined : href,
        title: <span className={`text-lg ${isLast ? "text-white font-semibold" : "text-white"}`}>{displayName}</span>,
      };
    }),
  ];

  return (
    <div className="breadcrumbs-container relative bg-cover bg-center bg-no-repeat py-16 px-4 md:py-24 md:px-6 lg:py-32 lg:px-8" style={backgroundStyle}>
      <div className="relative z-10 flex flex-col justify-center h-full ps-10">
        {title && <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">{title}</h2>}
        <Breadcrumb items={breadcrumbItems} separator={<span className="text-white text-xl mx-2">»</span>} className="custom-breadcrumb" />
      </div>
    </div>
  );
}
