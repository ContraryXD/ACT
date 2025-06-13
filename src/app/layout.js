import "./globals.css";
import AntdCompat from "@/lib/antd-compat";
import AntdAppWrapper from "@/components/Layout/AntdAppWrapper";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <AntdCompat />
            <AntdAppWrapper>
               <Header />
               <main>{children}</main>
               <Footer />
            </AntdAppWrapper>
         </body>
      </html>
   );
}
