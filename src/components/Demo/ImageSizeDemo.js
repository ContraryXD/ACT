"use client";
import { Card, Typography, Space } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

// Demo component to show how images will be rendered with fixed sizes
export default function ImageSizeDemo() {
  const demoItems = [
    {
      id: 1,
      title: "Sample News Article",
      type: "news",
      image: "/assets/images/home_bannertop_1.jpg",
    },
    {
      id: 2,
      title: "Software Engineer Position",
      type: "job",
      image: "/assets/images/home_bannertop_2.jpg",
    },
    {
      id: 3,
      title: "News Without Image",
      type: "news",
      image: null,
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <Title level={2} className="text-center mb-8">
        Image Rendering Demo - Fixed Sizes
      </Title>

      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={3}>News Articles (Height: 192px / 12rem)</Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoItems
              .filter((item) => item.type === "news")
              .map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  cover={
                    item.image ? (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Text className="text-white text-lg">No Image</Text>
                      </div>
                    )
                  }
                >
                  <Card.Meta title={item.title} description="Fixed height ensures consistent layout" />
                </Card>
              ))}
          </div>
        </div>

        <div>
          <Title level={3}>Job Listings (Height: 192px / 12rem)</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoItems
              .filter((item) => item.type === "job")
              .map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  cover={
                    item.image ? (
                      <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center relative">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                        <Text className="text-white text-lg">No Image</Text>
                      </div>
                    )
                  }
                >
                  <Card.Meta title={item.title} description="Consistent image dimensions across all job cards" />
                </Card>
              ))}
          </div>
        </div>

        <div>
          <Title level={3}>News Detail Page (Height: 384px / 24rem)</Title>
          <Card>
            <div className="relative h-96">
              <Image src="/assets/images/home_bannertop_3.jpg" alt="News detail hero image" fill className="object-cover rounded-lg" />
            </div>
            <div className="mt-4">
              <Text type="secondary">Hero images in news detail pages use a larger fixed height for better visual impact</Text>
            </div>
          </Card>
        </div>
      </Space>
    </div>
  );
}
