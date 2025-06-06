import "@/lib/fontawesome";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <Header />
            <main>{children}</main>
            <Footer />
         </body>
      </html>
   );
}
