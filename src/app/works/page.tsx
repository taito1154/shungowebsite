"use client";

import Image from "next/image";
import backScreen from "@/components/bg";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Header from "@/components/header";
import Layout from "@/components/layout";
import Photos from "@/components/Photo";

export default function Works() {
  // ✅ タイトル・ジャンル・アーティストの状態を管理
  const [title, setTitle] = useState("Guilty");
  const [genre, setGenre] = useState("Coreography");
  const [artist, setArtist] = useState("BE:FIRST");
  return (
    <Layout>
      <div className="flex flex-col items-center h-screen py-10 bg-slate-300">
        <Header />
        <h1 className="text-sm sm:text-3xl md:text-5xl lg:text-7xl font-bold text-black ml-3 md:ml-10 mt-2 md:mt-5 self-start">
          Works
        </h1>

        <canvas
          id="glBackgroundCanvas"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    w-4/5 sm:w-3/4 md:w-1/3 lg:w-2/5 aspect-square z-8"
        ></canvas>

        {backScreen()}

        <canvas
          id="glCanvas"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    w-4/5 sm:w-3/4 md:w-1/3 lg:w-2/5 aspect-square z-10"
        ></canvas>
        <div className="absolute left-5 top-1/3 md:top-50 flex sm:flex-col-reverse md:flex-col items-start sm:w-full md:w-auto">
          {/* Title（小さい画面では canvas の上、大きい画面では左） */}
          <h2 className="text-sm sm:text-4xl md:text-6xl lg:text-8xl font-bold text-black">
            {title}
          </h2>

          {/* Genre & Artist（小さい画面では canvas の下、大きい画面では左） */}
          <div className="mt-2 sm:mt-5 md:mt-10 flex flex-col">
            <p className="text-xs sm:text-2xl md:text-4xl lg:text-7xl text-black">
              {genre}
            </p>
            <p className="text-xs sm:text-2xl md:text-4xl lg:text-7xl text-black">
              {artist}
            </p>
          </div>
        </div>

        {/* ✅ `Photos.tsx` で `setState` を受け取る */}
        <Photos setTitle={setTitle} setGenre={setGenre} setArtist={setArtist} />
      </div>
    </Layout>
  );
}
