import Image from "next/image";
import Header from "@/components/header";
import Layout from "@/components/layout";
import Background from "@/components/background";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <Layout>
      <Background />
      <div className="title-font flex flex-col items-center min-h-screen pt-36 md:pt-40  bg-transparent px-4">
        <Header />
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white pb-6">
          Contact
        </h1>
        <p className="text-1xl sm:text-3xl md:text-5xl text-white text-center mb-2">
          振付、レッスン、バックダンサー等の
        </p>
        <p className="text-1xl sm:text-3xl md:text-5xl text-white text-center mb-6">
          ご依頼は下記SNSのDMにて承っております。
        </p>

        {/* 白いカード */}
        <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl p-10 sm:p-16 md:p-20 bg-white rounded-xl shadow-2xl flex flex-col items-center space-y-8">
          <div className="flex space-x-8 sm:space-x-12">
            <a
              href="https://www.instagram.com/shungo.dnc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[100px] sm:text-[150px] md:text-[200px] text-pink-500 hover:text-pink-700 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/shungo_dnc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[100px] sm:text-[150px] md:text-[200px] text-black hover:text-gray-600 transition-colors"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
