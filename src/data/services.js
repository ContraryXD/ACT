import Image from "next/image";

import iconCNTT from "@/assets/images/cung_cap_san_pham_giai_phap_cntt.jpg";
import iconTHS from "@/assets/images/cung_cap_truyen_hinh_so.jpg";
import iconTelecommunication from "@/assets/images/dau_tu_ha_tang_vien_thong.jpg";
import iconOpticalFiberT from "@/assets/images/vien_thong_cap_quang.jpg";
import iconStationManagement from "@/assets/images/ql_vhkt_ha_tang_vien_thong.png";
import iconTelecommunicationProjects from "@/assets/images/thi_cong_cong_trinh_vien_thong.jpg";

const ServiceItems = [
   {
      key: 1,
      icon: <Image src={iconCNTT} alt="iconCNTT" width={500} height={500} />, // Adjust width/height as needed
      title: "Cung cấp sản phẩm, giải pháp CNTT",
      content:
         "Cung cấp sản phẩm & giải pháp CNTT. Giải pháp nhà thông minh rạng đông. Kiến tạo cuộc sống, hoà hợp với thiên nhiên, thông minh hạnh phúc …"
   },
   {
      key: 2,
      icon: <Image src={iconTHS} alt="iconTHS" width={500} height={500} />, // Adjust width/height and alt text
      title: "Cung cấp truyền hình số",
      content: "Cung cấp dịch vụ viễn thông cho các khách hàng trong dự án và cho các doanh nghiệp Việt Nam."
   },
   {
      key: 3,
      icon: <Image src={iconTelecommunication} alt="iconTelecommunication" width={500} height={500} />, // Adjust width/height and alt text
      title: "Đầu tư hạ tầng viễn thông", // Note: Duplicate title with key 2
      content:
         "Chia sẻ, sử dụng chung hạ tầng kỹ thuật viễn thông xu thế tất yếu, mang lại nhiều lợi ích cho doanh nghiệp và xã hội. Việc này không chỉ góp phần bảo đảm mỹ quan đô thị mà còn giúp tiết kiệm chi phí đầu tư cho các doanh nghiệp viễn thông."
   },
   {
      key: 4,
      icon: <Image src={iconOpticalFiberT} alt="iconOpticalFiberT" width={500} height={500} />, // Adjust width/height and alt text
      title: "Hạ tầng viễn thông cáp quang",
      content:
         "Công ty Cổ phần Viễn thông ACT đang là đối tác hợp tác đầu tư, cung cấp dịch vụ của các đơn vị như: Tập đoàn Công nghiệp Viễn thông Quân đội Viettel,…"
   },
   {
      key: 5,
      icon: <Image src={iconStationManagement} alt="iconStationManagement" width={500} height={500} />, // Adjust width/height and alt text
      title: "Quản lý, vận hành khai thác hạ tầng viễn thông",
      content:
         "Trực tiếp Vận hành, khai thác các hệ thống CNTT đảm bảo hệ thống hoạt động ổn định phục vụ sự phát triển CNTT & Viễn thông."
   },
   {
      key: 6,
      icon: <Image src={iconTelecommunicationProjects} alt="iconTelecommunicationProjects" width={500} height={500} />, // Adjust width/height and alt text
      title: "Thi công công trình viễn thông",
      content:
         "Khảo sát, thi công kéo ngầm mạng cáp đồng và cáp quang theo yêu cầu khách hàng. Bảo trì, bảo dưỡng hạ tầng viễn thông (các tuyến cáp, hầm cống, tủ cáp,…)"
   }
];

export default ServiceItems;
