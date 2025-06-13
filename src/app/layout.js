import "./globals.css";
import AntdCompat from "@/lib/antd-compat";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <AntdCompat />
            <Header />
            <main>{children}</main>
            <Footer />
         </body>
      </html>
   );
}
