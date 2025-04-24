"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import Image from "next/image";
import { navigation } from "@/data/menu";
import Link from "next/link";

export default function Header() {
   const [isOpen, setIsOpen] = useState(false);
   const pathname = usePathname(); // Get the current route

   return (
      <header className="w-full sticky top-0 z-50 shadow-sm">
         <nav className="relative bg-white flex items-center justify-between px-6 py-6">
            {/* Logo */}
            <Link href="/" className="flex items-center">
               <Image src="/assets/img/logo_site.png" alt="Logo" width={110} height={55} className="ms-3" />
            </Link>

            {/* Hamburger Menu Button */}
            <button
               className="lg:hidden text-gray-900 focus:outline-none"
               onClick={() => setIsOpen(!isOpen)}
               aria-label="Toggle Menu">
               <div className="relative w-10 h-6">
                  {/* Top Line */}
                  <span
                     className={`absolute top-0 left-0 w-full h-[1.5px] bg-gray-900 transform transition-transform duration-300 ${
                        isOpen ? "rotate-45 translate-y-[12.5px]" : ""
                     }`}></span>
                  {/* Middle Line */}
                  <span
                     className={`absolute top-[12.5px] left-0 w-full h-[1.5px] bg-gray-900 transition-all duration-300 ${
                        isOpen ? "-translate-x-4 opacity-0" : "translate-x-0 opacity-100"
                     }`}></span>
                  {/* Bottom Line */}
                  <span
                     className={`absolute top-[25px] left-0 w-full h-[1.5px] bg-gray-900 transform transition-transform duration-300 ${
                        isOpen ? "-rotate-45 -translate-y-[12.5px]" : ""
                     }`}></span>
               </div>
            </button>

            {/* Navigation Links */}
            <ul
               className={`${
                  isOpen ? "flex" : "hidden"
               } lg:flex flex-col lg:flex-row lg:space-x-1.5 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50`}>
               {navigation.map((item, index) => (
                  <li key={index} className="text-left lg:text-left">
                     <a
                        href={item.href}
                        className={`block lg:inline-block transition duration-300 tracking-tight text-[22px] font-semibold px-4 py-2 lg:py-0 ${
                           pathname === item.href
                              ? "text-blue-800" // Active link color
                              : "text-gray-700 hover:text-blue-800" // Default link color
                        }`}>
                        {item.name}
                     </a>
                  </li>
               ))}
            </ul>
         </nav>
      </header>
   );
}
