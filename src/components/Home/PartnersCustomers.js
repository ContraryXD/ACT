"use client";

import { Col, Row, Carousel, ConfigProvider } from "antd"; // Import ConfigProvider
import partners from "@/data/partners";

export default function PartnersCustomers() {
   // Carousel settings
   const carouselSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: false,
      draggable: true,
      arrows: true,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 4
            }
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 4
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 3
            }
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 2
            }
         }
      ]
   };

   const themeConfig = {
      components: {
         Carousel: {
            arrowOffset: 20,
            arrowSize: 20,
            dotOffset: -20,
            dotHeight: 8,
            dotWidth: 8,
            dotActiveWidth: 8,
            dotGap: 8
         }
      }
   };

   return (
      <>
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
               <Row>
                  <Col span={24}>
                     {/* Wrap the Carousel with ConfigProvider */}
                     <ConfigProvider theme={themeConfig}>
                        {partners && partners.length > 0 ? (
                           <Carousel {...carouselSettings}>
                              {partners.map((item) => (
                                 <div key={item.key} style={{ padding: "0 5px" }}>
                                    <div className="partners-customers__list-icon">{item.imageSmall}</div>
                                 </div>
                              ))}
                           </Carousel>
                        ) : (
                           <p style={{ color: "white", textAlign: "center" }}>Đối tác đang được cập nhật...</p>
                        )}
                     </ConfigProvider>
                  </Col>
               </Row>
            </div>
         </section>
      </>
   );
}
