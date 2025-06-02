import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import aboutImg from "@/assets/images/about_banner.jpg";
import bannerTongQuan from "@/assets/images/Banner_Tong_quan.jpg";
import vision1 from "@/assets/images/Vision_1.jpg";
import vision2 from "@/assets/images/Vision_2.jpg";
import vision3 from "@/assets/images/Vision_3.jpg";
import vision4 from "@/assets/images/Vision_4.jpg";
import chuTich from "@/assets/images/Hinh_Chu_tich.jpg";
import sepTuanAnh from "@/assets/images/Sep_Tuan_Anh.jpg";
import sepHung from "@/assets/images/Sep_Hung.jpg";
import sepLuan from "@/assets/images/Sep_Luan.jpg";
import bangKhen1 from "@/assets/images/bang-khen-1.jpg";
import bangKhen2 from "@/assets/images/bang-khen-2.jpg";
import logoACT from "@/assets/images/logo_ACT.png";
import bgBig from "@/assets/images/bg_big.jpg";
import bg1 from "@/assets/images/bg_1.png";
import statIcon1 from "@/assets/images/about_stat_1.svg";
import statIcon2 from "@/assets/images/about_stat_2.svg";
import statIcon3 from "@/assets/images/about_stat_3.svg";
import statIcon4 from "@/assets/images/about_stat_4.svg";
import statIcon5 from "@/assets/images/about_stat_5.svg";
import statIcon6 from "@/assets/images/about_stat_6.svg";

export default function About() {
  const title = "Về chúng tôi";
  const coreValues = [
    {
      letter: "A",
      title: "KHÁCH HÀNG LÀ TRUNG TÂM",
      description: "Đặt nhu cầu, mong muốn và trải nghiệm của khách hàng lên hàng đầu. Luôn thực hiện mọi nỗ lực để hiểu và đáp ứng kỳ vọng của khách hàng. Phản hồi của khách hàng là nền tảng của sự cải thiện và cải tiến liên tục.",
      color: "bg-blue-600",
    },
    {
      letter: "C",
      title: "TRUNG THỰC & CHÍNH TRỰC",
      description: "Trung thực trong giao tiếp và hành động không chỉ giúp xây dựng lòng tin mà còn là nền tảng cho sự phát triển. Luôn minh bạch trong giao tiếp và hành động để xây dựng niềm tin.",
      color: "bg-green-600",
    },
    {
      letter: "T",
      title: "CHUYÊN NGHIỆP",
      description: "Cách thể hiện sự tận tâm, chủ động, trách nhiệm và tôn trọng đối với công việc, đồng nghiệp và khách hàng. Kỷ luật & tự chủ không chỉ là tuân thủ nguyên tắc, quy trình mà còn là sự tự giác.",
      color: "bg-orange-600",
    },
  ];
  const visionMission = [
    {
      image: vision1,
      number: "1",
      description: "Trở thành doanh nghiệp cung cấp dịch vụ giải pháp tích hợp, vận hành khai thác và cho thuê hạ tầng số hàng đầu Việt Nam, gồm: vận hành khai thác hạ tầng mạng lưới như trạm BTS, mạng cáp quang truyền dẫn.",
    },
    {
      image: vision2,
      number: "2",
      description: "Chúng tôi không ngừng cải tiến quy trình công việc; đào tạo, bồi dưỡng để nâng cao kiến thức và kỹ năng chuyên nghiệp cho đội ngũ nhân viên. Từ đó giúp tối ưu giá thành, nâng cao chất lượng hạ tầng mạng lưới.",
    },
    {
      image: vision3,
      number: "3",
      description: "Trở thành doanh nghiệp hàng đầu trong lĩnh vực hợp tác đầu tư hạ tầng dự án viễn thông – công nghệ thông tin trong các khu dân cư, toà nhà cao tầng với chất lượng tốt nhất.",
    },
    {
      image: vision4,
      number: "4",
      description: "Hợp tác với các nhà mạng viễn thông, các đơn vị cung cấp giải pháp CNTT tốt nhất Việt Nam để cùng nhau xây dựng chuỗi giá trị các sản phẩm và dịch vụ viễn thông trong kỷ nguyên số.",
    },
  ];

  const leadership = [
    {
      name: "Trần Ngọc Thiều",
      position: "Chủ tịch HĐQT",
      image: chuTich,
      quote: "Dù việc lớn hay nhỏ đều phải làm cho thật chuyên nghiệp và chất lượng.",
    },
    {
      name: "Phạm Tuấn Anh",
      position: "Tổng Giám đốc",
      image: sepTuanAnh,
    },
    {
      name: "Đặng Trần Hùng",
      position: "Phó Tổng Giám đốc - Phụ trách Kỹ thuật",
      image: sepHung,
    },
    {
      name: "Nguyễn Đức Luân",
      position: "Phó Tổng Giám đốc - Phụ trách Vận hành khai thác",
      image: sepLuan,
    },
  ];

  const companyStats = [
    {
      number: "2011",
      label: "Năm thành lập",
      icon: "🏢",
    },
    {
      number: "1000+",
      label: "Nhân viên",
      icon: "👥",
    },
    {
      number: "12",
      label: "Trung tâm kỹ thuật",
      icon: "🏗️",
    },
    {
      number: "100+",
      label: "Dự án hoàn thành",
      icon: "✅",
    },
  ];
  const strengthPoints = [
    {
      icon: statIcon1,
      description: "Đội ngũ kỹ sư, kỹ thuật viên đông đảo với trên 1.000 người được đào tạo chính qui",
    },
    {
      icon: statIcon2,
      description: "Đội ngũ quản lý có kinh nghiệm và thâm niên trong nghề trên 10 năm",
    },
    {
      icon: statIcon3,
      description: "Địa bàn hoạt động rộng, gồm 01 Chi nhánh tại Hà Nội và 12 Trung tâm kỹ thuật khu vực tại Tp. HCM",
    },
    {
      icon: statIcon4,
      description: "Tình hình tài chính mạnh, khả năng kiểm soát dòng tiền tốt",
    },
    {
      icon: statIcon5,
      description: "Bộ máy được tổ chức bài bản, kiểm soát theo quy trình quy định trên hệ thống quản trị hiện đại",
    },
    {
      icon: statIcon6,
      description: "Nhiều kinh nghiệm thực hiện các dự án có tính quy mô lớn, yêu cầu chuyên nghiệp cao",
    },
  ];
  return (
    <>
      {" "}
      <BreadCrumb title={title} breadcrumbImg={aboutImg} />
      {/* New Company Overview Section with Offset Layout */}
      <section className="relative bg-gray-100 py-16 px-6 md:px-12 lg:px-20">
        {" "}
        <div className="max-w-7xl mx-auto">
          <div className="relative min-h-[600px] md:min-h-[550px] lg:min-h-[650px]">
            {/* Background Image with Logo - Top Left */}
            <div className="absolute top-0 left-0 w-full md:w-3/5 lg:w-3/5 h-[350px] md:h-[380px] lg:h-[420px] z-10">
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                <Image src={bannerTongQuan} alt="Company overview banner" fill className="object-cover" priority />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <Image src={logoACT} alt="ACT Logo" width={280} height={95} className="drop-shadow-lg" />
                </div>
              </div>
            </div>
            x{/* Content Box - Overlaying Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 w-full md:w-4/5 lg:w-4/5 h-[400px] md:h-[450px] lg:h-[500px] z-20 mt-8 md:mt-0">
              {" "}
              <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-xl border-t-4 border-blue-600 h-full overflow-hidden">
                <div className="mb-4">
                  <p className="text-xs text-center text-blue-600 uppercase tracking-wider mb-1 font-semibold">Tổng quan</p>
                  <h1 className="text-lg md:text-xl lg:text-3xl font-bold text-center text-gray-800 mb-1">Khái quát về Công ty</h1>
                  <h2 className="text-sm md:text-base lg:text-4xl font-bold text-center text-blue-900 mb-4">Cổ phần Viễn thông ACT</h2>
                </div>

                <div className="space-y-3 text-gray-700 leading-relaxed text-xs md:text-sm text-justify">
                  <p>
                    Công ty Cổ phần Viễn thông ACT thành lập ngày <strong>21 tháng 11 năm 2011</strong>. Hoạt động trên phạm vi toàn quốc, với các lĩnh vực kinh doanh thuộc ngành viễn thông như: Thiết kế hạ tầng viễn thông; Cho thuê hạ tầng viễn thông cáp quang; Thi công công trình viễn thông; Dịch vụ quản lý vận hành hạ tầng viễn thông; Cung cấp thiết bị truyền hình số; Cung cấp hàng hóa, thiết bị viễn thông; Cung cấp sản phẩm và giải pháp CNTT.
                  </p>
                  <p>Từ ngày thành lập đến nay, Công ty đã không ngừng nỗ lực để vươn tới sự phát triển lớn mạnh, bền vững với mục tiêu trở thành một trong những đơn vị đứng đầu về hợp tác đầu tư, quản lý vận hành kỹ thuật, cung cấp dịch vụ viễn thông cho khách hàng trong dự án và cho các doanh nghiệp tại Việt Nam.</p>
                  <p>Hiện nay, Công ty cổ phần Viễn thông ACT đang là đối tác hợp tác đầu tư, cung cấp dịch vụ của các đơn vị như: Tập đoàn Công nghiệp Viễn thông Quân đội Viettel, Tổng Công ty Viễn thông Mobifone, VNPT Thành phố Hồ Chí Minh, Công ty Cổ phần Viễn thông FPT, Công ty Cổ phần Đầu Tư Nam Long, Xuân Mai Corp, Công ty Cổ phần Đầu Tư Bất Động Sản Hưng Lộc Phát.</p>{" "}
                  <div className="bg-blue-50 p-3 md:p-4 rounded-lg border-l-4 border-blue-500 mt-3 shadow-sm">
                    <p className="font-medium text-blue-700 italic text-xs md:text-sm">Với phương châm đặt chất lượng dịch vụ lên hàng đầu, cùng với sự tận tâm và trách nhiệm, chúng tôi hoàn toàn tin tưởng sẽ đáp ứng được sự kỳ vọng của Quý Khách hàng một cách tốt nhất.</p>
                  </div>
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
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <Image src={bgBig} alt="Background" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src={bg1} alt="Background overlay" className="object-contain" />
          </div>
        </div>
        {/* Content */}
        <div className="relative z-10 container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {strengthPoints.map((strength, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-12 flex flex-col items-center text-center space-y-6 hover:bg-white/95 transition-all duration-300 transform hover:scale-105">
                <div className="bg-blue-900 text-white rounded-full p-6 w-20 h-20 flex items-center justify-center shadow-lg">
                  <Image src={strength.icon} alt={`Strength ${index + 1}`} width={32} height={32} className="filter brightness-0 invert" />
                </div>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">GIÁ TRỊ CỐT LÕI CỦA CÔNG TY GẮN LIỀN VỚI CHỮ VIẾT TẮT TÊN GỌI ACT, GỒM 3 GIÁ TRỊ</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">A</div>
                <h3 className="text-xl font-bold text-gray-800">KHÁCH HÀNG LÀ TRUNG TÂM</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">Đặt nhu cầu, mong muốn và trải nghiệm của khách hàng lên hàng đầu. Luôn thực hiện mọi nỗ lực để hiểu và đáp ứng kỳ vọng của khách hàng. Phản hồi của khách hàng là nền tảng của sự cải thiện và cải tiến liên tục. Tập trung nâng cao các giá trị và các dịch vụ trải nghiệm của khách hàng.</p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">C</div>
                <h3 className="text-xl font-bold text-gray-800">TRUNG THỰC & CHÍNH TRỰC</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">Trung thực trong giao tiếp và hành động không chỉ giúp xây dựng lòng tin mà còn là nền tảng cho sự phát triển. Luôn minh bạch trong giao tiếp và hành động để xây dựng niềm tin; Luôn thẳng thắn, nói thật ngay cả khi khó khăn hay khi có sai phạm.</p>
            </div>

            <div className="bg-orange-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">T</div>
                <h3 className="text-xl font-bold text-gray-800">CHUYÊN NGHIỆP</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">Cách thể hiện sự tận tâm, chủ động, trách nhiệm và tôn trọng đối với công việc, đồng nghiệp và khách hàng. Kỷ luật & tự chủ không chỉ là tuân thủ Nguyên tắc, quy trình, quy định mà còn là sự tự giác, chủ động trong công việc.</p>
            </div>
          </div>

          {/* Additional Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">HỢP TÁC & ĐOÀN KẾT</h3>
              <p className="text-gray-600 leading-relaxed">Sự gắn kết, hợp tác và hỗ trợ lẫn nhau giữa các thành viên để đạt được mục tiêu chung. Làm việc trên tinh thần hợp tác và phối hợp, tương trợ lẫn nhau khi khó khăn.</p>
            </div>

            <div className="bg-red-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">HỌC HỎI & SÁNG TẠO</h3>
              <p className="text-gray-600 leading-relaxed">Học hỏi & thích nghi, cải tiến & sáng tạo trong công việc để phát triển & nâng cao chất lượng, hiệu suất trong công việc cũng như sức mạnh cạnh tranh của DN.</p>
            </div>

            <div className="bg-teal-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">TRÁCH NHIỆM XÃ HỘI</h3>
              <p className="text-gray-600 leading-relaxed">Cam kết mang lại những tác động tích cực cho cộng đồng và xã hội. Luôn dành một phần lợi nhuận cho công tác xã hội, thiện nguyện để giúp đỡ các hoàn cảnh khó khăn.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Vision & Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">TẦM NHÌN – SỨ MỆNH</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">Công ty Cổ phần Viễn thông ACT phát triển bền vững trên nền tảng kết hợp hài hòa các giá trị về lợi ích giữa doanh nghiệp, khách hàng và xã hội. Chúng tôi hướng đến mục tiêu là doanh nghiệp cung cấp dịch vụ kỹ thuật, vận hành khai thác hạ tầng mạng lưới và quản lý khách hàng viễn thông; đầu tư và hợp tác cung cấp dịch vụ viễn thông, giải pháp CNTT hàng đầu Việt Nam.</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="space-y-12">
            {visionMission.map((item, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">{item.number}</div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""} flex justify-center`}>
                  <Image src={item.image} alt={`Vision ${item.number}`} width={400} height={300} className="rounded-lg shadow-md object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Leadership Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">CƠ CẤU TỔ CHỨC</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Image src={chuTich} alt="Trần Ngọc Thiều" width={200} height={250} className="w-full h-64 object-cover rounded-lg shadow-md mb-4" />
              <h3 className="text-lg font-bold text-gray-800">Trần Ngọc Thiều</h3>
              <p className="text-blue-600 font-medium">Chủ tịch Hội đồng Quản trị</p>
              <blockquote className="text-gray-600 italic text-sm mt-2">Dù việc lớn hay nhỏ đều phải làm cho thật chuyên nghiệp và chất lượng.</blockquote>
            </div>

            <div className="text-center">
              <Image src={sepTuanAnh} alt="Phạm Tuấn Anh" width={200} height={250} className="w-full h-64 object-cover rounded-lg shadow-md mb-4" />
              <h3 className="text-lg font-bold text-gray-800">Phạm Tuấn Anh</h3>
              <p className="text-blue-600 font-medium">Tổng Giám đốc</p>
            </div>

            <div className="text-center">
              <Image src={sepHung} alt="Đặng Trần Hùng" width={200} height={250} className="w-full h-64 object-cover rounded-lg shadow-md mb-4" />
              <h3 className="text-lg font-bold text-gray-800">Đặng Trần Hùng</h3>
              <p className="text-blue-600 font-medium">Phó Tổng Giám đốc</p>
              <p className="text-gray-500 text-sm">Phụ trách Kỹ thuật</p>
            </div>

            <div className="text-center">
              <Image src={sepLuan} alt="Nguyễn Đức Luân" width={200} height={250} className="w-full h-64 object-cover rounded-lg shadow-md mb-4" />
              <h3 className="text-lg font-bold text-gray-800">Nguyễn Đức Luân</h3>
              <p className="text-blue-600 font-medium">Phó Tổng Giám đốc</p>
              <p className="text-gray-500 text-sm">Phụ trách Vận hành khai thác</p>
            </div>
          </div>
        </div>
      </section>
      {/* Certificates Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">CHỨNG NHẬN VÀ THÀNH TÍCH</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image src={bangKhen1} alt="Bằng khen 1" width={400} height={300} className="w-full h-64 object-cover rounded-lg" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image src={bangKhen2} alt="Bằng khen 2" width={400} height={300} className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
