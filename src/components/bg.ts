import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function backScreen() {
  useEffect(() => {
    const canvas = document.getElementById(
      "glBackgroundCanvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    // ✅ Three.js 初期化
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // ✅ シェーダーマテリアル作成
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: {
          value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
        },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        varying vec2 vUv;

        void main() {
          vec2 center = vec2(0.5, 0.5);
          vec2 pos = vUv - center;
          float dist = length(pos);
          
          float wave = sin(dist * 10.0 - u_time * 2.0) * 0.5 + 0.5;
          float circle = smoothstep(0.5, 0.4, dist);
          float pattern = wave * circle;
          
          vec3 color = vec3(0.2, 0.4, 0.8) * pattern;
          gl_FragColor = vec4(color, pattern * 0.5);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 1;

    let animationFrameId: number;

    // ✅ アニメーションループ
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.u_time.value += 0.01;
      renderer.render(scene, camera);
    }

    // ✅ リサイズ対応
    function onResize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height);
      material.uniforms.u_resolution.value.set(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onResize);
    animate();

    // ✅ クリーンアップ関数
    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
