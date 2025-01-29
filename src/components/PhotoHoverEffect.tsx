"use client";

import { useEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function usePhotoHoverEffect(
  canvas: HTMLCanvasElement | null,
  camera: THREE.PerspectiveCamera,
  mainMesh: React.MutableRefObject<THREE.Mesh | null>,
  overlayMesh2: React.MutableRefObject<THREE.Mesh | null>,
  overlayMesh3: React.MutableRefObject<THREE.Mesh | null>
) {
  useEffect(() => {
    if (
      !canvas ||
      !mainMesh.current ||
      !overlayMesh2.current ||
      !overlayMesh3.current
    )
      return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(mainMesh.current!);
      const isHovered = intersects.length > 0;

      gsap.to(
        [overlayMesh2.current!.position, overlayMesh3.current!.position],
        {
          x: isHovered ? 1.5 : 0.5,
          duration: 0.3,
        }
      );

      gsap.to(
        [overlayMesh2.current!.material, overlayMesh3.current!.material],
        {
          opacity: isHovered ? 1 : 0,
          duration: 0.3,
        }
      );
    };

    canvas.addEventListener("mousemove", onMouseMove);
    return () => canvas.removeEventListener("mousemove", onMouseMove);
  }, [canvas, camera, mainMesh, overlayMesh2, overlayMesh3]);
}
