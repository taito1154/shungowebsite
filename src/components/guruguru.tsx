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
  const viewBoxPadding = 100;
  const originalSize = 300;
  const viewBoxSize = originalSize + viewBoxPadding;
  const offset = 150 - viewBoxSize / 2;
  const diameter = radius * 2;
  const pathD = `M150,150 m-${radius},0 a${radius},${radius} 0 1,1 ${diameter},0 a${radius},${radius} 0 1,1 -${diameter},0`;

  // オリジナルでは circumference を利用していたが、削除してみる
  // const circumference = 2 * Math.PI * radius;

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
            fill="black"
            fontSize="16"
            textAnchor="middle"
            // textLength={circumference}  ← ここを削除
            // lengthAdjust="spacingAndGlyphs"  ← ここも削除
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
