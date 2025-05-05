"use client";

import { Carousel, ConfigProvider } from "antd"; // Import ConfigProvider
import Image from "next/image";
import { carouselImages } from "@/data/menu";

export default function CarouselBanner() {
   const images = carouselImages;

   const carouselSettings = {
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      dotPosition: "bottom",
      infinite: true,
      speed: 500,
      arrows: true,
      waitForAnimate: true
   };

   const contentStyle = {
      margin: 0,
      height: "600px",
      color: "#fff",
      lineHeight: "600px",
      textAlign: "center",
      background: "#f0f2f5",
      overflow: "hidden"
   };

   // Define the theme configuration for Carousel dots
   const themeConfig = {
      components: {
         Carousel: {
            dotWidth: 10,
            dotHeight: 10,
            dotActiveWidth: 10,
            arrowOffset: 20
         }
      }
   };

   return (
      <ConfigProvider theme={themeConfig}>
         <div className="carousel-banner-wrapper" style={{ marginTop: "0px" }}>
            <Carousel {...carouselSettings}>
               {images.map((imageSrc, index) => (
                  <div key={index}>
                     <div style={contentStyle}>
                        <Image
                           src={imageSrc}
                           alt={`Slide ${index + 1}`}
                           width={1920}
                           height={600}
                           style={{ width: "100%", height: "100%", objectFit: "cover" }}
                           priority={index === 0}
                        />
                     </div>
                  </div>
               ))}
            </Carousel>
         </div>
      </ConfigProvider>
   );
}
