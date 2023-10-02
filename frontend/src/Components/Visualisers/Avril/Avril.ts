import * as THREE from "three";

const worldWidth = 128,
  worldDepth = 128;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

scene.background = new THREE.Color(0x7866f2);
scene.fog = new THREE.FogExp2(0xbacdff, 0.0007);

const geometry = new THREE.PlaneGeometry(
  20000,
  20000,
  worldWidth - 1,
  worldDepth - 1
);
geometry.rotateX(-Math.PI / 2);

const position = geometry.attributes.position as any;
position.usage = THREE.DynamicDrawUsage;

for (let i = 0; i < position.count; i++) {
  const y = 35 * Math.sin(i / 2);
  position.setY(i, y);
}

const texture = new THREE.TextureLoader().load("textures/grasslight.jpg");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(5, 5);
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({ color: 0x005726, map: texture });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 5;

let resized = false;

// resize event listener
window.addEventListener("resize", function () {
  resized = true;
});

export function Avril(domRef: React.RefObject<HTMLDivElement>) {
  domRef?.current?.appendChild(renderer.domElement);
  resize();
  animate();
}

function animate() {
  if (resized) resize();

  camera.position.x += 0.05;
  camera.position.z += 0.15;
  camera.position.y += 0.15;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

function resize() {
  resized = false;

  renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.75);

  // update the camera
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}
