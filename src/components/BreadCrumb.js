import { Breadcrumb } from "antd";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

export default function BreadCrumb({ items }) {
  const breadcrumbItems = items.map((item, index) => {
    if (item.href) {
      return {
        title: (
          <Link href={item.href}>
            {index === 0 ? (
              <>
                <HomeOutlined />
                <span className="ml-1">{item.title}</span>
              </>
            ) : (
              item.title
            )}
          </Link>
        ),
      };
    }
    return {
      title: item.title,
    };
  });

  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </div>
  );
}
