"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

type TextureSet = { texture: THREE.Texture; aspect: number }[][];

export default function usePhotoLoader() {
  const [textures, setTextures] = useState<TextureSet>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const photoSets = [
      {
        name: "Guilty",
        photos: [
          "/photo/Guilty1.JPG",
          "/photo/Guilty2.jpg",
          "/photo/Guilty3.JPG",
        ],
      },
      {
        name: "IWonder",
        photos: [
          "/photo/IWonder1.jpg",
          "/photo/IWonder2.jpg",
          "/photo/IWonder3.JPG",
        ],
      },
      {
        name: "GENERATIONS",
        photos: ["/photo/GENE1.JPG", "/photo/GENE2.JPG", "/photo/GENE3.JPG"],
      },
      {
        name: "DLEAGUE",
        photos: [
          "/photo/DLEAGUE1.JPG",
          "/photo/DLEAGUE2.JPG",
          "/photo/DLEAGUE3.JPG",
        ],
      },
    ];

    const newTextures: TextureSet = [];
    let loadedCount = 0;
    const totalImages = photoSets.reduce(
      (sum, set) => sum + set.photos.length,
      0
    );

    photoSets.forEach((set, setIndex) => {
      newTextures[setIndex] = [];
      set.photos.forEach((path, photoIndex) => {
        textureLoader.load(
          path,
          (tex) => {
            const aspect = tex.image.width / tex.image.height;
            newTextures[setIndex][photoIndex] = { texture: tex, aspect };

            loadedCount++;
            if (loadedCount === totalImages) {
              setTextures(newTextures);
              setIsLoaded(true);
            }
          },
          undefined,
          (err) => console.error(`Failed to load texture at ${path}`, err)
        );
      });
    });
  }, []);

  return { textures, isLoaded };
}
