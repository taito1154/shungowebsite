"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [showTransition, setShowTransition] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsDark(true), 2000);
    // オーバーレイは10秒後に消す（fadeOut完了まで待つ）
    const timeout2 = setTimeout(() => setShowTransition(false), 10000);
    // Transition開始から1秒後にメインコンテンツを表示する
    const mainTimeout = setTimeout(() => setMainVisible(true), 1000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(mainTimeout);
    };
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
    <>
      {showTransition && (
        <div className="typewriter-wrapper">
          <h1
            className="typewriter-text text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ opacity: 0 }}
          >
            Shungo Hirata
          </h1>
          <style jsx>{`
            .typewriter-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: black;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              animation: fadeOut 2s ease-out forwards 3.5s;
            }
            .typewriter-text {
              display: inline-block;
              line-height: 1.5;
              color: white;
              overflow: hidden;
              white-space: nowrap;
              border-right: 2px solid white;
              width: 0ch;
              animation: typing 2s steps(13, end) forwards,
                show 0s 0.1s forwards, blink 1s step-end infinite;
            }
            @keyframes show {
              to {
                opacity: 1;
              }
            }
            @keyframes typing {
              from {
                width: 0ch;
              }
              to {
                width: 11ch;
              }
            }
            @keyframes blink {
              from,
              to {
                border-color: transparent;
              }
              50% {
                border-color: white;
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      <div
        className="relative flex flex-col items-center h-screen py-10"
        style={{ visibility: mainVisible ? "visible" : "hidden" }}
      >
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
        </div>
      </div>
    </>
  );
}
