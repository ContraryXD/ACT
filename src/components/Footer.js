import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigation, contact, interested } from "../data/menu";

export default function Footer() {
   return (
      <footer className="bg-footer-background">
         <div className="w-full justify-center">
            {" "}
            <div className="sm:flex mx-auto items-center justify-center px-30 py-8">
               <div className="mt-6 lg:mt-0 lg:flex-1 justify-center">
                  {" "}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
                     <div className="flex flex-col md:col-span-3">
                        <h3 className="text-gray-700 capitalize dark:text-white font-serif font-bold text-xl">
                           Thông tin liên lạc
                        </h3>
                        {contact.map((item) => (
                           <a
                              key={item.name}
                              href={item.link || "#"}
                              className="flex items-center  mt-4 text-md text-gray-300 dark:text-gray-300 hover:underline">
                              {item.icon && (
                                 <FontAwesomeIcon icon={item.icon} className="text-gray-300 dark:text-gray-300 pe-4" />
                              )}
                              <span>{item.name}</span>
                           </a>
                        ))}
                     </div>

                     <div className="flex flex-col md:col-span-1">
                        <h3 className="text-gray-700 capitalize dark:text-white font-serif font-bold text-xl">
                           Các Trang
                        </h3>
                        {navigation.slice(0, 4).map((item) => (
                           <a
                              key={item.name}
                              href={item.href || "#"}
                              className="flex items-center  mt-4 text-md text-gray-300 dark:text-gray-300 hover:underline">
                              {item.name}
                           </a>
                        ))}
                     </div>

                     <div className="flex flex-col md:col-span-1">
                        <h3 className="text-gray-700 capitalize dark:text-white font-serif font-bold text-xl">
                           Đáng Quan Tâm
                        </h3>
                        {interested.map((item) => (
                           <a
                              key={item.name}
                              href={item.href || "#"}
                              className="flex items-center  mt-4 text-md text-gray-300 dark:text-gray-300 hover:underline">
                              {item.name}
                           </a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <hr className="w-screen h-px my-6 text-white" />
            <div className="pb-5">
               <p className="text-center text-white">© 2024 ACT All Rights Reserved</p>
            </div>
         </div>
      </footer>
   );
}
