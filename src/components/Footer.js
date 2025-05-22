"use client"; // Add "use client" directive

import { useState, useEffect } from "react"; // Import hooks
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"; // Keep these for mapping

// Helper to map icon strings to icon objects
const iconMap = {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
};

export default function Footer() {
  const [navigation, setNavigation] = useState([]);
  const [contact, setContact] = useState([]);
  const [interested, setInterested] = useState([]);

  useEffect(() => {
    // Fetch navigation data
    fetch("http://localhost:3000/api/navigation")
      .then((res) => res.json())
      .then(setNavigation)
      .catch(() => setNavigation([])); // Handle error

    // Fetch contact data
    fetch("http://localhost:3000/api/contact")
      .then((res) => res.json())
      .then(setContact)
      .catch(() => setContact([])); // Handle error

    // Fetch interested data
    fetch("http://localhost:3000/api/interested")
      .then((res) => res.json())
      .then(setInterested)
      .catch(() => setInterested([])); // Handle error
  }, []);

  return (
    <footer className="bg-footer-background">
      <div className="w-full justify-center">
        <div className="sm:flex mx-auto items-center justify-center mb-15  p-15 pb-3">
          <div className="mt-6 lg:mt-0 lg:flex-1 justify-center">
            <div className="grid grid-cols-20">
              <div className="col-span-7">
                <h3 className="text-gray-700 uppercase dark:text-white font-['Lora'] font-semibold">Theo Dõi Fanpage Tuyển Dụng ACT</h3>
                <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  Tec
                </a>
              </div>

              <div className="col-span-8">
                <h3 className="text-gray-700 uppercase dark:text-white font-serif font-bold">Liên lạc</h3>
                {contact.map(
                  (
                    item // Use fetched contact data
                  ) => (
                    <a key={item.name} href={item.link || "#"} className="flex items-center gap-2 mt-2 text-md text-gray-600 dark:text-gray-400 hover:underline">
                      {/* Map icon string to icon object */}
                      {item.icon && iconMap[item.icon] && <FontAwesomeIcon icon={iconMap[item.icon]} className="text-gray-500 dark:text-gray-400" />}
                      <span>{item.name}</span>
                    </a>
                  )
                )}
              </div>

              <div className="col-span-2">
                <h3 className="text-gray-700 uppercase dark:text-white font-serif font-bold">Các Trang</h3>
                {navigation.slice(0, 3).map(
                  (
                    item // Use fetched navigation data
                  ) => (
                    <a
                      key={item.name}
                      href={item.href || "#"} // Use item.href
                      className="block mt-2 text-md text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>

              <div className="col-span-3">
                <h3 className="text-gray-700 uppercase dark:text-white font-serif font-bold">Đáng Quan Tâm</h3>
                {interested.map(
                  (
                    item // Use fetched interested data
                  ) => (
                    <a
                      key={item.name}
                      href={item.href || "#"} // Use item.href
                      className="block mt-2 text-md text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="w-screen h-px my-6 bg-white" />
        <div className="pb-5">
          <p className="text-center text-white">© 2024 ACT All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
