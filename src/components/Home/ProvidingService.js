import ServiceItems from "@/data/services";
import { Col, Row } from "antd";

export default function ProvidingService() {
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
                  {ServiceItems && (
                     <>
                        {ServiceItems.map((item) => (
                           <Col xl={8} lg={8} md={12} sm={12} xs={24} key={item.key}>
                              <div className="service-provider__item">
                                 <div className="service-provider__item--image-wrapper">{item.icon}</div>
                                 <div className="text">
                                    <div className="title">
                                       <h2>{item.title}</h2>
                                    </div>
                                    <p className="content">{item.content}</p>
                                 </div>
                              </div>
                           </Col>
                        ))}
                     </>
                  )}
               </Row>
            </div>
         </section>
      </>
   );
}
