import Image from "next/image";
import Layout from "@/components/layout";
import Background from "@/components/background";

export default function About() {
  return (
    <Layout>
      <Background />
      <div className="flex flex-col items-center min-h-screen py-24 bg-transparent">
        {/* 宣材写真 */}
        <div className="mb-8">
          <Image
            src="/photo/shungoartist.png"
            alt="宣材写真"
            width={400}
            height={400}
            className="rounded-full"
          />
        </div>

        {/* 基本情報 */}
        <div className="mb-8 p-8 bg-gray-800 rounded-lg text-white text-center max-w-6xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="title-font font-bold text-2xl sm:text-4xl">身長</p>
              <p className="title-font text-2xl sm:text-4xl">174cm</p>
            </div>
            <div>
              <p className="title-font font-bold text-2xl sm:text-4xl">体重</p>
              <p className="title-font text-2xl sm:text-4xl">78kg</p>
            </div>
            <div>
              <p className="title-font font-bold text-2xl sm:text-4xl">
                生年月日
              </p>
              <p className="title-font text-2xl sm:text-4xl">2001年2月28日</p>
            </div>
            <div>
              <p className="title-font font-bold text-2xl sm:text-4xl">出身</p>
              <p className="title-font text-2xl sm:text-4xl">福岡</p>
            </div>
            <div className="col-span-2">
              <p className="title-font font-bold text-2xl sm:text-4xl">趣味</p>
              <p className="title-font text-2xl sm:text-4xl">ファッション</p>
            </div>
          </div>
        </div>

        {/* 自己紹介文 */}
        <div className="mb-8 w-full max-w-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">self-introduction</h2>
          <p>
            2001年生まれ、福岡県出身。 21-22 SEASONのavex
            ROYALBRATSオーディションを勝ち抜き、福岡から上京。
            海外のスタイルを得意とするも、ブレイキンをやっていたりと様々なジャンルを学び、スキルを磨いてきた。
            2017年頃からEXILE、三代目 J Soul
            Brothers、GENERATIONSのサポートダンサーとして活動する。
            D.LEAGUEでの活動を機に、東京でも頭角を現し、レッスン・ナンバー等引っ張りだこである。
            さらに近年ではアーティスト「Da-iCE」や「BE:FIRST」などの振付も担当し、今後の活躍も注目である。
          </p>
        </div>

        {/* 実績セクション */}
        <div className="mb-8 w-full max-w-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">achievement</h2>
          <ul className="list-disc ml-6">
            <li>実績A: 説明文...</li>
            <li>実績B: 説明文...</li>
            <li>実績C: 説明文...</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
