import { Col, Row } from "antd";

import listTypicalProjects from "@/data/projects"; // Import the list of typical projects

export default function TypicalProject() {
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
            {listTypicalProjects && (
              <>
                {" "}
                {listTypicalProjects.map((item) => (
                  <Col xl={8} lg={8} md={12} sm={12} xs={24} key={item.key}>
                    <div className="typical-projects__item">
                      <div className="typical-projects__item--effect">{item.imge}</div>
                      {item.status === "completed" ? <span>Dự án hoàng thành</span> : <span>dang thi công</span>}
                      <div className="typical-projects__item--title">{item.tilte}</div>
                      <p className="typical-projects__item--content">{item.content}</p>
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
