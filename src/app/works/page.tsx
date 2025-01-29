"use client";

import Image from "next/image";
import backScreen from "@/components/bg";
import { useEffect, useRef } from "react";
import Header from "@/components/header";
import Layout from "@/components/layout";
import photo from "@/components/photo";

export default function Works() {
  const cleanupShaderRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cleanupShaderRef.current = photo();

    return () => {
      if (cleanupShaderRef.current) {
        cleanupShaderRef.current();
      }
    };
  }, []);
  return (
    <Layout>
      <div className="flex flex-col items-center h-screen py-10 bg-slate-300">
        <Header />
        <h1 className="text-7xl font-bold text-black">Works</h1>
        <canvas
          id="glBackgroundCanvas"
          className="absolute top-1/2 left-1/2  md:right-1/4 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0
          w-4/5 sm:w-3/4 md:w-1/3 lg:w-2/5 aspect-square z-8"
        ></canvas>
        {backScreen()}
        <canvas
          id="glCanvas"
          className="absolute top-1/2 left-1/2  md:right-1/4 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0
          w-4/5 sm:w-3/4 md:w-1/3 lg:w-2/5 aspect-square z-10"
        ></canvas>
      </div>
    </Layout>
  );
}
