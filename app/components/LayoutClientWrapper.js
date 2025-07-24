"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();
  const hideHeader = pathname === "/";

  return (
    <>
      {!hideHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
