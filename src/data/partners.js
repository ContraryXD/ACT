import Image from "next/image"; // Import the Next.js Image component

import FptLogo from "@/assets/images/FPT_Logo.png";
import VtLogo from "@/assets/images/Viettel_Logo.png";
import DienPhucThanhLogo from "@/assets/images/DienPhucThanh_Logo.png";
import HungLocPhatLogo from "@/assets/images/HungLocPhat_Logo.png";
import MobifoneLogo from "@/assets/images/Mobifone_Logo.png";
import NamLongLogo from "@/assets/images/NamLong_Logo.png";
import PicityHighParkLogo from "@/assets/images/PicityHighPark_Logo.png";
import CharmCityLogo from "@/assets/images/Charm_City_Logo.png";
import XuanMaiCorpLogo from "@/assets/images/XuanMaiCorp_Logo.png";
import CMCTelecomLogo from "@/assets/images/CMC_Telecom_Logo.png";

const partners = [
   {
      key: 1,
      imageSmall: <Image src={FptLogo} alt="FptLogo" width={150} height={80} />
   },
   {
      key: 2,
      imageSmall: <Image src={VtLogo} alt="VtLogo" width={150} height={80} />
   },
   {
      key: 3,
      imageSmall: <Image src={DienPhucThanhLogo} alt="DienPhucThanhLogo" width={150} height={80} />
   },
   {
      key: 4,
      imageSmall: <Image src={HungLocPhatLogo} alt="HungLocPhatLogo" width={150} height={80} />
   },
   {
      key: 5,
      imageSmall: <Image src={MobifoneLogo} alt="MobifoneLogo" width={150} height={80} />
   },
   {
      key: 6,
      imageSmall: <Image src={PicityHighParkLogo} alt="PicityHighParkLogo" width={150} height={80} />
   },
   {
      key: 7,
      imageSmall: <Image src={NamLongLogo} alt="NamLongLogo" width={150} height={80} />
   },
   {
      key: 8,
      imageSmall: <Image src={CharmCityLogo} alt="CharmCityLogo" width={150} height={80} />
   },
   {
      key: 9,
      imageSmall: <Image src={XuanMaiCorpLogo} alt="XuanMaiCorpLogo" width={150} height={80} />
   },
   {
      key: 10,
      imageSmall: <Image src={CMCTelecomLogo} alt="CMCTelecomLogo" width={150} height={80} />
   }
];

export default partners;
