import Image from "next/image";
import Header from "@/components/header";
import Layout from "@/components/layout";
import RotatingText from "@/components/guruguru";
import YouTubePlayer from "@/components/youtubeplayer";
import BackScreenShader from "@/components/backscreenshader";
import BackBackScreen from "@/components/tukaerukamohaikei";
import { TransitionLink } from "@/components/transitionlink";
export default function Guilty() {
  return (
    <Layout>
      <div className="flex flex-col h-screen py-10 bg-transparent relative ">
        <div className="fixed inset-0 z-[-1]">
          <BackBackScreen />
          <BackScreenShader />
          <div className="hidden lg:block ipad-pro:hidden">
            <div className="fixed inset-0  ">
              <RotatingText
                radius={380}
                containerClassName="mt-2"
                circleClassName="rotate-360"
                duration="20s"
                textClassName="font-bold text-4xl"
                text="Guilty　Check My Chereo! 　Click Here!! 　Check My Chereo! 　Click Here!! 　Check My Chereo! ...Click Here!! 　Check My Chereo! ...Click Here!! 　Check My Chereo! ..."
              />
            </div>
            <div className="fixed inset-10  ">
              <RotatingText
                radius={400}
                containerClassName="mt-2"
                circleClassName="rotate-360"
                duration="25s"
                textClassName="font-bold text-4xl"
                text="Guilty　Check My Chereo!  　Check My Chereo! 　 ... Guilty　Check My Chereo!  　Check My Chereo! 　 ... Guilty　Check My Chereo!  　Check My Chereo! 　 ..."
              />
            </div>
          </div>

          <div className="hidden md:block ipad-pro:block lg:hidden">
            <div className="fixed inset-28  ">
              <RotatingText
                radius={330}
                containerClassName="mt-2"
                circleClassName="rotate-360"
                duration="20s"
                textClassName="font-bold text-6xl"
                text="Guilty　Check My Chereo! 　Click Here!! 　Check My Chereo! 　Click Here!! 　Check My Chereo! ...Click Here!! 　Check My Chereo! ...Click Here!! 　Check My Chereo! ..."
              />
            </div>
            <div className="fixed inset-40  ">
              <RotatingText
                radius={360}
                containerClassName="mt-2"
                circleClassName="rotate-360"
                duration="25s"
                textClassName="font-bold text-6xl"
                text="Guilty　Check My Chereo!  　Check My Chereo! 　 ... Guilty　Check My Chereo!  　Check My Chereo! 　 ... Guilty　Check My Chereo!  　Check My Chereo! 　 ..."
              />
            </div>
          </div>
          <div className="flex sm:hidden">
            <div className="fixed inset-0  ">
              <RotatingText
                radius={300}
                containerClassName="mt-2"
                circleClassName="rotate-360"
                duration="20s"
                textClassName="font-bold text-4xl"
                text="Guilty　Check My Chereo! 　Click Here!! 　Check My Chereo! 　Click Here!! 　Check My Chereo! ...Click Here!! 　Check My Chereo! ...Click Here!! 　Check My Chereo! ..."
              />
            </div>
            <div className="fixed inset-10  ">
              <RotatingText
                radius={330}
                containerClassName="mt-2"
                circleClassName="rotate-360"
                duration="25s"
                textClassName="font-bold text-4xl"
                text="Guilty　Check My Chereo!  　Check My Chereo! 　 ... Guilty　Check My Chereo!  　Check My Chereo! 　 ... Guilty　Check My Chereo!  　Check My Chereo! 　 ..."
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block ipad-pro:hidden">
          <div className="max-md:flex-col items-center justify-center">
            <h1 className="ml-32 mt-5 text-9xl font-bold text-white z-20 font-rampart">
              Guilty
            </h1>
            <h2 className="ml-32 title-font text-6xl font-bold text-white z-20 font-rampart">
              BE:FIRST
            </h2>
            <div className="absolute inset-0 mt-64">
              <YouTubePlayer
                videoId="GzWBhkSMFN8"
                className="w-[500px] mx-auto z-10 "
                thumbnailClassName=""
              />
            </div>
            <div className="font-rampart absolute bottom-32 right-32 p-4 text-white text-7xl z-20">
              2024/08/28
            </div>
          </div>
        </div>
        {/* Mobile レイアウト: sm未満 */}
        <div className="lg:hidden ipad-pro:flex flex flex-col items-center justify-center mt-[18vh]">
          <Header />
          <div className="flex items-center justify-center gap-4">
            {/* <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20">
              <TransitionLink href="/works/Iwonder">
                <Image
                  src="/photo/arrow.png"
                  alt="Prev"
                  fill
                  className="object-contain transform rotate-180 filter brightness-0 invert"
                />
              </TransitionLink>
            </div> */}
            <div>
              <h1 className="text-7xl md:text-9xl font-bold text-white z-10 font-rampart text-center">
                Guilty
              </h1>
              <h2 className="title-font text-4xl md:text-8xl font-bold text-white z-10 font-rampart text-center mt-2">
                BE:FIRST
              </h2>
            </div>
            {/* <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20">
              <TransitionLink href="/works/DLEAGUE">
                <Image
                  src="/photo/arrow.png"
                  alt="Next"
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </TransitionLink>
            </div> */}
          </div>
          <div className="mt-8 w-[80%]">
            <YouTubePlayer
              videoId="GzWBhkSMFN8"
              className="w-full mx-auto z-10"
              thumbnailClassName=""
            />
          </div>
          <div className="mt-8 font-rampart text-white text-5xl md:text-7xl">
            2024/08/28
          </div>
          <div className="fixed bottom-14 left-7 right-7 flex justify-between px-4 z-30">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20">
              <TransitionLink href="/works/Iwonder">
                <Image
                  src="/photo/arrow.png"
                  alt="Prev"
                  fill
                  className="object-contain transform rotate-180 filter brightness-0 invert"
                />
              </TransitionLink>
            </div>
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20">
              <TransitionLink href="/works/DLEAGUE">
                <Image
                  src="/photo/arrow.png"
                  alt="Next"
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </TransitionLink>
            </div>
          </div>
        </div>
        <div className="hidden fixed top-1/2 w-full justify-between px-40 z-30 transform -translate-y-1/2 lg:flex ipad-pro:hidden">
          <TransitionLink href="/works/Iwonder">
            <Image
              src="/photo/arrow.png"
              alt="Prev"
              width={70}
              height={70}
              className="transform rotate-180 filter brightness-0 invert"
            />
          </TransitionLink>
          <TransitionLink href="/works/DLEAGUE">
            <Image
              src="/photo/arrow.png"
              alt="Next"
              width={70}
              height={70}
              className="filter brightness-0 invert"
            />
          </TransitionLink>
        </div>
      </div>
    </Layout>
  );
}
