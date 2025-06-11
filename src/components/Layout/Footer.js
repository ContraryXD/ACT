import { MailOutlined, PhoneOutlined, EnvironmentOutlined, FacebookOutlined } from "@ant-design/icons";
import { navigation, contact, interested } from "../../data/menu";
import { Row, Col } from "antd";

export default function Footer() {
  const contactData = [
    { name: "info@vienthongact.vn", link: "", icon: MailOutlined },
    { name: "(028) 62924609", link: "", icon: PhoneOutlined },
    {
      name: "Số 2R-2R1 Bình Giã, Phường 13, Quận Tân Bình, Tp.HCM",
      link: "https://maps.app.goo.gl/sqfS347XzcRccij37",
      icon: EnvironmentOutlined,
    },
    { name: "Công ty Cổ phần Viễn thông ACT", link: "https://www.facebook.com/ACTTelecomJSC", icon: FacebookOutlined },
  ];
  return (
    <footer className="bg-footer-background">
      <div className="w-full justify-center">
        <div className="sm:flex mx-auto items-center justify-center px-30 py-8">
          <div className="mt-6 lg:mt-0 lg:flex-1 justify-center">
            <Row gutter={[32, 32]} style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <Col xs={24} md={15}>
                <div className="flex flex-col">
                  <h3 className="text-gray-700 capitalize dark:text-white font-serif font-bold text-xl">Thông tin liên lạc</h3>{" "}
                  {contactData.map((item, index) => (
                    <a
                      key={`contact-${index}`}
                      href={item.link || "#"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "16px",
                        fontSize: "16px",
                        color: "#d1d5db",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#ffffff";
                        e.target.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#d1d5db";
                        e.target.style.textDecoration = "none";
                      }}
                    >
                      {item.icon && <item.icon style={{ fontSize: "16px", marginRight: "8px", color: "#d1d5db" }} />}
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              </Col>
              <Col xs={24} md={5}>
                <div className="flex flex-col">
                  <h3 className="text-gray-700 capitalize dark:text-white font-serif font-bold text-xl">Các Trang</h3>{" "}
                  {navigation.slice(0, 4).map((item, index) => (
                    <a key={`nav-${index}`} href={item.href || "#"} className="flex items-center mt-4 text-md text-gray-300 dark:text-gray-300 hover:underline">
                      {item.name}
                    </a>
                  ))}
                </div>
              </Col>{" "}
              <Col xs={24} md={4}>
                <div className="flex flex-col">
                  <h3 className="text-gray-700 capitalize dark:text-white font-serif font-bold text-xl">Đáng Quan Tâm</h3>{" "}
                  {interested.map((item, index) => (
                    <a key={`interested-${index}`} href={item.href || "#"} className="flex items-center mt-4 text-md text-gray-300 dark:text-gray-300 hover:underline">
                      {item.name}
                    </a>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <hr className="w-screen h-px my-6 text-white" />
        <div className="pb-5">
          <p className="text-center text-white">© 2024 ACT All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
