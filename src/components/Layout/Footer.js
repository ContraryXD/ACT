"use client";

import { MailOutlined, PhoneOutlined, EnvironmentOutlined, FacebookOutlined } from "@ant-design/icons";
import { navigation, contact, interested } from "../../data/menu";
import { Row, Col } from "antd";

export default function Footer() {
   return (
      <footer className="bg-footer-background">
         <div className="w-full justify-center">
            <div className="sm:flex mx-auto items-center justify-center px-30 py-8">
               <div className="mt-6 lg:mt-0 lg:flex-1 justify-center">
                  <Row gutter={[32, 32]} style={{ maxWidth: "1200px", margin: "0 auto" }}>
                     {" "}
                     <Col xs={24} md={15}>
                        <div className="flex flex-col">
                           <h3 style={{ color: "#ffffff" }} className="capitalize font-serif font-bold text-xl">
                              Thông tin liên lạc
                           </h3>{" "}
                           {contact.map((item, index) => (
                              <a
                                 key={`contact-${index}`}
                                 href={item.link || "#"}
                                 style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "16px",
                                    fontSize: "16px",
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease"
                                 }}
                                 onMouseEnter={(e) => {
                                    e.target.style.color = "#d1d5db";
                                    e.target.style.textDecoration = "underline";
                                 }}
                                 onMouseLeave={(e) => {
                                    e.target.style.color = "#ffffff";
                                    e.target.style.textDecoration = "none";
                                 }}>
                                 {item.icon && (
                                    <item.icon style={{ fontSize: "16px", marginRight: "8px", color: "#ffffff" }} />
                                 )}
                                 <span>{item.name}</span>
                              </a>
                           ))}
                        </div>
                     </Col>
                     <Col xs={24} md={5}>
                        <div className="flex flex-col">
                           <h3 style={{ color: "#ffffff" }} className="capitalize font-serif font-bold text-xl">
                              Các Trang
                           </h3>{" "}
                           {navigation.slice(0, 4).map((item, index) => (
                              <a
                                 key={`nav-${index}`}
                                 href={item.href || "#"}
                                 style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "16px",
                                    fontSize: "16px",
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease"
                                 }}
                                 onMouseEnter={(e) => {
                                    e.target.style.color = "#d1d5db";
                                    e.target.style.textDecoration = "underline";
                                 }}
                                 onMouseLeave={(e) => {
                                    e.target.style.color = "#ffffff";
                                    e.target.style.textDecoration = "none";
                                 }}>
                                 {item.name}
                              </a>
                           ))}
                        </div>
                     </Col>{" "}
                     <Col xs={24} md={4}>
                        <div className="flex flex-col">
                           <h3 style={{ color: "#ffffff" }} className="capitalize font-serif font-bold text-xl">
                              Đáng Quan Tâm
                           </h3>{" "}
                           {interested.map((item, index) => (
                              <a
                                 key={`interested-${index}`}
                                 href={item.href || "#"}
                                 style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "16px",
                                    fontSize: "16px",
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease"
                                 }}
                                 onMouseEnter={(e) => {
                                    e.target.style.color = "#d1d5db";
                                    e.target.style.textDecoration = "underline";
                                 }}
                                 onMouseLeave={(e) => {
                                    e.target.style.color = "#ffffff";
                                    e.target.style.textDecoration = "none";
                                 }}>
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
