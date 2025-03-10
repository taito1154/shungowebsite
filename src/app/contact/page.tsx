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
      <div className="title-font flex flex-col items-center h-screen pt-20 bg-transparent">
        <Header />
        <h1 className="text-8xl font-bold text-black pb-10">Contact</h1>
        <p className="text-4xl  text-gray-800 mb-4">
          振付、レッスン、バックダンサー等の
        </p>
        <p className="text-4xl  text-gray-800 mb-4">
          ご依頼は下記SNSのDMにて承っております。お気軽にご連絡下さい。
        </p>
        <div className="w-full max-w-3xl p-20 bg-white rounded-xl shadow-2xl flex flex-col items-center space-y-8">
          <div className="flex space-x-12">
            <a
              href="https://www.instagram.com/shungo.dnc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[200px] text-pink-500 hover:text-pink-700 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/shungo_dnc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[200px] text-black hover:text-gray-600 transition-colors"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
