"use client";

import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import { projectsAPI } from "@/services/services";

export default function TypicalProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await projectsAPI.getLimited(6);

      if (error) {
        setError(error);
        return;
      }

      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="typical-projects" style={{ marginTop: "80px" }}>
        <div className="container mx-auto max-w-[1200px] pb-20">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải dự án...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="typical-projects" style={{ marginTop: "80px" }}>
        <div className="container mx-auto max-w-[1200px] pb-20">
          <div className="text-center py-8">
            <p className="text-red-600">Lỗi: {error}</p>
            <button onClick={loadProjects} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Thử lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="typical-projects" style={{ marginTop: "80px" }}>
        <div className="container mx-auto max-w-[1200px] pb-20">
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className="typical-projects__head">
                <p>DỰ ÁN</p>
                <h3> Những dự án tiêu biểu</h3>
              </div>
            </Col>
          </Row>
          <Row gutter={[40, 40]}>
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <Col xl={8} lg={8} md={12} sm={12} xs={24} key={project.id}>
                  <div className="typical-projects__item">
                    <div className="typical-projects__item--effect">
                      <Image src={project.images?.[0] || "/assets/images/default-project.jpg"} alt={project.name} width={400} height={250} className="object-cover w-full h-full rounded-lg" />
                    </div>
                    {project.status === "completed" ? <span>Dự án hoàn thành</span> : <span>Đang thi công</span>}
                    <div className="typical-projects__item--title pt-10">{project.name}</div>
                    <p className="typical-projects__item--content">{project.description}</p>
                  </div>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <div className="text-center py-8">
                  <p className="text-gray-600">Không có dự án nào được tìm thấy.</p>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </section>
    </>
  );
}
