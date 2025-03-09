import Image from "next/image";

const Photos = () => {
  return (
    <div className="flex flex-col items-start photo-container">
      <div className="photo w-full max-w-md border-b-4 border-gray-300 opacity-1">
        <Image
          src="/photo/Guilty1.jpg" // 画像のパスを指定
          alt="Photo 1"
          width={500}
          height={500}
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="photo w-full max-w-md border-b-4 border-gray-300 opacity-1">
        <Image
          src="/photo/Guilty1.jpg" // 画像のパスを指定
          alt="Photo 2"
          width={500}
          height={500}
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="photo w-full max-w-md border-b-4 border-gray-300 opacity-1">
        <Image
          src="/photo/Guilty1.jpg" // 画像のパスを指定
          alt="Photo 3"
          width={500}
          height={500}
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      {/* 他の写真も追加 */}
    </div>
  );
};

export default Photos;
