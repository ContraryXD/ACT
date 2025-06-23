"use client";
import { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Tag, Button, Space, Input, Select, message, Spin, Modal } from "antd";
import { CalendarOutlined, EnvironmentOutlined, DollarOutlined, TeamOutlined, SearchOutlined, SendOutlined } from "@ant-design/icons";
import { jobsAPI } from "@/services/services";
import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Tuyển dụng | ACT Telecommunications";
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const breadcrumbItems = [{ title: "Trang chủ", href: "/" }, { title: "Tuyển dụng" }];

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await jobsAPI.getActive();

      if (error) {
        message.error("Không thể tải danh sách việc làm");
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      message.error("Có lỗi xảy ra khi tải danh sách việc làm");
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "all" || job.location === locationFilter;
    const matchesType = typeFilter === "all" || job.job_type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  // Get unique locations and types for filters
  const locations = [...new Set(jobs.map((job) => job.location).filter(Boolean))];
  const jobTypes = [...new Set(jobs.map((job) => job.job_type).filter(Boolean))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatSalary = (salary) => {
    if (!salary) return "Thỏa thuận";
    return new Intl.NumberFormat("vi-VN").format(salary) + " VNĐ";
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleApply = (job) => {
    const subject = `Ứng tuyển vị trí: ${job.title}`;
    const body = `Kính gửi ACT Team,

Tôi xin gửi đơn ứng tuyển cho vị trí ${job.title} tại công ty.

Thông tin liên hệ:
- Họ tên: [Họ và tên của bạn]
- Email: [Email của bạn]
- Số điện thoại: [Số điện thoại của bạn]
- Kinh nghiệm: [Mô tả kinh nghiệm]

Tôi đã đính kèm CV và mong được phản hồi từ quý công ty.

Trân trọng,
[Tên của bạn]`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=recruitment@act.vn&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
            Cơ hội nghề nghiệp
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">Tham gia đội ngũ ACT - Nơi tài năng được phát triển và sáng tạo được trân trọng</Paragraph>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search placeholder="Tìm kiếm vị trí..." allowClear enterButton={<SearchOutlined />} size="large" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={(value) => setSearchTerm(value)} />
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Select size="large" value={locationFilter} onChange={setLocationFilter} style={{ width: "100%" }} placeholder="Địa điểm">
                <Option value="all">Tất cả địa điểm</Option>
                {locations.map((location) => (
                  <Option key={location} value={location}>
                    {location}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Select size="large" value={typeFilter} onChange={setTypeFilter} style={{ width: "100%" }} placeholder="Loại hình">
                <Option value="all">Tất cả loại hình</Option>
                {jobTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <Text type="secondary">Tìm thấy {filteredJobs.length} vị trí tuyển dụng</Text>
            </Col>
          </Row>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <div className="mt-4">
              <Text>Đang tải danh sách việc làm...</Text>
            </div>
          </div>
        ) : (
          <>
            {/* Jobs List */}
            {filteredJobs.length > 0 ? (
              <Row gutter={[24, 24]} className="mb-8">
                {filteredJobs.map((job) => (
                  <Col key={job.id} xs={24} lg={12}>
                    {" "}
                    <Card
                      hoverable
                      className="h-full"
                      cover={
                        job.image ? (
                          <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center relative">
                            <Image src={job.image} alt={job.title} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                            <TeamOutlined className="text-4xl text-white" />
                          </div>
                        )
                      }
                      actions={[
                        <Button key="view" type="default" onClick={() => handleViewJob(job)}>
                          Xem chi tiết
                        </Button>,
                        <Button key="apply" type="primary" icon={<SendOutlined />} onClick={() => handleApply(job)}>
                          Ứng tuyển
                        </Button>,
                      ]}
                    >
                      <Card.Meta
                        title={
                          <Title level={4} className="text-gray-800 mb-2">
                            {job.title}
                          </Title>
                        }
                        description={
                          <div>
                            <Paragraph className="text-gray-600 mb-4 line-clamp-3">{job.description}</Paragraph>

                            <Space direction="vertical" size="small" className="w-full">
                              <div className="flex items-center justify-between">
                                <Space>
                                  <EnvironmentOutlined />
                                  <Text type="secondary">{job.location || "Không xác định"}</Text>
                                </Space>
                                <Tag color="blue">{job.job_type || "Full-time"}</Tag>
                              </div>

                              <div className="flex items-center justify-between">
                                <Space>
                                  <DollarOutlined />
                                  <Text type="secondary">{formatSalary(job.salary)}</Text>
                                </Space>
                                <Space>
                                  <CalendarOutlined />
                                  <Text type="secondary">{formatDate(job.created_at)}</Text>
                                </Space>
                              </div>

                              {job.experience_required && (
                                <div className="flex items-center">
                                  <TeamOutlined />
                                  <Text type="secondary" className="ml-2">
                                    Kinh nghiệm: {job.experience_required}
                                  </Text>
                                </div>
                              )}
                            </Space>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-12">
                <TeamOutlined className="text-6xl text-gray-300 mb-4" />
                <Title level={3} type="secondary">
                  Không tìm thấy vị trí tuyển dụng
                </Title>
                <Paragraph type="secondary">{searchTerm || locationFilter !== "all" || typeFilter !== "all" ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm" : "Hiện tại chưa có vị trí tuyển dụng nào"}</Paragraph>
              </div>
            )}
          </>
        )}
      </div>

      {/* Job Detail Modal */}
      <Modal
        title={selectedJob?.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
          <Button
            key="apply"
            type="primary"
            icon={<SendOutlined />}
            onClick={() => {
              handleApply(selectedJob);
              setModalVisible(false);
            }}
          >
            Ứng tuyển ngay
          </Button>,
        ]}
        width={800}
      >
        {selectedJob && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text strong>Địa điểm: </Text>
                <Text>{selectedJob.location || "Không xác định"}</Text>
              </div>
              <div>
                <Text strong>Loại hình: </Text>
                <Tag color="blue">{selectedJob.job_type || "Full-time"}</Tag>
              </div>
              <div>
                <Text strong>Mức lương: </Text>
                <Text>{formatSalary(selectedJob.salary)}</Text>
              </div>
              <div>
                <Text strong>Kinh nghiệm: </Text>
                <Text>{selectedJob.experience_required || "Không yêu cầu"}</Text>
              </div>
            </div>

            <div>
              <Text strong>Mô tả công việc:</Text>
              <Paragraph className="mt-2 p-3 bg-gray-50 rounded">{selectedJob.description}</Paragraph>
            </div>

            {selectedJob.requirements && (
              <div>
                <Text strong>Yêu cầu:</Text>
                <Paragraph className="mt-2 p-3 bg-gray-50 rounded">{selectedJob.requirements}</Paragraph>
              </div>
            )}

            {selectedJob.benefits && (
              <div>
                <Text strong>Quyền lợi:</Text>
                <Paragraph className="mt-2 p-3 bg-gray-50 rounded">{selectedJob.benefits}</Paragraph>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
