import Image from "next/image";
import Layout from "@/components/layout";
import Background from "@/components/background";

export default function About() {
  return (
    <Layout>
      <Background />
      {/* 全体を max-w-4xl に制限して中央寄せ */}
      <div className="w-full max-w-[21rem] sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col items-center min-h-screen py-24 bg-transparent">
        {/* 宣材写真 */}
        <div className="mb-16 w-[300px] sm:w-[380px] md:w-[450px] lg:w-[450px]">
          <Image
            priority
            src="/photo/shungoartist.png"
            alt="宣材写真"
            layout="responsive"
            width={500} // アスペクト比を保つための値
            height={500} // アスペクト比を保つための値
            className="rounded-full"
          />
        </div>

        {/* 基本情報セクション */}
        <div className="title-font mb-8 w-full">
          <div className="grid grid-cols-2 gap-6">
            <div className="border-b border-white pb-2">
              <p className="font-bold text-xl sm:text-3xl md:text-5xl">身長</p>
              <p className="text-xl sm:text-3xl md:text-5xl">174cm</p>
            </div>
            <div className="border-b border-white pb-2">
              <p className="font-bold text-xl sm:text-3xl md:text-5xl">体重</p>
              <p className="text-xl sm:text-3xl md:text-5xl">78kg</p>
            </div>
            <div className="border-b border-white pb-2">
              <p className="font-bold text-xl sm:text-3xl md:text-5xl">
                生年月日
              </p>
              <p className="text-xl sm:text-3xl md:text-5xl">2001年2月28日</p>
            </div>
            <div className="border-b border-white pb-2">
              <p className="font-bold text-xl sm:text-3xl md:text-5xl">出身</p>
              <p className="text-xl sm:text-3xl md:text-5xl">福岡</p>
            </div>
            <div className="border-b border-white pb-2 sm:col-span-2">
              <p className="font-bold text-xl sm:text-3xl md:text-5xl">趣味</p>
              <p className="text-xl sm:text-3xl md:text-5xl">ファッション</p>
            </div>
          </div>
        </div>

        {/* 自己紹介文 */}
        <div className="mb-8 w-full  text-white">
          <h2 className="text-2xl font-bold mb-4 md:text-5xl">
            self-introduction
          </h2>
          <p className="md:text-3xl">
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
        <div className="mb-8 w-full text-white">
          <h2 className="text-2xl font-bold mb-4 md:text-5xl">achievement</h2>
          <ul className="list-disc ml-6 md:text-3xl">
            <li>実績A: 説明文...</li>
            <li>実績B: 説明文...</li>
            <li>実績C: 説明文...</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
