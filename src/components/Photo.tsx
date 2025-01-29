// components/Photo.tsx
"use client"; // クライアントコンポーネントとして指定

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const Photos: React.FC = () => {
  // Hooksは関数コンポーネントのトップレベルで呼び出す
  const mainMesh = useRef<THREE.Mesh | null>(null);
  const overlayMesh2 = useRef<THREE.Mesh | null>(null);
  const overlayMesh3 = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    canvas.style.opacity = "0";

    // 🎯 Three.js 初期化
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    camera.position.z = 3;

    // ✅ 画像テクスチャの設定
    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

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
        photos: ["/photo/GENE1.jpg", "/photo/GENE2.jpg", "/photo/GENE3.jpg"],
      },
      {
        name: "DLEAGUE",
        photos: [
          "/photo/DLEAGUE1.jpg",
          "/photo/DLEAGUE2.JPG",
          "/photo/DLEAGUE3.jpg",
        ],
      },
    ];

    let currentSetIndex = 0;
    const textures: { texture: THREE.Texture; aspect: number }[][] = [];

    let loadedImages = 0;
    const totalImages = photoSets.reduce(
      (sum, set) => sum + set.photos.length,
      0
    );

    // 🎯 画像のロードと `textures` 配列のセット
    photoSets.forEach((set, setIndex) => {
      textures[setIndex] = [];
      set.photos.forEach((path, photoIndex) => {
        textureLoader.load(
          path,
          (tex) => {
            const aspect = tex.image.width / tex.image.height;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.anisotropy = maxAnisotropy;
            textures[setIndex][photoIndex] = { texture: tex, aspect };

            loadedImages++;
            if (loadedImages === totalImages) {
              createMesh();
            }
          },
          undefined
          // (err) => console.error(`Failed to load texture at ${path}`, err)
        );
      });
    });

    function setupHoverEffect() {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let isHovered = false;

      const onMouseMove = (event: MouseEvent) => {
        if (!mainMesh.current || !overlayMesh2.current || !overlayMesh3.current)
          return;

        const rect = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(mainMesh.current);
        const currentlyHovered = intersects.length > 0;

        if (currentlyHovered !== isHovered) {
          isHovered = currentlyHovered;

          if (isHovered) {
            if (overlayMesh2.current && overlayMesh3.current) {
              overlayMesh2.current.visible = true;
              overlayMesh3.current.visible = true;
              gsap.to(overlayMesh2.current.position, {
                x: -1.5,
                duration: 0.2,
              });
              gsap.to(overlayMesh3.current.position, { x: 1.5, duration: 0.2 });
              gsap.to(
                [overlayMesh2.current.material, overlayMesh3.current.material],
                {
                  opacity: 1,
                  duration: 0.2,
                }
              );
            }
          } else {
            gsap.to(overlayMesh2.current.position, { x: -0.5, duration: 0.2 });
            gsap.to(overlayMesh3.current.position, { x: 0.5, duration: 0.2 });

            gsap.to(
              [overlayMesh2.current.material, overlayMesh3.current.material],
              {
                opacity: 0,
                duration: 0.2,
                onUpdate: () => {
                  if (overlayMesh2.current && overlayMesh3.current) {
                    if (
                      overlayMesh2.current.material instanceof
                        THREE.MeshBasicMaterial &&
                      overlayMesh3.current.material instanceof
                        THREE.MeshBasicMaterial
                    ) {
                      if (overlayMesh2.current.material.opacity <= 0.05) {
                        overlayMesh2.current.visible = false;
                        overlayMesh3.current.visible = false;
                      }
                    }
                  }
                },
              }
            );
          }
        }
      };

      const onMouseLeave = () => {
        if (!isHovered) return;
        isHovered = false;
        if (!overlayMesh2.current || !overlayMesh3.current) return;

        gsap.to(overlayMesh2.current.position, { x: -0.5, duration: 0.2 });
        gsap.to(overlayMesh3.current.position, { x: 0.5, duration: 0.2 });

        gsap.to(
          [overlayMesh2.current.material, overlayMesh3.current.material],
          {
            opacity: 0,
            duration: 0.2,
            onUpdate: () => {
              if (overlayMesh2.current && overlayMesh3.current) {
                if (
                  overlayMesh2.current.material instanceof
                    THREE.MeshBasicMaterial &&
                  overlayMesh3.current.material instanceof
                    THREE.MeshBasicMaterial
                ) {
                  if (overlayMesh2.current.material.opacity <= 0.05) {
                    overlayMesh2.current.visible = false;
                    overlayMesh3.current.visible = false;
                  }
                }
              }
            },
          }
        );
      };

      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);

      // クリーンアップ
      return () => {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    // ✅ 画像変更時の処理 (アニメーション高速化 & オーバーレイ更新)
    // 画像変更時の処理
    function updateTexture(setIndex: number) {
      if (
        !mainMesh.current ||
        !overlayMesh2.current ||
        !overlayMesh3.current ||
        !textures[setIndex]
      )
        return;

      // フェードアウト
      gsap.to(
        [
          mainMesh.current!.material,
          overlayMesh2.current!.material,
          overlayMesh3.current!.material,
        ],
        {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            // メイン画像更新
            (mainMesh.current!.material as THREE.MeshBasicMaterial).map =
              textures[setIndex][0].texture;
            (
              mainMesh.current!.material as THREE.MeshBasicMaterial
            ).needsUpdate = true;

            const newAspectMain = textures[setIndex][0].aspect;
            mainMesh.current!.geometry.dispose();
            mainMesh.current!.geometry = new THREE.PlaneGeometry(
              2 * newAspectMain,
              2
            );

            // オーバーレイ2更新
            (overlayMesh2.current!.material as THREE.MeshBasicMaterial).map =
              textures[setIndex][1].texture;
            (
              overlayMesh2.current!.material as THREE.MeshBasicMaterial
            ).needsUpdate = true;

            const newAspectOverlay2 = textures[setIndex][1].aspect;
            overlayMesh2.current!.geometry.dispose();
            overlayMesh2.current!.geometry = new THREE.PlaneGeometry(
              2 * newAspectOverlay2,
              2
            );

            // オーバーレイ3更新
            (overlayMesh3.current!.material as THREE.MeshBasicMaterial).map =
              textures[setIndex][2].texture;
            (
              overlayMesh3.current!.material as THREE.MeshBasicMaterial
            ).needsUpdate = true;

            const newAspectOverlay3 = textures[setIndex][2].aspect;
            overlayMesh3.current!.geometry.dispose();
            overlayMesh3.current!.geometry = new THREE.PlaneGeometry(
              2 * newAspectOverlay3,
              2
            );

            // フェードイン
            gsap.to(
              [
                mainMesh.current!.material,
                overlayMesh2.current!.material,
                overlayMesh3.current!.material,
              ],
              {
                opacity: 1,
                duration: 0.3,
              }
            );
          },
        }
      );
    }

    // 🎯 画像の作成
    function createMesh() {
      if (!textures.length || !textures[0].length) return;
      const initialAspect = textures[0][0].aspect || 1;
      const geometry = new THREE.PlaneGeometry(2 * initialAspect, 2);

      // 🎯 メイン画像（1枚目）
      const material = new THREE.MeshBasicMaterial({
        map: textures[0][0].texture,
        transparent: true,
      });

      mainMesh.current = new THREE.Mesh(geometry, material);
      scene.add(mainMesh.current);

      // 🎯 2枚目 & 3枚目のオーバーレイメッシュ
      overlayMesh2.current = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          map: textures[0][1]?.texture || textures[0][0].texture,
          transparent: true,
          opacity: 0,
        })
      );
      overlayMesh2.current.position.set(-0.5, 0, -0.1);
      overlayMesh2.current.visible = false; // 🎯 初期状態で不可視

      overlayMesh3.current = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          map: textures[0][2]?.texture || textures[0][0].texture,
          transparent: true,
          opacity: 0,
        })
      );
      overlayMesh3.current.position.set(0.5, 0, -0.2);
      overlayMesh3.current.visible = false; // 🎯 初期状態で不可視

      scene.add(overlayMesh2.current);
      scene.add(overlayMesh3.current);

      gsap.to(canvas, { opacity: 1, duration: 1 });

      const cleanupHover = setupHoverEffect();

      // クリーンアップ関数をuseEffectのreturnで呼び出す
      return () => {
        cleanupHover();
      };
    }

    // 🎯 スクロール感度 & クールダウン調整 (最適化)
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollCooldown = 250; // ✅ 短縮 (より速くする)
    const scrollThreshold = 60; // ✅ しきい値調整 (よりスムーズに)

    const onWheel = (event: WheelEvent) => {
      const now = Date.now();
      if (isScrolling || now - lastScrollTime < scrollCooldown) return;

      lastScrollTime = now;
      isScrolling = true;

      if (Math.abs(event.deltaY) > scrollThreshold) {
        if (event.deltaY > 0) {
          currentSetIndex = (currentSetIndex + 1) % textures.length;
        } else {
          currentSetIndex =
            (currentSetIndex - 1 + textures.length) % textures.length;
        }

        updateTexture(currentSetIndex);
      }

      setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown);
    };

    window.addEventListener("wheel", onWheel);

    // 🎯 アニメーションループ
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // クリーンアップ関数
    return () => {
      window.removeEventListener("wheel", onWheel);
      renderer.dispose();
      if (mainMesh.current) {
        mainMesh.current.geometry.dispose();
        (mainMesh.current.material as THREE.MeshBasicMaterial).dispose();
        scene.remove(mainMesh.current);
      }
      if (overlayMesh2.current) {
        overlayMesh2.current.geometry.dispose();
        (overlayMesh2.current.material as THREE.MeshBasicMaterial).dispose();
        scene.remove(overlayMesh2.current);
      }
      if (overlayMesh3.current) {
        overlayMesh3.current.geometry.dispose();
        (overlayMesh3.current.material as THREE.MeshBasicMaterial).dispose();
        scene.remove(overlayMesh3.current);
      }
    };
  }, []); // 空の依存配列で一度だけ実行

  return null; // このコンポーネントはJSXを返さないため
};

export default Photos;
