import * as THREE from "three";
import gsap from "gsap";

export default function shaderBackground() {
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

  let currentSetIndex = 0;
  let currentPhotoIndex = 0;
  const textures: { texture: THREE.Texture; aspect: number }[][] = [];

  let mainMesh: THREE.Mesh | null = null;
  let overlayMesh2: THREE.Mesh | null = null;
  let overlayMesh3: THREE.Mesh | null = null;

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
        undefined,
        (err) => console.error(`Failed to load texture at ${path}`, err)
      );
    });
  });
  function setupHoverEffect() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovered = false;

    canvas.addEventListener("mousemove", (event) => {
      if (!mainMesh || !overlayMesh2 || !overlayMesh3) return;

      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(mainMesh);
      const currentlyHovered = intersects.length > 0;

      if (currentlyHovered !== isHovered) {
        isHovered = currentlyHovered;

        if (isHovered) {
          gsap.to(overlayMesh2.position, { x: -1.5, duration: 0.5 });
          gsap.to(overlayMesh3.position, { x: 1.5, duration: 0.5 });
          gsap.to([overlayMesh2.material, overlayMesh3.material], {
            opacity: 1,
            duration: 0.5,
          });
        } else {
          gsap.to(overlayMesh2.position, { x: -0.5, duration: 0.5 });
          gsap.to(overlayMesh3.position, { x: 0.5, duration: 0.5 });
          gsap.to([overlayMesh2.material, overlayMesh3.material], {
            opacity: 0,
            duration: 0.5,
          });
        }
      }
    });
  }
  function createMesh() {
    if (!textures.length || !textures[0].length) return;
    const initialAspect = textures[0][0].aspect || 1;
    const geometry = new THREE.PlaneGeometry(2 * initialAspect, 2);

    // 🎯 メイン画像（1枚目）
    const material = new THREE.MeshBasicMaterial({
      map: textures[0][0].texture,
      transparent: true,
    });

    mainMesh = new THREE.Mesh(geometry, material);
    scene.add(mainMesh);

    // 🎯 2枚目 & 3枚目のオーバーレイメッシュ
    overlayMesh2 = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: textures[0][1]?.texture || textures[0][0].texture,
        transparent: true,
        opacity: 0,
      })
    );
    overlayMesh2.position.set(-0.5, 0, -0.1);

    overlayMesh3 = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: textures[0][2]?.texture || textures[0][0].texture,
        transparent: true,
        opacity: 0,
      })
    );
    overlayMesh3.position.set(0.5, 0, -0.2);

    scene.add(overlayMesh2);
    scene.add(overlayMesh3);

    gsap.to(canvas, { opacity: 1, duration: 1 });

    setupHoverEffect();
  }

  // ✅ 画像変更時の処理 (アニメーション高速化)
  function updateTexture(setIndex: number, photoIndex: number) {
    if (!mainMesh || !textures[setIndex] || !textures[setIndex][photoIndex])
      return;

    gsap.to(mainMesh.material, {
      opacity: 0,
      duration: 0.3, // ✅ 短縮
      onComplete: () => {
        (mainMesh!.material as THREE.MeshBasicMaterial).map =
          textures[setIndex][photoIndex].texture;
        (mainMesh!.material as THREE.MeshBasicMaterial).needsUpdate = true;

        const newAspect = textures[setIndex][photoIndex].aspect;
        mainMesh!.geometry.dispose();
        mainMesh!.geometry = new THREE.PlaneGeometry(2 * newAspect, 2);

        gsap.to(mainMesh!.material, { opacity: 1, duration: 0.3 }); // ✅ 短縮
      },
    });
  }

  // 🎯 スクロール感度 & クールダウン調整 (最適化)
  let isScrolling = false;
  let lastScrollTime = 0;
  const scrollCooldown = 250; // ✅ 短縮 (より速くする)
  const scrollThreshold = 60; // ✅ しきい値調整 (よりスムーズに)

  window.addEventListener("wheel", (event) => {
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

      updateTexture(currentSetIndex, 0);
    }

    setTimeout(() => {
      isScrolling = false;
    }, scrollCooldown);
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
