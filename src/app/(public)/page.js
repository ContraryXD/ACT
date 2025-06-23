"use client";

import { useEffect } from "react";
import Home from "./Home/page";

export default function HomePage() {
  useEffect(() => {
    document.title = "Trang chủ | ACT Telecommunications";
  }, []);

  return <Home />;
}
