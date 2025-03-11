import Image from "next/image";

const Photos = () => {
  return (
    <div className="flex flex-col space-y-36 sm:space-y-80 w-full items-center photo-container">
      <div className="photo photo1 flex flex-col lg:flex-row ipad-pro:flex-col items-center gap-4 sm:gap-12 w-full bg-transparent md:pt-64">
        <div className="relative w-[300px] sm:w-[500px] md:w-[400px] lg:w-[500px] h-[300px] sm:h-[500px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/photo/Guilty1.jpg" // 画像のパスを指定
            alt="Photo1"
            // width={500}
            // height={500}
            fill
            className="object-contain
          rounded-lg
          shadow-lg
          opacity-0
          flex-shrink-0"
          />
        </div>
        <div className="flex flex-col ml-0 lg:ml-[240px]  ipad-pro:ml-0">
          <p className="description1 text-3xl sm:text-8xl text-left opacity-0 text-white">
            Guilty
          </p>
          <p className="description1 text-2xl sm:text-6xl text-left opacity-0 text-white">
            BE:FIRST
          </p>
        </div>
      </div>
      <div className="photo photo2 flex flex-col-reverse lg:flex-row ipad-pro:flex-col-reverse items-center gap-4 sm:gap-8 w-full  bg-transparent ">
        <div className="flex flex-col ml-0 lg:ml-[150px] ipad-pro:ml-0">
          <p className="description2 text-3xl sm:text-8xl  text-left opacity-0 text-white w-full">
            DLEAGUE
          </p>
          <p className="description2 text-2xl sm:text-6xl text-left opacity-0 text-white w-full ">
            Avex Royal Brats
          </p>
        </div>
        <div className="relative w-[300px] sm:w-[500px] md:w-[400px] lg:w-[500px] h-[300px] sm:h-[500px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/photo/ARB.jpg" // 画像のパスを指定
            alt="Photo2"
            // width={500}
            // height={500}
            fill
            className="
          rounded-lg
          shadow-lg
          opacity-0
          flex-shrink-0
          object-contain
          bg-white"
          />
        </div>
      </div>
      <div className="photo photo3 flex flex-col lg:flex-row ipad-pro:flex-col items-center gap-4 sm:gap-12 w-full bg-transparent ">
        <div className="relative w-[300px] sm:w-[500px] md:w-[400px] lg:w-[500px] h-[300px] sm:h-[500px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/photo/IWONDER.jpg"
            alt="Photo3"
            // width={500}
            // height={500}
            fill
            className="object-contain rounded-lg shadow-lg opacity-0 flex-shrink-0"
          />
        </div>
        {/* 説明文をラップ */}
        <div className="flex flex-col ml-0 lg:ml-[240px]  ipad-pro:ml-0">
          <p className="description3 text-3xl sm:text-8xl text-left opacity-0 text-white">
            IWONDER
          </p>
          <p className="description3 text-2xl sm:text-6xl text-left opacity-0 text-white">
            Daice
          </p>
        </div>
      </div>

      {/* 他の写真も追加 */}
    </div>
  );
};

export default Photos;
