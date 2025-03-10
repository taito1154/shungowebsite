"use client";

export default function FlowingBackground() {
  return (
    <>
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
        <div className="flowing-text-container">
          <div className="title-font flowing-text flowing-text-1 text-gray-500 opacity-50 text-4xl sm:text-[112px] whitespace-nowrap">
            Fukuoka kara kita
          </div>
          <div className="title-font flowing-text flowing-text-2 text-gray-500 opacity-50 text-3xl sm:text-[80px] whitespace-nowrap mt-[5rem]">
            Yaken ijittekuru
          </div>
          <div className="title-font flowing-text flowing-text-3 text-gray-500 opacity-50 text-6xl sm:text-[70px] whitespace-nowrap mt-[7rem]">
            yeah!!
          </div>
          <div className="title-font flowing-text flowing-text-4 text-gray-500 opacity-50 text-5xl sm:text-[100px] whitespace-nowrap mb-[8rem]">
            Chevrolet noritai
          </div>
          <div className="title-font flowing-text flowing-text-5 text-gray-500 opacity-50 text-7xl sm:text-[120px] whitespace-nowrap ">
            Brian is God
          </div>
        </div>
      </div>
      <style jsx>{`
        .flowing-text-container {
          position: absolute;
          top: 50%;
          right: 0;
          width: 100%;
          transform: translateY(-50%);
        }
        .flowing-text {
          animation-fill-mode: backwards;
        }
        .flowing-text-1 {
          animation: scrollText1 20s linear infinite;
        }
        .flowing-text-2 {
          animation: scrollText2 13s linear infinite;
          animation-delay: 0s;
        }
        .flowing-text-3 {
          animation: scrollText3 10s linear infinite;
          animation-delay: 0s;
        }
        .flowing-text-4 {
          animation: scrollText4 15s linear infinite;
          animation-delay: 0s;
        }
        .flowing-text-5 {
          animation: scrollText5 17.5s linear infinite;
          animation-delay: 0s;
        }
        @keyframes scrollText1 {
          0% {
            transform: translateX(100%) translateY(-50%);
          }
          100% {
            transform: translateX(-100%) translateY(-50%);
          }
        }
        @keyframes scrollText2 {
          0% {
            transform: translateX(100%) translateY(-50%);
          }
          100% {
            transform: translateX(-100%) translateY(-50%);
          }
        }
        @keyframes scrollText3 {
          0% {
            transform: translateX(100%) translateY(-50%);
          }
          100% {
            transform: translateX(-100%) translateY(-50%);
          }
        }
        @keyframes scrollText4 {
          0% {
            transform: translateX(100%) translateY(-50%);
          }
          100% {
            transform: translateX(-100%) translateY(-50%);
          }
        }
        @keyframes scrollText5 {
          0% {
            transform: translateX(100%) translateY(-50%);
          }
          100% {
            transform: translateX(-100%) translateY(-50%);
          }
        }
      `}</style>
    </>
  );
}
