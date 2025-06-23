import "./globals.css";
import AntdCompat from "@/lib/antd-compat";
import AntdAppWrapper from "@/components/Layout/AntdAppWrapper";

export const metadata = {
  title: {
    default: "ACT Telecommunications - Công ty Cổ phần Viễn thông ACT",
    template: "%s | ACT Telecommunications",
  },
  description: "Công ty Cổ phần Viễn thông ACT - Chuyên cung cấp các giải pháp viễn thông, CNTT và dịch vụ truyền hình số chuyên nghiệp.",
  keywords: "viễn thông, ACT, telecommunications, CNTT, truyền hình số, hạ tầng viễn thông",
  authors: [{ name: "ACT Telecommunications" }],
  creator: "ACT Telecommunications",
  publisher: "ACT Telecommunications",
  openGraph: {
    title: "ACT Telecommunications - Công ty Cổ phần Viễn thông ACT",
    description: "Chuyên cung cấp các giải pháp viễn thông, CNTT và dịch vụ truyền hình số chuyên nghiệp.",
    type: "website",
    locale: "vi_VN",
    siteName: "ACT Telecommunications",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

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
