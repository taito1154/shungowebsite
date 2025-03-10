"use client";

import BigButton from "@/components/big-button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsDark(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay },
    }),
  };

  return (
    <div className="relative flex flex-col items-center h-screen py-10">
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: isDark ? 0.5 : 1 }}
        transition={{ duration: 1 }}
      >
        <source src="/video/Shungo.mp4" type="video/mp4" />
      </motion.video>
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
        className="title-font text-4xl md:text-8xl font-extrabold mb-12"
      >
        Shungo Hirata
      </motion.h1>

      <div className="absolute top-1/3 left-5 md:left-10 flex flex-col space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="absolute top-1/3 left-5 md:left-10 flex flex-col space-y-6"
        >
          {["About", "Works", "Contact"].map((text, index) => (
            <motion.div
              key={text}
              custom={2.5 + index * 0.2}
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={`/${text.toLowerCase()}`}
                className="title-font text-2xl md:text-7xl font-semibold hover:underline"
              >
                {text}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
