"use client";

import CarouselBanner from "./CarouselBanner";
import History from "./History";
import Info from "./Info";
import PartnersCustomers from "./PartnersCustomers";
import ProvidingService from "./ProvidingService";
import TypicalProject from "./TypicalProject";

export default function Home() {
   return (
      <div>
         <CarouselBanner />
         <History />
         <Info />
         <ProvidingService />
         <PartnersCustomers />
         <TypicalProject />
      </div>
   );
}
