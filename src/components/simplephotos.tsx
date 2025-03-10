import Image from "next/image";

const Photos = () => {
  return (
    <div className="flex flex-col space-y-80 w-screen items-start photo-container">
      <div className="photo photo1 flex  items-center gap-12 w-full border-b-4 border-gray-300 ">
        <Image
          src="/photo/Guilty1.jpg" // 画像のパスを指定
          alt="Photo1"
          width={500}
          height={500}
          className="object-cover
          rounded-lg
          shadow-lg
          opacity-0
          flex-shrink-0"
        />
        <div className="flex flex-col ml-[240px]">
          <p className="description1 text-6xl sm:text-8xl text-left opacity-0 text-black">
            Guilty
          </p>
          <p className="description1 text-6xl text-left opacity-0 text-black">
            BE:FIRST
          </p>
        </div>
      </div>
      <div className="photo photo2 flex items-center gap-12 w-full  border-b-4 border-gray-300 ">
        <div className="flex flex-col ml-[250px]">
          <p className="description2 text-6xl sm:text-8xl  text-left opacity-0 text-black w-full">
            DLEAGUE
          </p>
          <p className="description2 text-6xl text-left opacity-0 text-black w-full ">
            Avex Royal Brats
          </p>
        </div>
        <div className="relative w-[500px] h-[500px]">
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
      <div className="photo photo3 flex items-center gap-12 w-full border-b-4 border-gray-300 ">
        <Image
          src="/photo/IWONDER.jpg"
          alt="Photo3"
          width={500}
          height={500}
          className="object-cover rounded-lg shadow-lg opacity-0 flex-shrink-0"
        />
        {/* 説明文をラップ */}
        <div className="flex flex-col ml-[240px]">
          <p className="description3 text-6xl sm:text-8xl text-left opacity-0 text-black">
            IWONDER
          </p>
          <p className="description3 text-6xl text-left opacity-0 text-black">
            Daice
          </p>
        </div>
      </div>

      {/* 他の写真も追加 */}
    </div>
  );
};

export default Photos;
