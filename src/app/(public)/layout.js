import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
