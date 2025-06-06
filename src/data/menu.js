import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export const navigation = [
   { name: "Trang chủ", href: "/" },
   { name: "Giới thiệu", href: "/about" },
   { name: "Dịch vụ", href: "/services" },
   { name: "Dự án", href: "" },
   { name: "Bản tin", href: "" },
   { name: "Tuyển dụng", href: "" },
   { name: "Liên hệ", href: "" }
];

export const contact = [
   { name: "info@vienthongact.vn", link: "", icon: faEnvelope },
   { name: "(028) 62924609", link: "", icon: faPhone },
   {
      name: "Số 2R-2R1 Bình Giã, Phường 13, Quận Tân Bình, Tp.HCM",
      link: "https://maps.app.goo.gl/sqfS347XzcRccij37",
      icon: faMapMarkerAlt
   },
   { name: "Công ty Cổ phần Viễn thông ACT", link: "https://www.facebook.com/ACTTelecomJSC", icon: faFacebookF }
];

export const interested = [
   { name: "Nhà thông minh", href: "#" },
   { name: "Các dịch vụ", href: "#" },
   { name: "Liên hệ", href: "#" }
];

export const carouselImages = [
   "/assets/img/home_bannertop_1.jpg",
   "/assets/img/home_bannertop_2.jpg",
   "/assets/img/home_bannertop_3.jpg"
];
