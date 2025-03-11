import Image from "next/image";
import Link from "next/link";

const Photos = () => {
  return (
    <div className="flex flex-col space-y-36 sm:space-y-80 w-full items-center photo-container">
      <div className="photo photo1 flex flex-col lg:flex-row ipad-pro:flex-col items-center gap-4 sm:gap-12 w-full bg-transparent">
        <Link href="/works/Guilty" className="pointer-events-none">
          <div className=" relative w-[300px] sm:w-[500px] md:w-[400px] lg:w-[500px] h-[300px] sm:h-[500px] md:h-[400px] lg:h-[500px] transition-transform duration-500 hover:scale-105 pointer-events-none">
            <Image
              src="/photo/Guilty1.jpg" // 画像のパスを指定
              alt="Photo1"
              fill
              className="
            Guilty
            object-contain
          rounded-lg
          shadow-lg
          opacity-0
          flex-shrink-0
          pointer-events-auto
          "
            />
          </div>
        </Link>

        <div className="flex flex-col ml-0 lg:ml-[240px]  ipad-pro:ml-0 group">
          <Link
            href="/works/Guilty"
            className="description1 text-3xl sm:text-8xl text-left opacity-0 text-white group-hover:text-gray-400"
          >
            Guilty
          </Link>
          <Link
            href="/works/Guilty"
            className="description1 text-2xl sm:text-6xl text-left opacity-0 text-white group-hover:text-gray-400"
          >
            BE:FIRST
          </Link>
        </div>
      </div>
      <div className="photo photo2 flex flex-col-reverse lg:flex-row ipad-pro:flex-col-reverse items-center gap-4 sm:gap-8 w-full  bg-transparent">
        <div className="flex flex-col ml-0 lg:ml-[150px] ipad-pro:ml-0 group">
          <Link
            href="/works/DLEAGUE"
            className="description2 text-3xl sm:text-8xl  text-left opacity-0 text-white w-full group-hover:text-gray-400"
          >
            DLEAGUE
          </Link>
          <Link
            href="/works/DLEAGUE"
            className="description2 text-2xl sm:text-6xl text-left opacity-0 text-white w-full group-hover:text-gray-400"
          >
            Avex Royal Brats
          </Link>
        </div>
        <Link href="/works/DLEAGUE" className="pointer-events-none">
          <div className=" relative w-[300px] sm:w-[500px] md:w-[400px] lg:w-[500px] h-[300px] sm:h-[500px] md:h-[400px] lg:h-[500px] transition-transform duration-500 hover:scale-105 pointer-events-none">
            <Image
              src="/photo/ARB.jpg" // 画像のパスを指定
              alt="Photo2"
              fill
              className="
          rounded-lg
          shadow-lg
          opacity-0
          flex-shrink-0
          object-contain
          bg-white
          pointer-events-auto"
            />
          </div>
        </Link>
      </div>
      <div className="photo photo3 flex flex-col lg:flex-row ipad-pro:flex-col items-center gap-4 sm:gap-12 w-full bg-transparent ">
        <Link href="/works/Iwonder" className="pointer-events-none">
          <div className=" relative w-[300px] sm:w-[500px] md:w-[400px] lg:w-[500px] h-[300px] sm:h-[500px] md:h-[400px] lg:h-[500px] transition-transform duration-500 hover:scale-105 pointer-events-none">
            <Image
              src="/photo/IWONDER.jpg"
              alt="Photo3"
              fill
              className="object-contain rounded-lg shadow-lg opacity-0 flex-shrink-0 pointer-events-auto"
            />
          </div>
        </Link>
        {/* 説明文をラップ */}
        <div className="flex flex-col ml-0 lg:ml-[240px]  ipad-pro:ml-0 group ">
          <Link
            href="/works/Iwonder"
            className="description3 text-3xl sm:text-8xl text-left opacity-0 text-white group-hover:text-gray-400"
          >
            IWONDER
          </Link>
          <Link
            href="/works/Iwonder"
            className="description3 text-2xl sm:text-6xl text-left opacity-0 text-white group-hover:text-gray-400"
          >
            Daice
          </Link>
        </div>
      </div>

      {/* 他の写真も追加 */}
    </div>
  );
};

export default Photos;
