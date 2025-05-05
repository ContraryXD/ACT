import Image from "next/image";

// Import the image sources (adjust paths as needed)
import SilverStar from "@/assets/images/Silver_Star_01.jpg"; // Assuming .jpg, adjust if different
import Encogreen from "@/assets/images/Eco_Green_01.jpg"; // Assuming .jpg, adjust if different
import Greenriver from "@/assets/images/Green_River_01.jpg"; // Assuming .jpg, adjust if different
import MizukiPart from "@/assets/images/Mizuky_01.jpg"; // Assuming .jpg, adjust if different

// Define default dimensions for the images (adjust as needed)
const defaultProjectWidth = 400;
const defaultProjectHeight = 300;

const listTypicalProjects = [
   {
      key: 1,
      imge: (
         <Image
            src={SilverStar}
            alt="Hưng Phát Silver Star"
            width={defaultProjectWidth}
            height={defaultProjectHeight}
         />
      ),
      tilte: "HƯNG PHÁT SILVER STAR",
      content: "* HƯNG PHÁT SILVER STAR - Công trình BĐS của Hưng Lộc Phát* ACT - [...]",
      status: "completed"
   },
   {
      key: 2,
      imge: <Image src={Encogreen} alt="Ecogreen" width={defaultProjectWidth} height={defaultProjectHeight} />,
      tilte: "ECOGREEN",
      content: "* ECOGREEN - Công trình BĐS của Công ty Đầu tư xây dựng Xuân Mai * [...]",
      status: "working"
   },
   {
      key: 3,
      imge: <Image src={Greenriver} alt="Green River" width={defaultProjectWidth} height={defaultProjectHeight} />,
      tilte: "GREEN RIVER",
      content: "* GREEN RIVER: Công trình BĐS của Công ty TNHH 276 Ngọc Long * ACT - [...]",
      status: "completed"
   },
   {
      key: 4,
      imge: <Image src={MizukiPart} alt="Mizuki Park" width={defaultProjectWidth} height={defaultProjectHeight} />,
      tilte: "Dự án MIZUKI PARK",
      content: "** MIZUKI PARK - Công trình BĐS của Công ty CP Đầu Tư Nam Long * [...]",
      status: "completed"
   }
];

export default listTypicalProjects; // Make sure to export the array
