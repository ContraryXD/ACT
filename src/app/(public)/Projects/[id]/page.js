"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Tag, Button, Row, Col, Carousel, Spin, Alert } from "antd";
import { CalendarOutlined, UserOutlined, ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined, TagOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "@/components/Common/BreadCrumb";
import { projectsAPI } from "@/services/services";

// For dynamic route metadata, we'll set it using useEffect and document.title
// since this is a client component

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadProject = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await projectsAPI.getById(params.id);

      if (error) {
        setError(error);
        return;
      }

      if (!data) {
        setError("Không tìm thấy dự án");
        return;
      }

      setProject(data);
      // Set dynamic page title
      document.title = `${data.title} | Dự án | ACT Telecommunications`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      loadProject();
    }
  }, [params.id, loadProject]);

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "green",
          icon: <CheckCircleOutlined />,
          text: "Hoàn thành",
        };
      case "ongoing":
        return {
          color: "blue",
          icon: <ClockCircleOutlined />,
          text: "Đang thực hiện",
        };
      default:
        return {
          color: "default",
          icon: <TagOutlined />,
          text: status,
        };
    }
  };
  if (loading) {
    return (
      <>
        <BreadCrumb title="Chi tiết dự án" breadcrumbImg="/assets/images/bg_breadcrumbs_project.jpg" />
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Đang tải thông tin dự án...</p>
          </div>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <BreadCrumb title="Chi tiết dự án" breadcrumbImg="/assets/images/bg_breadcrumbs_project.jpg" />
        <div className="container mx-auto px-6 py-16">
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            action={
              <div className="space-x-2">
                <Button size="small" onClick={loadProject}>
                  Thử lại
                </Button>
                <Link href="/Projects">
                  <Button type="primary" size="small">
                    Quay lại danh sách
                  </Button>
                </Link>
              </div>
            }
          />
        </div>
      </>
    );
  }
  if (!project) {
    return (
      <>
        <BreadCrumb title="Chi tiết dự án" breadcrumbImg="/assets/images/bg_breadcrumbs_project.jpg" />
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Không tìm thấy dự án</p>
          </div>
        </div>
      </>
    );
  }

  const statusInfo = getStatusInfo(project.status);
  return (
    <>
      <BreadCrumb title={project.name} breadcrumbImg="/assets/images/bg_breadcrumbs_project.jpg" />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/Projects">
              <Button icon={<ArrowLeftOutlined />} className="mb-4">
                Quay lại danh sách dự án
              </Button>
            </Link>
          </div>

          <Row gutter={[32, 32]}>
            {/* Project Images */}
            <Col xs={24} lg={12}>
              <Card className="shadow-lg">
                {project.images && project.images.length > 0 ? (
                  project.images.length === 1 ? (
                    <div className="relative h-96 w-full">
                      <Image src={project.images[0]} alt={project.name} fill className="object-cover rounded-lg" />
                    </div>
                  ) : (
                    <Carousel autoplay dots={{ position: "bottom" }}>
                      {project.images.map((image, index) => (
                        <div key={index} className="relative h-96">
                          <Image src={image} alt={`${project.name} - Hình ${index + 1}`} fill className="object-cover rounded-lg" />
                        </div>
                      ))}
                    </Carousel>
                  )
                ) : (
                  <div className="relative h-96 w-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TagOutlined className="text-4xl mb-2" />
                      <p>Chưa có hình ảnh</p>
                    </div>
                  </div>
                )}
              </Card>
            </Col>

            {/* Project Details */}
            <Col xs={24} lg={12}>
              <Card className="shadow-lg h-full">
                <div className="space-y-6">
                  {/* Project Title and Status */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.name}</h1>
                    <Tag color={statusInfo.color} icon={statusInfo.icon} className="text-lg px-4 py-2">
                      {statusInfo.text}
                    </Tag>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    {project.client && (
                      <div className="flex items-center text-gray-700">
                        <UserOutlined className="text-blue-600 mr-3 text-lg" />
                        <div>
                          <span className="font-semibold">Khách hàng:</span>
                          <p className="text-lg">{project.client}</p>
                        </div>
                      </div>
                    )}

                    {project.location && (
                      <div className="flex items-center text-gray-700">
                        <EnvironmentOutlined className="text-red-600 mr-3 text-lg" />
                        <div>
                          <span className="font-semibold">Địa điểm:</span>
                          <p className="text-lg">{project.location}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center text-gray-700">
                      <CalendarOutlined className="text-green-600 mr-3 text-lg" />
                      <div>
                        <span className="font-semibold">Thời gian thực hiện:</span>
                        <p className="text-lg">
                          {formatDate(project.start_date)} - {formatDate(project.end_date)}
                        </p>
                      </div>
                    </div>

                    {project.budget && (
                      <div className="flex items-center text-gray-700">
                        <TagOutlined className="text-orange-600 mr-3 text-lg" />
                        <div>
                          <span className="font-semibold">Ngân sách:</span>
                          <p className="text-lg">{project.budget}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Công nghệ sử dụng</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Tag key={index} color="blue" className="text-sm px-3 py-1">
                            {tech}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>

          {/* Project Description */}
          {project.description && (
            <Row className="mt-8">
              <Col span={24}>
                <Card className="shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả dự án</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{project.description}</p>
                  </div>
                </Card>
              </Col>
            </Row>
          )}

          {/* Project Features */}
          {project.features && project.features.length > 0 && (
            <Row className="mt-8">
              <Col span={24}>
                <Card className="shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Tính năng chính</h2>
                  <Row gutter={[16, 16]}>
                    {project.features.map((feature, index) => (
                      <Col xs={24} sm={12} md={8} key={index}>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <CheckCircleOutlined className="text-blue-600 text-lg mb-2" />
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </section>
    </>
  );
}
