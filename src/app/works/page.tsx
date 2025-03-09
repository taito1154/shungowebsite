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

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  useEffect(() => {
    let tl = gsap.timeline({
      snap: {
        snapTo: "labels", // snap to the closest label in the timeline
        duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        delay: 0.3, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
      },
      // timeline全体の設定
    });

    const photos = gsap.utils.toArray(".photo");

    gsap.to(photos, {
      xPercent: -1 * (photos.length - 1),
      // opacity: 1,
      scrollTrigger: {
        start: "start center",
        end: "bottom center",
        trigger: ".photo-container",
        markers: true,
        toggleActions: "play reverse play reverse",
        snap: 1 / (photos.length - 1),
      },
    });

    gsap.to(".photo2", {
      opacity: 1,
      scrollTrigger: {
        start: "start center",
        end: "bottom center",
        trigger: ".photo2",
        markers: true,
        toggleActions: "play reverse play reverse",
        snap: 0.5,
      },
    });

    gsap.to(".photo3", {
      opacity: 1,
      scrollTrigger: {
        start: "start center",
        end: "bottom center",
        trigger: ".photo3",
        markers: true,
        toggleActions: "play reverse play reverse",
        snap: 0.5,
      },
    });

    // ScrollTrigger.create({
    //   trigger: ".photo1", // 1つ目の画像をトリガーに
    //   start: "center center", // トリガー位置（画像の上部がビューポートの中心に来たら）
    //   end: "bottom top", // 画像の下部がビューポートの上部に来たら
    //   scrub: 1, // スクロールに合わせてアニメーション
    //   pin: true, // アニメーション中、画像をピン留めする
    // });
    // tl.addLabel("faidin").from(".photo1", {
    //   scale: 0,
    //   rotation: 45,
    //   autoAlpha: 0,
    // });
    // .addLabel("faidout")
    // .to(".photo1", { scale: 0, rotation: 45, opacity: 0 })
    // .addLabel("end");
    // ScrollTrigger.create({
    //   trigger: ".photo2", // 1つ目の画像をトリガーに
    //   start: "center center", // トリガー位置（画像の上部がビューポートの中心に来たら）
    //   end: "bottom top", // 画像の下部がビューポートの上部に来たら
    //   scrub: 1, // スクロールに合わせてアニメーション
    //   pin: true, // アニメーション中、画像をピン留めする
    // }),
    //   tl
    //     .addLabel("photo2faidin")
    //     .from(".photo2", { scale: 0, rotation: 45, autoAlpha: 0 })
    //     .addLabel("faidout")
    //     .to(".photo2", { scale: 0, rotation: 45, opacity: 0 })
    //     .addLabel("end");
    // ScrollTrigger.create({
    //   trigger: ".photo3", // 1つ目の画像をトリガーに
    //   start: "center center", // トリガー位置（画像の上部がビューポートの中心に来たら）
    //   end: "bottom top", // 画像の下部がビューポートの上部に来たら
    //   scrub: 1, // スクロールに合わせてアニメーション
    //   pin: true, // アニメーション中、画像をピン留めする
    // }),
    //   tl
    //     .addLabel("photo3faidin")
    //     .from(".photo3", { scale: 0, rotation: 45, autoAlpha: 0 })
    //     .addLabel("faidout")
    //     .to(".photo3", { scale: 0, rotation: 45, opacity: 0 })
    //     .addLabel("end");

    // .to("photo1")

    // tl.fromTo(
    //   ".photo1",
    //   { opacity: 0, scale: 0.5 },
    //   { opacity: 1, scale: 1, duration: 1 } // 1つ目の画像（フェードイン + 拡大）
    // ).fromTo(
    //   ".photo2",
    //   { opacity: 0, scale: 0.5, rotation: 45 },
    //   { opacity: 1, scale: 1, rotation: 0, duration: 1 } // 2つ目の画像（フェードイン + 回転）
    // );

    // ここで overscroll-behavior を制御したい場合
    // document.body.style.overscrollBehavior = "none";
    // document.documentElement.style.scrollBehavior = "smooth"; // スムーズスクロールを設定
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center py-10 bg-slate-300 photo-container">
        <Header />
        <h1 className="text-sm sm:text-3xl md:text-5xl lg:text-7xl font-bold text-black ml-3 md:ml-10 mt-2 md:mt-5 self-start">
          Works
        </h1>
        <Simplephotos />
      </div>
    </Layout>
  );
}
