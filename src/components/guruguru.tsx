import React from "react";

export default function RotatingText({
  containerClassName = "",
  textClassName = "",
  radius = 100,
  circleClassName = "",
  duration = "20s",
  text = "YOUR TEXT HERE",
}: {
  containerClassName?: string;
  textClassName?: string;
  radius?: number;
  circleClassName?: string;
  duration?: string;
  text?: string;
}) {
  // 余白を追加して viewBox を大きくする
  const viewBoxPadding = 100; // 追加する余白（調整可能）
  const originalSize = 300; // 元の viewBox サイズ
  const viewBoxSize = originalSize + viewBoxPadding; // 新しい viewBox の幅・高さ
  // 中心 (150,150) を固定するためのオフセット
  const offset = 150 - viewBoxSize / 2; // 例: viewBoxSize=400 → offset = 150 - 200 = -50

  const diameter = radius * 2;
  const pathD = `M150,150 m-${radius},0 a${radius},${radius} 0 1,1 ${diameter},0 a${radius},${radius} 0 1,1 -${diameter},0`;

  // 円の周囲の長さ（circumference）＝ 2 * π * radius
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`flex justify-center items-center w-full h-full bg-transparent ${containerClassName}`}
    >
      <div className="relative w-full h-full overflow-visible">
        <svg
          viewBox={`${offset} ${offset} ${viewBoxSize} ${viewBoxSize}`}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          className={`absolute inset-0 animate-spin pointer-events-none w-full h-full ${circleClassName}`}
          style={{ animationDuration: duration }}
        >
          <defs>
            <path id="circlePath" d={pathD} />
          </defs>
          <text
            fill="white"
            fontSize="16"
            textAnchor="middle"
            textLength={circumference}
            lengthAdjust="spacingAndGlyphs"
            className={textClassName}
          >
            <textPath href="#circlePath" startOffset="50%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
