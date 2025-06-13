"use client"; // This component uses hooks, so it must be a Client Component

import { usePathname } from "next/navigation";
import { Breadcrumb } from "antd";

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

   const backgroundStyle = breadcrumbImg
      ? { backgroundImage: `url(${typeof breadcrumbImg === "string" ? breadcrumbImg : breadcrumbImg.src})` }
      : {}; // Create breadcrumb items for Ant Design
   const breadcrumbItems = [
      {
         href: "/",
         title: <span className="text-white text-lg flex items-center">Home</span>
      },
      ...pathSegments.map((segment, index) => {
         const href = "/" + pathSegments.slice(0, index + 1).join("/");
         const displayName = capitalizeFirstLetter(segment.replace(/[-_]/g, " "));

         return {
            href: href,
            title: <span className="text-lg text-white">{displayName}</span>
         };
      })
   ];
   return (
      <div
         className="breadcrumbs-container relative bg-cover bg-center bg-no-repeat py-16 px-4 md:py-24 md:px-6 lg:py-32 lg:px-8"
         style={backgroundStyle}>
         {/* Dark overlay */}
         <div className="absolute inset-0 bg-black/25 z-0"></div>

         <div className="relative z-10 flex flex-col justify-center h-full ps-10">
            {title && <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">{title}</h2>}
            <Breadcrumb
               items={breadcrumbItems}
               separator={<span className="text-white text-xl mx-2">»</span>}
               className="custom-breadcrumb"
            />
         </div>
      </div>
   );
}
