"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // ルーターを取得

  const handleHomeClick = () => {
    router.push("/"); // ルートの `page.tsx` に遷移
    setIsOpen(false); // メニューを閉じる
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* ヘッダーの黒背景を修正 */}
      <div className="w-full bg-transparent shadow-md flex items-center justify-between p-3 ">
        {/* 左側：ロゴ */}
        <Link href="/" className="text-2xl font-bold text-white">
          Shungo Hirata
        </Link>

        {/* 右側：ハンバーガーメニュー */}
        <button
          className="text-3xl text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* ドロップダウンメニュー（ヘッダー直下に表示） */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-5 mt-2 w-48 bg-transparent shadow-lg rounded-md overflow-hidden"
        >
          <nav className="flex flex-col text-white text-lg">
            <button
              className="px-5 py-3 text-left hover:bg-gray-600 transition-colors"
              onClick={handleHomeClick}
            >
              Home
            </button>
            {["About", "Works", "Contact"].map((text) => (
              <Link
                key={text}
                href={`/${text.toLowerCase()}`}
                className="px-5 py-3 hover:bg-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {text}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
