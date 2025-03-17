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
    // タイプライターのフェードアウトが 3.5～5.5 秒で完了するので、transition 表示は 5.5 秒以降に消す
    const timeoutTransition = setTimeout(() => setShowTransition(false), 5500);
    const timeoutMain = setTimeout(() => setMainVisible(true), 1000);
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
      {/* タイプライター風トランジション */}
      {showTransition && (
        <div className="typewriter-wrapper bg-slate-300">
          <h1
            className="typewriter-text text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ opacity: 0 }}
          >
            Choreograper
          </h1>
          <style>{`
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
              /* フェードアウト開始 3.5秒、2秒かけて消える */
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
                         show 0s 0.1s forwards,
                         blink 1s step-end infinite;
            }
            @keyframes show {
              to { opacity: 1; }
            }
            @keyframes typing {
              from { width: 0ch; }
              to { width: 11ch; }
            }
            @keyframes blink {
              from, to { border-color: transparent; }
              50% { border-color: white; }
            }
            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* フレームのアニメーション（画面周囲の 1px ライン） */}
      <div className="frame">
        <motion.div
          className="frame_line frame-left"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 5.5, duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="frame_line frame-right"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 5.6, duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="frame_line frame-top"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 5.7, duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="frame_line frame-bottom"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 5.8, duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* メインコンテンツ */}
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
        {loaded && (
          <div className="absolute pointer-events-none">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="title-font text-4xl md:text-8xl font-extrabold mb-12 mt-6"
              transition={{ duration: 1 }}
            >
              Shungo Hirata
            </motion.h1>
          </div>
        )}
      </div>

      <div className="absolute top-1/3 left-8 md:left-20 flex flex-col space-y-6">
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
              className="font-rampart text-4xl md:text-7xl font-semibold hover:underline"
            >
              {text}
            </TransitionLink>
          </motion.div>
        ))}
      </div>

      {/* ページ内でフレームのスタイルをグローバルに定義 */}
      <style>{`
        :root {
          --pad: max(20px, 4vmin);
        }
        .frame {
          position: fixed;
          left: var(--pad);
          right: var(--pad);
          top: var(--pad);
          bottom: var(--pad);
          pointer-events: none;
          overflow: hidden;
          z-index: 10;
        }
        .frame_line {
          transform-origin: center;
          position: absolute;
          background-color: white;
          opacity: 0;
        }
        .frame-left {
          left: 0;
          top: 0;
          width: 1px;
          height: 100%;
        }
        .frame-right {
          right: 0;
          top: 0;
          width: 1px;
          height: 100%;
        }
        .frame-top {
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
        }
        .frame-bottom {
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
        }
      `}</style>
    </>
  );
}
