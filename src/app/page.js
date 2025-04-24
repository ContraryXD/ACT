"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
   const images = [
      "/assets/img/home_bannertop_1.jpg",
      "/assets/img/home_bannertop_2.jpg",
      "/assets/img/home_bannertop_3.jpg"
   ];

   const [currentIndex, setCurrentIndex] = useState(0);
   const [timer, setTimer] = useState(null);

   // Function to reset the shuffle timer
   const resetTimer = () => {
      if (timer) clearInterval(timer);
      const newTimer = setInterval(() => {
         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
      setTimer(newTimer);
   };

   // Initialize the shuffle timer
   useEffect(() => {
      resetTimer();
      return () => clearInterval(timer); // Cleanup interval on component unmount
   }, [images.length]);

   // Function to go to the previous image
   const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      resetTimer(); // Reset the timer on user interaction
   };

   // Function to go to the next image
   const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      resetTimer(); // Reset the timer on user interaction
   };

   return (
      <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
         {/* Image Carousel */}
         <div
            className="relative w-full h-full flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => (
               <div key={index} className="relative flex-shrink-0 w-full h-full">
                  <Image
                     src={image}
                     alt={`Banner ${index + 1}`}
                     fill
                     className="object-cover" // Replaces objectFit="cover"
                     priority={index === currentIndex} // Prioritize loading the current image
                  />
               </div>
            ))}
         </div>

         {/* Navigation Buttons */}
         <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-3xl hover:text-gray-700 font-light">
            &#x276E; {/* Left Arrow (V shape) */}
         </button>
         <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-3xl hover:text-gray-700">
            &#x276F; {/* Right Arrow (V shape) */}
         </button>

         {/* Dots for Image Index */}
         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
               <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                     index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                  } transition-colors duration-300`}></div>
            ))}
         </div>
      </section>
   );
}
