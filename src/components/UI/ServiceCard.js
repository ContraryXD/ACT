"use client";
import { Card, Button, Typography, Space } from "antd";
import { ArrowRightOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

const { Title, Paragraph } = Typography;

export default function ServiceCard({ service, variant = "modern", hoverable = true, showFullContent = true, showActions = true, size = "default", className = "", onEdit, onDelete, isAdmin = false }) {
  if (variant === "classic") {
    return (
      <div className="service-provider__item">
        <div className="service-provider__item--image-wrapper">{service.icon || (service.image_url && <Image src={service.image_url} alt={service.title} width={100} height={100} style={{ objectFit: "cover" }} />)}</div>
        <div className="text">
          <div className="title">
            <h2>{service.title}</h2>
          </div>
          <p className="content">{service.content || service.description}</p>
        </div>
      </div>
    );
  }

  const cardStyles = {
    default: { maxWidth: 300, margin: "0 auto" },
    large: { maxWidth: 400, margin: "0 auto" },
    small: { maxWidth: 250, margin: "0 auto" },
  };

  const actions = [];

  if (showActions && !isAdmin) {
    actions.push(
      <Link href={`/services/${service.id}`} key="view">
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          style={{
            backgroundColor: "#1e40af",
            borderColor: "#1e40af",
          }}
        >
          Learn More
        </Button>
      </Link>
    );
  }

  if (isAdmin) {
    actions.push(
      <Button key="edit" icon={<EditOutlined />} onClick={() => onEdit && onEdit(service)} style={{ marginRight: 8 }}>
        Edit
      </Button>
    );
    actions.push(
      <Button key="delete" icon={<DeleteOutlined />} type="primary" danger onClick={() => onDelete && onDelete(service.id)}>
        Delete
      </Button>
    );
  }

  // Modern variant (default)
  return (
    <Card
      hoverable={hoverable}
      style={cardStyles[size]}
      className={`h-full shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
      cover={
        service.image_url ? (
          <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
            <Image alt={service.title} src={service.image_url} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
        ) : service.icon ? (
          <div className="h-64 overflow-hidden">{service.icon}</div>
        ) : null
      }
      actions={actions.length > 0 ? actions : undefined}
      bodyStyle={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        minHeight: "200px",
      }}
    >
      <Space direction="vertical" size="middle" className="flex-1">
        <Title level={4} className="text-blue-900 font-bold mb-3 text-center">
          {service.title}
        </Title>
        <Paragraph className="text-gray-600 text-sm leading-relaxed flex-1">{showFullContent ? service.content || service.description : (service.content || service.description)?.substring(0, 120) + "..."}</Paragraph>
        {service.price && (
          <div
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#1e40af",
              textAlign: "center",
            }}
          >
            ${service.price}
          </div>
        )}
      </Space>
    </Card>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.node,
    image_url: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  variant: PropTypes.oneOf(["modern", "classic"]),
  hoverable: PropTypes.bool,
  showFullContent: PropTypes.bool,
  showActions: PropTypes.bool,
  size: PropTypes.oneOf(["small", "default", "large"]),
  className: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};
