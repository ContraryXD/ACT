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

// Define the default size constants - INCREASE THESE VALUES
const defaultWidth = 280;
const defaultHeight = 200;
// Define the default style object

const partners = [
   {
      key: 1,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={FptLogo} alt="FptLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 2,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={VtLogo} alt="VtLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 3,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={DienPhucThanhLogo} alt="DienPhucThanhLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 4,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={HungLocPhatLogo} alt="HungLocPhatLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 5,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={MobifoneLogo} alt="MobifoneLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 6,
      // Apply defaultStyle with borderRadius
      imageSmall: (
         <Image src={PicityHighParkLogo} alt="PicityHighParkLogo" width={defaultWidth} height={defaultHeight} />
      )
   },
   {
      key: 7,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={NamLongLogo} alt="NamLongLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 8,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={CharmCityLogo} alt="CharmCityLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 9,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={XuanMaiCorpLogo} alt="XuanMaiCorpLogo" width={defaultWidth} height={defaultHeight} />
   },
   {
      key: 10,
      // Apply defaultStyle with borderRadius
      imageSmall: <Image src={CMCTelecomLogo} alt="CMCTelecomLogo" width={defaultWidth} height={defaultHeight} />
   }
];

export default partners;
