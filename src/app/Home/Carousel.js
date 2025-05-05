"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { carouselImages } from "@/data/menu";

export default function Carousel() {
   const [currentSlide, setCurrentSlide] = useState(1);
   const images = carouselImages;
   const totalSlides = images.length;
   const timerInterval = 5000;
   const timerRef = useRef(null);

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev % totalSlides) + 1);
      restartTimer();
   };

   const prevSlide = () => {
      setCurrentSlide((prev) => ((prev - 2 + totalSlides) % totalSlides) + 1);
      restartTimer();
   };

   const restartTimer = () => {
      if (timerRef.current) {
         clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(nextSlide, timerInterval);
   };

   useEffect(() => {
      timerRef.current = setInterval(nextSlide, timerInterval);
      return () => clearInterval(timerRef.current);
   }, []);

   return (
      <div className="carousel w-full overflow-hidden relative">
         {/* Carousel Images */}
         <div
            className="flex transition-transform duration-1000"
            style={{
               transform: `translateX(-${(currentSlide - 1) * 100}%)`
            }}>
            {images.map((image, index) => (
               <div key={index} className="w-full flex-shrink-0">
                  <Image
                     src={image}
                     className="w-full object-cover"
                     style={{ height: "600px" }}
                     alt={`Slide ${index + 1}`}
                     width={1920}
                     height={600}
                  />
               </div>
            ))}
         </div>

         {/* Navigation Buttons */}
         <div className="absolute left-5 right-5 top-3/5 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle cursor-pointer">
               ❮
            </button>
            <button onClick={nextSlide} className="btn btn-circle cursor-pointer">
               ❯
            </button>
         </div>

         {/* Dots for Image Index */}
         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
               <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                     index + 1 === currentSlide ? "bg-blue-500" : "bg-gray-400"
                  } transition-colors duration-300`}></div>
            ))}
         </div>
      </div>
   );
}
