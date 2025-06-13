"use client";

import { Col, Row, Carousel, ConfigProvider } from "antd"; // Import ConfigProvider
import Image from "next/image";

export default function PartnersCustomers() {
   const defaultWidth = 280;
   const defaultHeight = 200;

   const partners = [
      {
         key: 1,
         imageSmall: (
            <Image src="/assets/images/FPT_Logo.png" alt="FptLogo" width={defaultWidth} height={defaultHeight} />
         )
      },
      {
         key: 2,
         imageSmall: (
            <Image src="/assets/images/Viettel_Logo.png" alt="VtLogo" width={defaultWidth} height={defaultHeight} />
         )
      },
      {
         key: 3,
         imageSmall: (
            <Image
               src="/assets/images/DienPhucThanh_Logo.png"
               alt="DienPhucThanhLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      },
      {
         key: 4,
         imageSmall: (
            <Image
               src="/assets/images/HungLocPhat_Logo.png"
               alt="HungLocPhatLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      },
      {
         key: 5,
         imageSmall: (
            <Image
               src="/assets/images/Mobifone_Logo.png"
               alt="MobifoneLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      },
      {
         key: 6,
         imageSmall: (
            <Image
               src="/assets/images/PicityHighPark_Logo.png"
               alt="PicityHighParkLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      },
      {
         key: 7,
         imageSmall: (
            <Image
               src="/assets/images/NamLong_Logo.png"
               alt="NamLongLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      },
      {
         key: 8,
         imageSmall: (
            <Image
               src="/assets/images/Charm_City_Logo.png"
               alt="CharmCityLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      },
      {
         key: 9,
         imageSmall: (
            <Image
               src="/assets/images/XuanMaiCorp_Logo.png"
               alt="XuanMaiCorpLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      },
      {
         key: 10,
         imageSmall: (
            <Image
               src="/assets/images/CMC_Telecom_Logo.png"
               alt="CMCTelecomLogo"
               width={defaultWidth}
               height={defaultHeight}
            />
         )
      }
   ];

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
