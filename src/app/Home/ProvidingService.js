"use client";

import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import { servicesAPI } from "@/services/services";

export default function ProvidingService() {
   const [services, setServices] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      loadServices();
   }, []);

   const loadServices = async () => {
      try {
         setLoading(true);
         const { data, error } = await servicesAPI.getAll();

         if (error) {
            setError(error);
            return;
         }

         setServices(data || []);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return (
         <section className="service-provider" style={{ marginTop: "80px" }}>
            <div className="container mx-auto max-w-[1200px]">
               <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Đang tải dịch vụ...</p>
               </div>
            </div>
         </section>
      );
   }

   if (error) {
      return (
         <section className="service-provider" style={{ marginTop: "80px" }}>
            <div className="container mx-auto max-w-[1200px]">
               <div className="text-center py-8">
                  <p className="text-red-600">Lỗi: {error}</p>
                  <button
                     onClick={loadServices}
                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                     Thử lại
                  </button>
               </div>
            </div>
         </section>
      );
   }

   return (
      <>
         <section className="service-provider" style={{ marginTop: "80px" }}>
            <div className="container mx-auto max-w-[1200px]">
               <div className="service-provider__head">
                  <p>DỊCH VỤ</p>
                  <h2>
                     Chúng tôi cung cấp những <br />
                     <span>Dịch vụ tốt nhất</span>
                  </h2>
               </div>
               <Row gutter={[20, 0]}>
                  {services && services.length > 0 ? (
                     services.map((service) => (
                        <Col xl={8} lg={8} md={12} sm={12} xs={24} key={service.id}>
                           <div className="service-provider__item">
                              <div className="service-provider__item--image-wrapper">
                                 <Image
                                    src={service.icon || service.image || "/assets/images/default-service.jpg"}
                                    alt={service.title}
                                    width={350}
                                    height={200}
                                    className="object-cover"
                                 />
                              </div>
                              <div className="text">
                                 <div className="title">
                                    <h2>{service.title}</h2>
                                 </div>
                                 <p className="content">{service.description}</p>
                              </div>
                           </div>
                        </Col>
                     ))
                  ) : (
                     <Col span={24}>
                        <div className="text-center py-8">
                           <p className="text-gray-600">Không có dịch vụ nào được tìm thấy.</p>
                        </div>
                     </Col>
                  )}
               </Row>
            </div>
         </section>
      </>
   );
}
