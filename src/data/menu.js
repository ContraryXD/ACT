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
   { name: "info@vienthongact.vn", link: "mailto:info@vienthongact.vn", icon: faEnvelope },
   { name: "(028) 62924609", link: "tel:02862924609", icon: faPhone },
   {
      name: "Số 2R-2R1 Bình Giã, Phường 13, Quận Tân Bình, Tp.HCM",
      link: "https://www.google.com/maps?q=Số+2R-2R1+Bình+Giã,+Phường+13,+Quận+Tân+Bình,+Tp.HCM",
      icon: faMapMarkerAlt
   }
];

export const interested = [
   { name: "Nhà thông minh", href: "#tuyen-dung" },
   { name: "Các dịch vụ", href: "#dich-vu" },
   { name: "Liên hệ", href: "#du-an" }
];

export const carouselImages = [
   "/assets/img/home_bannertop_1.jpg",
   "/assets/img/home_bannertop_2.jpg",
   "/assets/img/home_bannertop_3.jpg"
];
