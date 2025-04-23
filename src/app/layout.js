import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <Header />
            <main>{children}</main>
            <Footer />
         </body>
      </html>
   );
}
