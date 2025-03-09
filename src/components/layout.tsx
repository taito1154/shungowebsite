"use client";

import Header from "@/components/header";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // GSAPのプラグインをインポート

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16">
      <Header />
      {children}
    </div>
  );
}
