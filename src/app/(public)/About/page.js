import BreadCrumb from "@/components/Common/BreadCrumb";
import Image from "next/image";
import {
   TeamOutlined,
   UserOutlined,
   LikeOutlined,
   ShakeOutlined,
   BulbOutlined,
   HeartOutlined
} from "@ant-design/icons";
import { Row, Col, Card, Space } from "antd";

export default function About() {
   const title = "Về chúng tôi";

   const highlightText = (text, highlights) => {
      let highlightedText = text;
      highlights.forEach((highlight) => {
         highlightedText = highlightedText.replace(highlight, `<span class="text-red-600">${highlight}</span>`);
      });
      return highlightedText;
   };
   const coreValues = [
      {
         icon: TeamOutlined,
         title: "KHÁCH HÀNG LÀ TRUNG TÂM",
         description: "Đặt nhu cầu, mong muốn và trải nghiệm của khách hàng lên hàng đầu.",
         fullDescription:
            "Luôn thực hiện mọi nỗ lực để hiểu và đáp ứng kỳ vọng của khách hàng. Phản hồi của khách hàng là nền tảng của sự cải thiện và cải tiến liên tục. Tập trung nâng cao các giá trị và các dịch vụ trải nghiệm của khách hàng.",
         highlights: [
            "để hiểu và đáp ứng",
            "sự cải thiện và cải tiến liên tục",
            "nâng cao các giá trị và các dịch vụ trải nghiệm"
         ],
         isRightAligned: false
      },
      {
         icon: UserOutlined,
         title: "TRUNG THỰC & CHÍNH TRỰC",
         description:
            "Trung thực trong giao tiếp và hành động không chỉ giúp xây dựng lòng tin mà còn là nền tảng cho sự phát triển.",
         fullDescription:
            "Luôn minh bạch trong giao tiếp và hành động để xây dựng niềm tin; Luôn thẳng thắn, nói thật ngay cả khi khó khăn hay khi có sai phạm; Đánh giá kết quả, thưởng phạt công bằng dựa trên những tiêu chí rõ ràng; Cam kết tuân thủ nguyên tắc về liêm chính, chống hối lộ và tham nhũng trong doanh nghiệp; Hành xử một cách có trách nhiệm dựa trên chuẩn mực đạo đức nghề nghiệp.",
         highlights: ["minh bạch", "thẳng thắn, nói thật", "công bằng", "liêm chính", "đạo đức"],
         isRightAligned: true
      },
      {
         icon: LikeOutlined,
         title: "CHUYÊN NGHIỆP",
         description:
            "Cách thể hiện sự tận tâm, chủ động, trách nhiệm và tôn trọng đối với công việc, đồng nghiệp và khách hàng.",
         fullDescription:
            "Kỷ luật & tự chủ không chỉ là tuân thủ Nguyên tắc, quy trình, quy định mà còn là sự tự giác, chủ động trong công việc với tinh thần trách nhiệm cao và luôn thực hiện theo những cam kết và giữ lời hứa (dù lớn hay nhỏ); Làm việc dựa trên kết quả và hiệu quả; Chuẩn hóa quy trình và thực hành xuất sắc.",
         highlights: ["Kỷ luật & tự chủ", "trách nhiệm", "cam kết và giữ lời hứa", "kết quả và hiệu quả; Chuẩn hóa"],
         isRightAligned: false
      },
      {
         icon: ShakeOutlined,
         title: "HỢP TÁC & ĐOÀN KẾT",
         description: "Sự gắn kết, hợp tác và hỗ trợ lẫn nhau giữa các thành viên để đạt được mục tiêu chung.",
         fullDescription:
            "Làm việc trên tinh thần hợp tác và phối hợp, tương trợ lẫn nhau khi khó khăn; Hợp tác DN dựa trên lợi thế cạnh tranh lẫn nhau tạo nên chuỗi giá trị & cung cấp cho KH hệ sinh thái SPDV chất lượng và giá trị cao nhất; Luôn đặt lợi ích tập thể trên lợi ích cá nhân; Luôn lắng nghe và tôn trọng ý kiến người khác; Tôn trọng sự đa dạng cá tính là chìa khóa phát huy tính sáng tạo và tinh thần đồng đội; Luôn tạo ra không khí làm việc cởi mở, tích cực và phản hồi mang tính xây dựng.",
         highlights: [
            "hợp tác và phối hợp",
            "tập thể",
            "cá nhân",
            "lắng nghe và tôn trọng",
            "đa dạng",
            "tinh thần đồng đội",
            "cởi mở, tích cực và phản hồi"
         ],
         isRightAligned: true
      },
      {
         icon: BulbOutlined,
         title: "HỌC HỎI & SÁNG TẠO",
         description:
            "Học hỏi & thích nghi, cải tiến & sáng tạo trong công việc để phát triển & nâng cao chất lượng, hiệu suất trong công việc cũng như sức mạnh cạnh tranh của DN.",
         fullDescription:
            "Luôn chủ động học hỏi để phát triển bản thân và chia sẻ lẫn nhau kiến thức mới, cách làm mới; Tò mò thông qua đặt câu hỏi đúng và không tự mãn những gì đang có là điểm khởi đầu của sự tiến bộ; Không ngừng tìm kiếm ý tưởng mới, tìm tòi cải tiến phương pháp làm việc để gia tăng hiệu suất DN; Đổi mới sáng tạo là động lực chính để tăng tốc và phát triển DN bền vững.",
         highlights: ["học hỏi", "chia sẻ", "Tò mò", "sự tiến bộ", "ý tưởng mới", "cải tiến", "Đổi mới sáng tạo"],
         isRightAligned: false
      },
      {
         icon: HeartOutlined,
         title: "TRÁCH NHIỆM XÃ HỘI",
         description: "Cam kết mang lại những tác động tích cực cho cộng đồng và xã hội.",
         fullDescription:
            "Luôn dành một phần lợi nhuận cho công tác xã hội, thiện nguyện để giúp đỡ các hoàn cảnh khó khăn, chung tay xây dựng xã hội ngày càng tốt đẹp hơn; Luôn khuyến khích mọi thành viên ACT tham gia các hoạt động xã hội thiện nguyện, các chiến dịch cộng đồng; Cam kết tham gia và thúc đẩy một cách có trách nhiệm các hoạt động nội bộ và kinh doanh theo định hướng bảo vệ môi trường, chống biến đổi khí hậu và phát triển bền vững.",
         highlights: ["bảo vệ môi trường, chống biến đổi khí hậu và phát triển bền vững"],
         isRightAligned: true
      }
   ];
   const visionMission = [
      {
         image: "/assets/images/Vision_1.jpg",
         number: "1",
         description:
            "Trở thành doanh nghiệp cung cấp dịch vụ giải pháp tích hợp, vận hành khai thác và cho thuê hạ tầng số hàng đầu Việt Nam, gồm: vận hành khai thác hạ tầng mạng lưới như trạm BTS, mạng cáp quang truyền dẫn."
      },
      {
         image: "/assets/images/Vision_2.jpg",
         number: "2",
         description:
            "Chúng tôi không ngừng cải tiến quy trình công việc; đào tạo, bồi dưỡng để nâng cao kiến thức và kỹ năng chuyên nghiệp cho đội ngũ nhân viên. Từ đó giúp tối ưu giá thành, nâng cao chất lượng hạ tầng mạng lưới."
      },
      {
         image: "/assets/images/Vision_3.jpg",
         number: "3",
         description:
            "Trở thành doanh nghiệp hàng đầu trong lĩnh vực hợp tác đầu tư hạ tầng dự án viễn thông – công nghệ thông tin trong các khu dân cư, toà nhà cao tầng với chất lượng tốt nhất."
      },
      {
         image: "/assets/images/Vision_4.jpg",
         number: "4",
         description:
            "Hợp tác với các nhà mạng viễn thông, các đơn vị cung cấp giải pháp CNTT tốt nhất Việt Nam để cùng nhau xây dựng chuỗi giá trị các sản phẩm và dịch vụ viễn thông trong kỷ nguyên số."
      }
   ];
   const strengthPoints = [
      {
         icon: "/assets/images/about_stat_1.svg",
         description: "Đội ngũ kỹ sư, kỹ thuật viên đông đảo với trên 1.000 người được đào tạo chính qui"
      },
      {
         icon: "/assets/images/about_stat_2.svg",
         description: "Đội ngũ quản lý có kinh nghiệm và thâm niên trong nghề trên 10 năm"
      },
      {
         icon: "/assets/images/about_stat_3.svg",
         description: "Địa bàn hoạt động rộng, gồm 01 Chi nhánh tại Hà Nội và 12 Trung tâm kỹ thuật khu vực tại Tp. HCM"
      },
      {
         icon: "/assets/images/about_stat_4.svg",
         description: "Tình hình tài chính mạnh, khả năng kiểm soát dòng tiền tốt"
      },
      {
         icon: "/assets/images/about_stat_5.svg",
         description: "Bộ máy được tổ chức bài bản, kiểm soát theo quy trình quy định trên hệ thống quản trị hiện đại"
      },
      {
         icon: "/assets/images/about_stat_6.svg",
         description: "Nhiều kinh nghiệm thực hiện các dự án có tính quy mô lớn, yêu cầu chuyên nghiệp cao"
      }
   ];
   const leaders = [
      {
         id: "chairman",
         name: "Trần Ngọc Thiều",
         position: "Chủ tịch Hội đồng Quản trị",
         image: "/assets/images/Hinh_Chu_tich.jpg",
         quote: "Dù việc lớn hay nhỏ đều phải làm cho thật chuyên nghiệp và chất lượng.",
         isChairman: true
      },
      {
         id: "ceo",
         name: "Phạm Tuấn Anh",
         position: "Tổng Giám đốc",
         image: "/assets/images/Sep_Tuan_Anh.jpg",
         isChairman: false
      },
      {
         id: "deputy-technical",
         name: "Đặng Trần Hùng",
         position: "Phó Tổng Giám đốc\nPhụ trách Kỹ thuật",
         image: "/assets/images/Sep_Hung.jpg",
         isChairman: false
      },
      {
         id: "deputy-operations",
         name: "Nguyễn Đức Luân",
         position: "Phó Tổng Giám đốc\nPhụ trách Vận hành khai thác",
         image: "/assets/images/Sep_Luan.jpg",
         isChairman: false
      }
   ];
   return (
      <>
         {" "}
         <BreadCrumb title={title} breadcrumbImg="/assets/images/about_banner.jpg" />
         {/* New Company Overview Section with Offset Layout */}
         <section className="relative bg-gray-100 py-16 px-6 md:px-12 lg:px-20">
            {" "}
            <div className="max-w-7xl mx-auto">
               <div className="relative min-h-[600px] md:min-h-[550px] lg:min-h-[650px]">
                  {/* Background Image with Logo - Top Left */}{" "}
                  <div className="absolute top-0 left-0 w-full md:w-3/5 lg:w-3/5 h-[350px] md:h-[380px] lg:h-[420px] z-10">
                     <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                        <Image
                           src="/assets/images/Banner_Tong_quan.jpg"
                           alt="Company overview banner"
                           fill
                           className="object-cover"
                           priority
                        />
                     </div>{" "}
                  </div>
                  {/* Content Box - Overlaying Bottom Right Corner */}
                  <div className="absolute bottom-0 right-0 w-100 md:w-4/5 lg:w-3/5 h-auto md:h-auto lg:h-auto z-20 mt-0 md:mt-0">
                     {" "}
                     <div className="bg-gray-100 p-4 md:p-6 lg:p-8 rounded-lg shadow-xl h-full overflow-hidden">
                        <div className="mb-4">
                           <p className="text-xs text-center text-gray-600 uppercase tracking-wider mb-1 ">Tổng quan</p>
                           <h1 className="text-4xl md:text-xl lg:text-4xl font-bold text-center text-black mb-1">
                              Khái quát về Công ty
                           </h1>
                           <h2 className="text-4xl md:text-base lg:text-4xl font-bold text-center text-blue-900 mb-12">
                              Cổ phần Viễn thông ACT
                           </h2>
                        </div>

                        <div className="space-y-3 text-gray-700 leading-relaxed text-xs md:text-sm text-justify indent-8">
                           <p>
                              Công ty Cổ phần Viễn thông ACT thành lập ngày <strong>21 tháng 11 năm 2011</strong>. Hoạt
                              động trên phạm vi toàn quốc, với các lĩnh vực kinh doanh thuộc ngành viễn thông như: Thiết
                              kế hạ tầng viễn thông; Cho thuê hạ tầng viễn thông cáp quang; Thi công công trình viễn
                              thông; Dịch vụ quản lý vận hành hạ tầng viễn thông; Cung cấp thiết bị truyền hình số; Cung
                              cấp hàng hóa, thiết bị viễn thông; Cung cấp sản phẩm và giải pháp CNTT.
                           </p>
                           <p>
                              Từ ngày thành lập đến nay, Công ty đã không ngừng nỗ lực để vươn tới sự phát triển lớn
                              mạnh, bền vững với mục tiêu trở thành một trong những đơn vị đứng đầu về hợp tác đầu tư,
                              quản lý vận hành kỹ thuật, cung cấp dịch vụ viễn thông cho khách hàng trong dự án và cho
                              các doanh nghiệp tại Việt Nam.
                           </p>
                           <p>
                              Hiện nay, Công ty cổ phần Viễn thông ACT đang là đối tác hợp tác đầu tư, cung cấp dịch vụ
                              của các đơn vị như: Tập đoàn Công nghiệp Viễn thông Quân đội Viettel, Tổng Công ty Viễn
                              thông Mobifone, VNPT Thành phố Hồ Chí Minh, Công ty Cổ phần Viễn thông FPT, Công ty Cổ
                              phần Đầu Tư Nam Long, Xuân Mai Corp, Công ty Cổ phần Đầu Tư Bất Động Sản Hưng Lộc Phát.
                           </p>
                           <p>
                              Với phương châm đặt chất lượng dịch vụ lên hàng đầu, cùng với sự tận tâm và trách nhiệm,
                              chúng tôi hoàn toàn tin tưởng sẽ đáp ứng được sự kỳ vọng của Quý Khách hàng một cách tốt
                              nhất.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>{" "}
         {/* End of New Company Overview Section */}
         {/* Company Strengths Section */}
         <section className="relative min-h-screen bg-gray-50 flex items-center justify-center py-16 px-6">
            {" "}
            {/* Background Images */}{" "}
            <div className="absolute inset-0 z-0">
               <Image src="/assets/images/bg_big.jpg" alt="Background" fill className="object-cover" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                     src="/assets/images/bg_1.png"
                     alt="Background overlay"
                     width={800}
                     height={600}
                     className="object-contain"
                  />
               </div>
            </div>{" "}
            {/* Content */}
            <div className="relative z-10 container mx-auto p-10">
               <Row gutter={[20, 20]} justify="center">
                  {strengthPoints.map((strength, index) => (
                     <Col key={index} xs={24} sm={12} lg={8}>
                        {" "}
                        <Card
                           className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:bg-white/95 transition-all duration-300 transform hover:scale-105"
                           style={{ height: "100%" }}
                           styles={{ body: { padding: "48px", textAlign: "center" } }}>
                           <Space direction="vertical" size="large" style={{ width: "100%" }}>
                              <div className="bg-blue-900 text-white rounded-full p-6 w-20 h-20 flex items-center justify-center shadow-lg mx-auto">
                                 <Image
                                    src={strength.icon}
                                    alt={`Strength ${index + 1}`}
                                    width={32}
                                    height={32}
                                    className="filter brightness-0 invert"
                                 />
                              </div>
                              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                                 {strength.description}
                              </p>
                           </Space>
                        </Card>
                     </Col>
                  ))}
               </Row>
            </div>
         </section>{" "}
         {/* Core Values Section */}
         <section className="py-20 bg-white">
            <div className="container mx-auto px-40">
               <div className="text-center mb-16">
                  <p className="text-red-600 text-md font-light uppercase tracking-tight">
                     Giá trị cốt lõi của Công ty gắn liền với chữ viết tắt tên gọi ACT, gồm 3 giá trị
                  </p>
                  <h2 className="text-5xl font-bold text-black mb-6">Giá trị cốt lõi</h2>
               </div>{" "}
               {/* Core Values with Alternating Layout */}
               <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
                  {coreValues.map((value, index) => (
                     <Row
                        key={index}
                        gutter={[32, 32]}
                        align="middle"
                        style={{ flexDirection: value.isRightAligned ? "row-reverse" : "row" }}>
                        <Col xs={24} lg={8}>
                           <div
                              className="relative w-80 h-35 flex items-center justify-center text-white flex-shrink-0 mx-auto"
                              style={{
                                 backgroundImage: `url(/assets/images/value_icon.svg)`,
                                 backgroundSize: "contain",
                                 backgroundRepeat: "no-repeat",
                                 backgroundPosition: "center"
                              }}>
                              <value.icon style={{ fontSize: "4rem", color: "#1890ff" }} />
                           </div>
                        </Col>
                        <Col xs={24} lg={16}>
                           <p className="text-gray-800 leading-relaxed text-justify">
                              <b>{value.title}:</b> <i>{value.description}</i>{" "}
                              <span
                                 dangerouslySetInnerHTML={{
                                    __html: highlightText(value.fullDescription, value.highlights)
                                 }}
                              />
                           </p>
                        </Col>
                     </Row>
                  ))}
               </Space>
            </div>
         </section>{" "}
         {/* Vision & Mission Section */}
         <section className="relative py-16 min-h-screen">
            {/* Fixed Background Image */}{" "}
            <div
               className="fixed inset-0 bg-cover bg-center bg-no-repeat"
               style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/assets/images/bg_vision.png)`,
                  zIndex: -1
               }}></div>
            <div className="relative z-10 container mx-auto px-6">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">TẦM NHÌN – SỨ MỆNH</h2>
                  {/* First paragraph in white container */}
                  <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
                     <p className="text-lg text-gray-600 leading-relaxed">
                        Công ty Cổ phần Viễn thông ACT phát triển bền vững trên nền tảng kết hợp hài hòa các giá trị về
                        lợi ích giữa doanh nghiệp, khách hàng và xã hội. Chúng tôi hướng đến mục tiêu là doanh nghiệp
                        cung cấp dịch vụ kỹ thuật, vận hành khai thác hạ tầng mạng lưới và quản lý khách hàng viễn
                        thông; đầu tư và hợp tác cung cấp dịch vụ viễn thông, giải pháp CNTT hàng đầu Việt Nam.
                     </p>
                  </div>
               </div>{" "}
               {/* 2x2 Grid Layout with offset second column */}
               <Row gutter={[32, 32]} style={{ maxWidth: "1200px", margin: "0 auto" }}>
                  {/* First Column Items (1, 3) */}
                  <Col xs={24} lg={12}>
                     <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        {visionMission
                           .filter((_, index) => index % 2 === 0)
                           .map((item, index) => (
                              <Card key={item.number} className="bg-white rounded">
                                 <div className="p-4">
                                    <div className="flex justify-center mb-4">
                                       <div className="bg-blue-600 text-center text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                                          {item.number}
                                       </div>
                                    </div>
                                    <Image
                                       src={item.image}
                                       alt={`Vision ${item.number}`}
                                       width={400}
                                       height={300}
                                       className="w-full rounded-lg object-cover"
                                    />
                                 </div>
                                 <div className="p-6">
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                 </div>
                              </Card>
                           ))}
                     </Space>
                  </Col>

                  {/* Second Column Items (2, 4) - Offset lower */}
                  <Col xs={24} lg={12} style={{ marginTop: "lg" }}>
                     <div style={{ marginTop: "120px" }}>
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                           {visionMission
                              .filter((_, index) => index % 2 === 1)
                              .map((item, index) => (
                                 <Card key={item.number} className="bg-white rounded">
                                    <div className="p-4">
                                       <div className="flex justify-center mb-4">
                                          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                                             {item.number}
                                          </div>
                                       </div>
                                       <Image
                                          src={item.image}
                                          alt={`Vision ${item.number}`}
                                          width={400}
                                          height={300}
                                          className="w-full rounded-lg object-cover"
                                       />
                                    </div>
                                    <div className="p-6">
                                       <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                 </Card>
                              ))}
                        </Space>
                     </div>
                  </Col>
               </Row>
            </div>
         </section>{" "}
         {/* Leadership Section */}
         <section className="relative py-20 bg-gradient-to-br bg-white overflow-hidden">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-6xl font-extrabold text-black mb-4 font-serif">Cơ cấu tổ chức</h2>
                  <div className="w-24 h-1 bg-white mx-auto"></div>
               </div>

               <div className="max-w-7xl mx-auto">
                  {" "}
                  {/* Two Column Layout: Organizational Chart + Leadership */}
                  <Row gutter={[48, 32]} align="top">
                     {/* Left Column - Organizational Chart */}
                     <Col xs={24} lg={8}>
                        {" "}
                        <div className="flex justify-center">
                           <Card className="bg-white/10 backdrop-blur-sm" styles={{ body: { padding: "32px" } }}>
                              <Image
                                 src="/assets/images/so-do-to-chuc-cong-ty.png"
                                 alt="Sơ đồ tổ chức công ty"
                                 width={400}
                                 height={400}
                                 className="w-full max-w-md rounded-xl object-contain"
                                 style={{ width: "400px", height: "400px" }}
                              />
                           </Card>
                        </div>
                     </Col>{" "}
                     {/* Right Column - Leadership in Blue Box */}
                     <Col xs={24} lg={16}>
                        <Card
                           className="backdrop-blur-sm shadow-2xl"
                           style={{
                              borderRadius: "2rem 0 2rem 0",
                              backgroundColor: "#1e3a8a" // blue-900
                           }}
                           styles={{ body: { padding: "32px" } }}>
                           {/* Chairman Section - Full Width */}
                           {leaders
                              .filter((leader) => leader.isChairman)
                              .map((chairman) => (
                                 <div key={chairman.id} className="pb-12 w-full">
                                    <Row gutter={[32, 16]} align="middle">
                                       <Col xs={24} md={12}>
                                          <div className="text-3xl font-bold text-white mb-4">{chairman.name}</div>
                                          <div className="text-center text-white text-lg">{chairman.position}</div>
                                       </Col>
                                       <Col xs={24} md={12}>
                                          <div className="relative">
                                             {/* White thin border box offset to top-left */}
                                             <div
                                                className="absolute -top-3 -left-3 border-2 border-white shadow-lg z-0 max-w-xs mx-auto"
                                                style={{ width: "320px", height: "177px" }}></div>
                                             <Image
                                                src={chairman.image}
                                                alt={chairman.name}
                                                width={350}
                                                height={200}
                                                className="relative w-full max-w-xs mx-auto shadow-xl object-cover z-10"
                                                style={{ width: "350px" }}
                                             />
                                          </div>
                                          <div className="text-white text-sm italic mt-4 text-center">
                                             &ldquo;{chairman.quote}&rdquo;
                                          </div>
                                       </Col>
                                    </Row>
                                 </div>
                              ))}

                           {/* Other Leaders - Three Columns */}
                           <Row gutter={[24, 24]}>
                              {leaders
                                 .filter((leader) => !leader.isChairman)
                                 .map((leader) => (
                                    <Col key={leader.id} xs={24} md={8}>
                                       <div className="flex flex-col items-center pb-4">
                                          <div className="mb-4">
                                             <Image
                                                src={leader.image}
                                                alt={leader.name}
                                                width={250}
                                                height={290}
                                                className="w-full h-48 object-cover shadow-lg"
                                                style={{ width: "250px", height: "290px" }}
                                             />
                                          </div>
                                          <div className="text-white text-lg font-bold mt-3 text-center">
                                             {leader.name}
                                          </div>
                                          <div className="text-center text-white text-sm">
                                             {leader.position.split("\n").map((line, index) => (
                                                <span key={index}>
                                                   {line}
                                                   {index < leader.position.split("\n").length - 1 && <br />}
                                                </span>
                                             ))}
                                          </div>
                                       </div>
                                    </Col>
                                 ))}
                           </Row>
                        </Card>
                     </Col>
                  </Row>
               </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
         </section>
         {/* Certificates Section */}
         <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
               <div className="text-center mb-12">
                  <h2 className="text-6xl font-extrabold font-serif text-black mb-4">Chứng nhận và thành tích</h2>
               </div>{" "}
               <Row gutter={[32, 32]} justify="center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                  <Col xs={24} md={12}>
                     <Card styles={{ body: { padding: "16px" } }}>
                        <Image
                           src="/assets/images/bang-khen-1.jpg"
                           alt="Bằng khen 1"
                           width={400}
                           height={300}
                           className="w-full h-full object-cover rounded-lg"
                        />
                     </Card>{" "}
                  </Col>
                  <Col xs={24} md={12}>
                     <Card styles={{ body: { padding: "16px" } }}>
                        <Image
                           src="/assets/images/bang-khen-2.jpg"
                           alt="Bằng khen 2"
                           width={400}
                           height={300}
                           className="w-full h-full object-cover rounded-lg"
                        />
                     </Card>
                  </Col>
               </Row>
            </div>
         </section>
      </>
   );
}
