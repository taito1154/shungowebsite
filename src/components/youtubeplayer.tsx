"use client";
import { useState } from "react";
import ReactPlayer from "react-player/youtube";

interface YouTubePlayerProps {
  videoId: string;
  className?: string; // 外側のコンテナに適用するクラス（サイズ・配置）
  thumbnailClassName?: string;
  playerClassName?: string; // ReactPlayer の配置用クラス
}

export default function YouTubePlayer({
  videoId,
  className = "",
  thumbnailClassName = "",
  playerClassName = "absolute top-0 left-0", // デフォルトはトップ・左に固定
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => setIsPlaying(true);

  return (
    <div className={`relative aspect-video ${className}`}>
      {isPlaying ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
          className={playerClassName}
        />
      ) : (
        <div onClick={handleClick} className="absolute inset-0 cursor-pointer">
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="YouTube Video Thumbnail"
            className={`w-full h-full object-cover ${thumbnailClassName}`}
          />
          {/* 再生ボタンのオーバーレイ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="w-16 h-16 text-white opacity-80"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <polygon points="40,30 70,50 40,70" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
