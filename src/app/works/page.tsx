"use client";

import Image from "next/image";
import backScreen from "@/components/bg";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Header from "@/components/header";
import Layout from "@/components/layout";
import Photos from "@/components/Photo";
import Simplephotos from "@/components/simplephotos";
import gsap from "gsap"; // GSAPをインポート
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  // Lenis の初期化
  useEffect(() => {
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
    requestAnimationFrame(raf);

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

    const isMobile = window.innerWidth <= 767;
    const xValue = isMobile ? 0 : 100;
    const xStart = isMobile ? 0 : 200;

    gsap.to(".photo1 img", {
      opacity: 1,
      x: xValue,
      scrollTrigger: {
        trigger: ".photo1",
        start: "top bottom",
        end: "center center",
        markers: true,
        scrub: true,
      },
    });
    gsap.to(".description1", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".photo1",
        start: "top bottom",
        end: "center center",
        markers: true,
        scrub: true,
      },
    });

    gsap.fromTo(
      ".photo2 img",
      { opacity: 0, x: xStart },
      {
        opacity: 1,
        x: xValue,
        scrollTrigger: {
          trigger: ".photo2",
          start: "top bottom", // 要素の上端がビューポートの下端に来たら開始
          end: "center center", // 要素の中央がビューポートの中央に来たら終了
          markers: true,
          scrub: true,
        },
      }
    );
    gsap.to(".description2", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".photo2",
        start: "top bottom",
        end: "center center",
        markers: true,
        scrub: true,
      },
    });
    gsap.to(".photo3 img", {
      opacity: 1,
      x: xValue,
      scrollTrigger: {
        trigger: ".photo3",
        start: "top bottom",
        end: "center center",
        markers: true,
        scrub: true,
      },
    });
    gsap.to(".description3", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".photo3",
        start: "top bottom",
        end: "center center",
        markers: true,
        scrub: true,
      },
    });
    // ✅ ページ遷移時に ScrollTrigger をリセット
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.refresh();
    };
  }, []); // ✅ `useEffect` の依存関係を修正

  return (
    <Layout>
      <div className="relative bg-slate-300 pb-96 photo-containers  overflow-x-hidden">
        <h1 className="title-font text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-bold text-black text-center sm:py-80 py-[400px]">
          Works
        </h1>

        <Simplephotos />
      </div>
    </Layout>
  );
}
