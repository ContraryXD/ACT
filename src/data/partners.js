import Image from "next/image"; // Import the Next.js Image component

// Define the default size constants - INCREASE THESE VALUES
const defaultWidth = 280;
const defaultHeight = 200;

const partners = [
  {
    key: 1,
    imageSmall: <Image src="/assets/images/FPT_Logo.png" alt="FptLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 2,
    imageSmall: <Image src="/assets/images/Viettel_Logo.png" alt="VtLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 3,
    imageSmall: <Image src="/assets/images/DienPhucThanh_Logo.png" alt="DienPhucThanhLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 4,
    imageSmall: <Image src="/assets/images/HungLocPhat_Logo.png" alt="HungLocPhatLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 5,
    imageSmall: <Image src="/assets/images/Mobifone_Logo.png" alt="MobifoneLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 6,
    imageSmall: <Image src="/assets/images/PicityHighPark_Logo.png" alt="PicityHighParkLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 7,
    imageSmall: <Image src="/assets/images/NamLong_Logo.png" alt="NamLongLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 8,
    imageSmall: <Image src="/assets/images/Charm_City_Logo.png" alt="CharmCityLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 9,
    imageSmall: <Image src="/assets/images/XuanMaiCorp_Logo.png" alt="XuanMaiCorpLogo" width={defaultWidth} height={defaultHeight} />,
  },
  {
    key: 10,
    imageSmall: <Image src="/assets/images/CMC_Telecom_Logo.png" alt="CMCTelecomLogo" width={defaultWidth} height={defaultHeight} />,
  },
];

export default partners;
