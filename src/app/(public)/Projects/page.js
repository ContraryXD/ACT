"use client";

import { useState, useEffect } from "react";
import { Tabs, Row, Col, Card, Tag, Button } from "antd";
import { CalendarOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "@/components/Common/BreadCrumb";
import { projectsAPI } from "@/services/services";

const { TabPane } = Tabs;

export default function Projects() {
  const title = "Dự án";
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    document.title = "Dự án | ACT Telecommunications";
  }, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await projectsAPI.getAll();

      if (error) {
        setError(error);
        return;
      }

      setProjects(data || []);
      console.log("Projects data:", data?.slice(0, 2)); // Log first 2 projects to see structure
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects by status
  const completedProjects = projects.filter((project) => project.status === "completed");
  const ongoingProjects = projects.filter((project) => project.status === "ongoing");

  const ProjectCard = ({ project }) => (
    <Col xs={24} sm={12} lg={8} key={project.id}>
      <Card
        className="h-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        cover={
          <div className="relative h-48 overflow-hidden">
            <Image src={project.images?.[0] || "/assets/images/default-project.jpg"} alt={project.name} fill className="object-cover transition-transform duration-300 hover:scale-110" />
            <div className="absolute top-4 right-4">
              <Tag color={project.status === "completed" ? "green" : "blue"}>{project.status === "completed" ? "Hoàn thành" : "Đang thực hiện"}</Tag>
            </div>
          </div>
        }
        actions={[
          <Link key="view" href={`/Projects/${project.id}`}>
            <Button type="link" icon={<EyeOutlined />}>
              Xem chi tiết
            </Button>
          </Link>,
        ]}
      >
        <Card.Meta
          title={<h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>}
          description={
            <div className="space-y-2">
              {project.client && (
                <p className="flex items-center text-gray-600">
                  <UserOutlined className="mr-2" />
                  <span className="font-medium">Khách hàng: </span> {project.client}
                </p>
              )}
              {(project.start_date || project.end_date) && (
                <p className="flex items-center text-gray-600">
                  <CalendarOutlined className="mr-2" />
                  <span className="font-medium">Thời gian:</span> {project.start_date ? new Date(project.start_date).getFullYear() : "N/A"} - {project.end_date ? new Date(project.end_date).getFullYear() : "Đang thực hiện"}
                </p>
              )}
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Tag key={index} size="small">
                      {tech}
                    </Tag>
                  ))}
                  {project.technologies.length > 3 && <Tag size="small">+{project.technologies.length - 3}</Tag>}
                </div>
              )}
            </div>
          }
        />
      </Card>
    </Col>
  );

  const LoadingState = () => (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Đang tải dự án...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">Lỗi: {error}</p>
      <Button onClick={loadProjects} type="primary">
        Thử lại
      </Button>
    </div>
  );

  const EmptyState = ({ type }) => (
    <div className="text-center py-12">
      <p className="text-gray-600">{type === "completed" ? "Chưa có dự án hoàn thành nào." : "Chưa có dự án đang thực hiện nào."}</p>
    </div>
  );

  return (
    <>
      <BreadCrumb title={title} breadcrumbImg="/assets/images/bg-breadcrumb.jpg" />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {" "}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dự án của chúng tôi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">ACT đã và đang thực hiện nhiều dự án lớn nhỏ trong lĩnh vực viễn thông và công nghệ thông tin, mang lại giá trị thiết thực cho khách hàng và đối tác.</p>
          </div>
          <div className="max-w-7xl mx-auto mt-8">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState />
            ) : (
              <Tabs
                defaultActiveKey="completed"
                size="large"
                className="projects-tabs"
                items={[
                  {
                    key: "completed",
                    label: <span className="text-lg font-semibold">Dự án hoàn thành ({completedProjects.length})</span>,
                    children: (
                      <div className="mt-12">
                        {completedProjects.length > 0 ? (
                          <Row gutter={[24, 24]}>
                            {completedProjects.map((project) => (
                              <ProjectCard key={project.id} project={project} />
                            ))}
                          </Row>
                        ) : (
                          <EmptyState type="completed" />
                        )}
                      </div>
                    ),
                  },
                  {
                    key: "ongoing",
                    label: <span className="text-lg font-semibold">Đang thực hiện ({ongoingProjects.length})</span>,
                    children: (
                      <div className="mt-8">
                        {ongoingProjects.length > 0 ? (
                          <Row gutter={[24, 24]}>
                            {ongoingProjects.map((project) => (
                              <ProjectCard key={project.id} project={project} />
                            ))}
                          </Row>
                        ) : (
                          <EmptyState type="ongoing" />
                        )}
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
