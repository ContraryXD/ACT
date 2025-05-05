"use client";

import Carousel from "./Carousel";
import History from "./History";
import Info from "./Info";
import PartnersCustomers from "./PartnersCustomers";
import ProvidingService from "./ProvidingService";

export default function Home() {
   return (
      <div>
         <Carousel />
         <History />
         <Info />
         <ProvidingService />
         <PartnersCustomers />
      </div>
   );
}
