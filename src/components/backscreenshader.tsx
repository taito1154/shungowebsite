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
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
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

  void main(){
    // 正規化されたUV座標(0～1)とアスペクト比補正
    vec2 uv = vUv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x = (uv.x - 0.5) * aspect + 0.5;
    
    vec2 center = vec2(0.5, 0.5);
    vec2 diff = uv - center;
    float dist = length(diff);
    float angle = atan(diff.y, diff.x);
    
    // 基本の円半径
    float baseRadius = 0.4;
    
    // 各波ごとに個別の振幅: 時間と角度に依存するノイズで調整
    float ampNoise = noise(vec2(angle * 0.6, u_time * 5.0));
    float localAmp = 0.2 * (0.1 + 0.4 * ampNoise);
    
    // 各波の周波数もランダムに変化させる
    float freqNoise = noise(vec2(angle * 5.0, u_time * 0.3));
    float freqMod = 12.0 * (0.7 + 0.6 * freqNoise);
    
    // 各波ごとに位相シフトを加える（最大約πのずれ）
    float phaseNoise = noise(vec2(angle * 4.0, u_time * 0.8));
    float phaseShift = phaseNoise * 3.14;
    
    // sinカーブによる半径変調：各波ごとに異なる振幅、周波数、位相で変動
    float modRadius = baseRadius + localAmp * sin(freqMod * angle + u_time * 1.5 + phaseShift);
    
    // 輪郭線のみ表示するため、内側と外側のsmoothstepを利用
    float edgeWidth = 0.01;
    float inner = smoothstep(modRadius - edgeWidth * 0.5, modRadius, dist);
    float outer = smoothstep(modRadius, modRadius + edgeWidth * 0.5, dist);
    float alpha = inner - outer;
    
    // 色は暗いグレー（黒に近い）
    vec3 color = vec3(0.1, 0.1, 0.1);
    
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

    // 全画面Quad用のジオメトリとシェーダーマテリアルの作成
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
