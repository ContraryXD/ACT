import BreadCrumb from "@/components/BreadCrumb";
import aboutImg from "@/assets/images/about_banner.jpg";

export default function About() {
   const title = "Về chúng tôi";

   return (
      <>
         <BreadCrumb title={title} breadcrumbImg={aboutImg} />
      </>
   );
}
