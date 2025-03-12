"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TransitionLink } from "@/components/transitionlink";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showTransition, setShowTransition] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);
  useEffect(() => {
    const timeoutDark = setTimeout(() => setIsDark(true), 8000);
    const timeoutTransition = setTimeout(() => setShowTransition(false), 5500);
    const timeoutMain = setTimeout(() => setMainVisible(true), 1000);
    // ページ読み込み後、1秒後に motion.h1 を生成する
    const timeoutLoaded = setTimeout(() => setLoaded(true), 1);

    return () => {
      clearTimeout(timeoutDark);
      clearTimeout(timeoutTransition);
      clearTimeout(timeoutMain);
      clearTimeout(timeoutLoaded);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 6 } },
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
        <div className="typewriter-wrapper bg-slate-500">
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
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              animation: fadeOut 2s ease-out forwards 3.5s;
            }
            .typewriter-text {
              display: inline-block;
              line-height: 1.5;
              color: black;
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
          animate={{ opacity: isDark ? 0.3 : 1 }}
          transition={{ duration: 1 }}
        >
          <source src="/video/Shungo.mp4" type="video/mp4" />
        </motion.video>
        {/* loaded が true になった後に motion.h1 を新しく生成 */}
        {loaded && (
          <div className="absolute pointer-events-none">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="title-font text-4xl md:text-8xl font-extrabold mb-12"
              transition={{ duration: 1 }}
            >
              Shungo Hirata
            </motion.h1>
          </div>
        )}
      </div>

      <div className="absolute top-1/3 left-5 md:left-10 flex flex-col space-y-6">
        {["About", "Works", "Contact"].map((text, index) => (
          <motion.div
            key={text}
            custom={7 + index * 0.4}
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            <TransitionLink
              href={`/${text.toLowerCase()}`}
              className="title-font text-2xl md:text-7xl font-semibold hover:underline"
            >
              {text}
            </TransitionLink>
          </motion.div>
        ))}
      </div>
    </>
  );
}
