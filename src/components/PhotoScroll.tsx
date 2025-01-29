"use client";

import { useState, useEffect } from "react";
import usePhotoLoader from "./PhotoLoader";

export default function usePhotoScroller() {
  const { textures, isLoaded } = usePhotoLoader();
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setCurrentSetIndex((prev) => (prev + 1) % textures.length);
      } else {
        setCurrentSetIndex(
          (prev) => (prev - 1 + textures.length) % textures.length
        );
      }
    };

    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, [isLoaded, textures.length]);

  return { textures, currentSetIndex, isLoaded };
}
