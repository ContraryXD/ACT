"use client";

import CarouselBanner from "../../components/Home/CarouselBanner";
import PartnersCustomers from "../../components/Home/PartnersCustomers";
import ProvidingService from "../../components/Home/ProvidingService";
import TypicalProject from "../../components/Home/TypicalProject";
import History from "./History";
import Info from "./Info";

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
