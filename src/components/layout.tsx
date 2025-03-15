"use client";

import Header from "@/components/header";
import Headerpc from "@/components/headerpc";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/app/globals.css";
import Lenis from "@studio-freight/lenis";

// プラグインを登録
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis の初期化
    const lenis = new Lenis({
      duration: 1.2, // スクロールの慣性時間（秒）
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // カスタムイージング
      smoothWheel: true, // マウスホイールでのスムーズスクロールを有効化
    });

    // Lenis の RAF ループ
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // ScrollTrigger と Lenis を連携するための scrollerProxy 設定
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value ?? 0);
        }
        return lenis.scroll || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      // ここでは lenis.update() を呼ばない
    };
  }, []);

  return (
    <div className="top">
      <Header />
      <Headerpc />
      {children}
    </div>
  );
}
