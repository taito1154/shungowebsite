"use client";

import Header from "@/components/header";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // GSAPのプラグインをインポート
import "@/app/globals.css"; // ✅ これで `global.css` を適用

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="top">
      <Header />
      {children}
    </div>
  );
}
