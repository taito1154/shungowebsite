"use client";

"use client";

// src/shaders/backscreenshader.tsx
import * as THREE from "three";
import React, { useEffect, useRef } from "react";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // シンプルな疑似乱数関数
  float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2Dノイズ関数
  float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    // 正規化されたUV座標(0～1)
    vec2 uv = vUv;
    // アスペクト比補正：横方向を調整して正円にする
    float aspect = u_resolution.x / u_resolution.y;
    uv.x = (uv.x - 0.5) * aspect + 0.5;
    
    vec2 center = vec2(0.5, 0.5);
    float dist = length(uv - center);
    
    // ノイズによる歪み（0～1の値）
    float n = noise(uv * 10.0 + u_time * 1.0);
    // ノイズで距離に微小な乱れを加える（0.05程度の変動）
    float distortedDist = dist + n * 0.5;
    
    // 波状効果：歪んだ距離に基づくsinカーブ
    float wave = sin(distortedDist * 10.0 - u_time * 1.0) * 0.3 + 0.5;
    // 円のエッジはそのまま
    float fade = 1.0;
    
    float alpha = wave * fade;
    // 色は黒と暗いグレーの補間により決定する
    vec3 color = mix(vec3(0.02), vec3(0.04), wave);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

const BackScreenShader: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // コンテナ内にcanvasを作成
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    // シーンとOrthographicCamera（全画面Quad用）の設定
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true, // 背景を透明に
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // クリアカラーも透明

    // 全画面Quad用のジオメトリとシェーダーマテリアルを作成
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: {
          value: new THREE.Vector2(
            container.clientWidth,
            container.clientHeight
          ),
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.u_time.value += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      material.uniforms.u_resolution.value.set(width, height);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default BackScreenShader;
