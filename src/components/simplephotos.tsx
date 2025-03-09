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
        <p className="description1 text-6xl sm:text-8xl  text-left opacity-0 text-black ml-[300px] w-full whitespace-nowrap">
          Guilty
        </p>
      </div>
      <div className="photo photo2 flex items-center gap-12 w-full  border-b-4 border-gray-300 ">
        <p className="description2 text-6xl sm:text-8xl  text-left opacity-0 text-black w-full ml-[250px]">
          BE:FIRST
        </p>
        <Image
          src="/photo/Guilty1.jpg" // 画像のパスを指定
          alt="Photo2"
          width={500}
          height={500}
          className="object-cover
          rounded-lg
          shadow-lg
          opacity-0
          flex-shrink-0"
        />
      </div>
      <div className="photo photo3 flex items-center gap-12 w-full border-b-4 border-gray-300 ">
        <Image
          src="/photo/Guilty1.jpg" // 画像のパスを指定
          alt="Photo3"
          width={500}
          height={500}
          className="object-cover
          rounded-lg
          shadow-lg
          opacity-0
          flex-shrink-0"
        />
        <p className="description3 text-6xl sm:text-8xl  text-left opacity-0 text-black ml-[270px] w-full">
          IWONDER
        </p>
      </div>
      {/* 他の写真も追加 */}
    </div>
  );
};

export default Photos;
