"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import usePhotoScroller from "./PhotoScroll";
import usePhotoHoverEffect from "./PhotoHoverEffect";

const Photos: React.FC = () => {
  const { textures, currentSetIndex, isLoaded } = usePhotoScroller();

  const mainMesh = useRef<THREE.Mesh | null>(null);
  const overlayMesh2 = useRef<THREE.Mesh | null>(null);
  const overlayMesh3 = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!isLoaded || !textures.length) return;

    const canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
    if (!canvas) return;

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
    camera.position.z = 3;

    const initialAspect = textures[currentSetIndex][0].aspect;
    const geometry = new THREE.PlaneGeometry(2 * initialAspect, 2);

    mainMesh.current = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ map: textures[currentSetIndex][0].texture })
    );
    overlayMesh2.current = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: textures[currentSetIndex][1].texture,
        opacity: 0,
      })
    );
    overlayMesh3.current = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: textures[currentSetIndex][2].texture,
        opacity: 0,
      })
    );

    overlayMesh2.current.position.set(-0.5, 0, -0.1);
    overlayMesh3.current.position.set(0.5, 0, -0.2);

    scene.add(mainMesh.current);
    scene.add(overlayMesh2.current);
    scene.add(overlayMesh3.current);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      renderer.dispose();
    };
  }, [isLoaded, currentSetIndex]);

  usePhotoHoverEffect(
    mainMesh.current,
    overlayMesh2.current,
    overlayMesh3.current
  );

  return null;
};

export default Photos;
