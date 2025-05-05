"use client";

import { Col, Row, Carousel } from "antd"; // Import Carousel
import partners from "@/data/partners"; // Import the partners data

export default function PartnersCustomers() {
   // Carousel settings
   const carouselSettings = {
      dots: false, // Hide dots navigation
      infinite: true, // Loop infinitely
      speed: 500, // Transition speed
      slidesToShow: 5, // Show 5 logos by default
      slidesToScroll: 1,
      autoplay: true, // Enable autoplay
      autoplaySpeed: 2000, // Change slide every 2 seconds
      pauseOnHover: true, // Pause autoplay on hover
      responsive: [
         // Adjust slides shown based on screen size
         {
            breakpoint: 1200, // xl
            settings: {
               slidesToShow: 5
            }
         },
         {
            breakpoint: 992, // lg
            settings: {
               slidesToShow: 4
            }
         },
         {
            breakpoint: 768, // md
            settings: {
               slidesToShow: 3
            }
         },
         {
            breakpoint: 576, // sm/xs
            settings: {
               slidesToShow: 2
            }
         }
      ]
   };

   return (
      <>
         {/* Section background is now fixed via CSS */}
         <section className="partners-customers" style={{ marginTop: "80px" }}>
            <div className="container mx-auto max-w-[1200px]">
               <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                     <div className="partners-customers__head">
                        <h3>Đối tác & Khách hàng</h3>
                        <p>
                           Trên những chặng đường phát triển của ACT, mỗi đối tác và khách hàng đều là một hành trang
                           quý giá. ACT rất vinh hạnh khi được nhiều đối tác chọn lựa và hài lòng khi trao gửi niềm tin.
                        </p>
                     </div>
                  </Col>
               </Row>
               {/* Replace Row with Carousel */}
               <Row>
                  <Col span={24}>
                     {/* Check if partners data exists */}
                     {partners && partners.length > 0 ? (
                        <Carousel {...carouselSettings}>
                           {partners.map((item) => (
                              // Each item in the carousel needs a key
                              <div key={item.key}>
                                 <div className="partners-customers__list-icon">{item.imageSmall}</div>
                              </div>
                           ))}
                        </Carousel>
                     ) : (
                        <p style={{ color: "white", textAlign: "center" }}>Đối tác đang được cập nhật...</p> // Fallback message
                     )}
                  </Col>
               </Row>
            </div>
         </section>
      </>
   );
}
