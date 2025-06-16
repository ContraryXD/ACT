import "./globals.css";
import AntdCompat from "@/lib/antd-compat";
import AntdAppWrapper from "@/components/Layout/AntdAppWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdCompat />
        <AntdAppWrapper>{children}</AntdAppWrapper>
      </body>
    </html>
  );
}
