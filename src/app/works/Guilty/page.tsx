import Image from "next/image";
import Header from "@/components/header";
import Layout from "@/components/layout";
import RotatingText from "@/components/guruguru";
import YouTubePlayer from "@/components/youtubeplayer";
import BackScreenShader from "@/components/backscreenshader";
import BackBackScreen from "@/components/tukaerukamohaikei";
export default function Guilty() {
  return (
    <Layout>
      <div className="flex flex-col h-screen py-10 bg-slate-300">
        <BackBackScreen />
        <BackScreenShader />

        <Header />
        <h1 className="ml-32 mt-5 text-9xl font-bold text-white z-10 font-rampart">
          Guilty
        </h1>
        <h2 className="ml-32 title-font text-6xl font-bold text-white z-10 font-rampart">
          BE:FIRST
        </h2>
        <div className="absolute inset-0 mt-64">
          <YouTubePlayer
            videoId="GzWBhkSMFN8"
            className="w-[400px] mx-auto z-10 "
            thumbnailClassName=""
          />
        </div>
        <div className="absolute inset-0 mt-10 ">
          <RotatingText
            radius={420}
            containerClassName="mt-2"
            circleClassName="rotate-360"
            duration="20s"
            textClassName="font-bold text-4xl"
            text="Guilty　Check My Chereo! 　Click Here!! 　Check My Chereo! 　Click Here!! 　Check My Chereo! ..."
          />
        </div>
        <div className="absolute inset-10 mt-10 ">
          <RotatingText
            radius={400}
            containerClassName="mt-2"
            circleClassName="rotate-360"
            duration="15s"
            textClassName="font-bold text-4xl"
            text="Guilty　Check My Chereo!  　Check My Chereo! 　 ..."
          />
        </div>
      </div>
    </Layout>
  );
}
