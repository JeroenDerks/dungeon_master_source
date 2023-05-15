import * as THREE from "three";
// @ts-ignore
// import Stats from "three/addons/libs/stats.module.js";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// @ts-ignore
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
// @ts-ignore
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
// @ts-ignore
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
// @ts-ignore
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// @ts-ignore
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// @ts-ignore
import Stats from "three/addons/libs/stats.module.js";

import { PAGE_PADDING } from "./constants";

export let mixer: any;

export function initThree() {
  const clock = new THREE.Clock();

  const container = document.getElementById("skecth-container");

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    20
  );
  camera.position.set(-10, 2.5, 2.5);

  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(
    window.innerWidth - PAGE_PADDING * 2,
    window.innerHeight - PAGE_PADDING - 136
  );

  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  container?.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 5, 10);
  light.position.set(-10, -3, 4);
  scene.add(light);

  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath("/textures/basis/")
    .detectSupport(renderer);

  // const fbxLoader = new FBXLoader();
  // fbxLoader.load(
  //   "sjorstest.fbx",
  //   (object) => {
  //     object.scale.set(0.001, 0.001, 0.001);

  //     const mesh = object.children[0]; //.find(({ type }) => type === "SkinnedMesh");
  //     const head = mesh?.getObjectByName("FBHead001") as THREE.SkinnedMesh;
  //     // @ts-ignore
  //     const influences = mesh?.morphTargetInfluences;

  //     const gui = new GUI();
  //     gui.close();
    
  //     for (const [key, value] of Object.entries(FBHead001.morphTargetDictionary)) {
  //       console.log(key, value);
  //       gui
  //         .add(influences, value, 0, 1, 0.01)
  //         .name(key.replace("blendShape1.", ""))
  //         .listen(influences);
  //     }
  //   }
  // )

  new GLTFLoader()
    .setKTX2Loader(ktx2Loader)
    .setMeshoptDecoder(MeshoptDecoder)
    .load("stuart_Head_2.glb", (gltf: any) => {
      console.log("gltf", gltf);

      const mesh = gltf.scene.children[0];
      scene.add(mesh);
      console.log("mesh", mesh);
      mixer = new THREE.AnimationMixer(mesh);

      // mixer.clipAction(zeroClip).play();
      // GUI
  //     // @ts-ignore
      const influences = mesh?.morphTargetInfluences;
      const gui = new GUI();
      gui.close();

      for (const [key, value] of Object.entries(mesh.morphTargetDictionary)) {
        console.log(key, value);
        gui
          .add(influences, value, 0, 1, 0.01)
          .name(key.replace("blendShape1.", ""))
          .listen(influences);
      }
    });

  // const fbxLoader1 = new FBXLoader();
  // fbxLoader1.load(
  //   "1sm_wiz_nolight.fbx",
  //   (object) => {
  //     object.scale.set(0.01, 0.01, 0.01);

  //     console.log(object);

  //     const mesh = object.children[0]
  //     const head = mesh?.getObjectByName("neutral") as THREE.SkinnedMesh;
  //     // @ts-ignore
  //     const influences = mesh?.morphTargetInfluences;

  //     const gui = new GUI();
  //     gui.close();

  //     mixer = new THREE.AnimationMixer(object);
  //     // @ts-ignore
  //     for (const [key, value] of Object.entries(head.morphTargetDictionary)) {
  //       console.log(key, value);
  //       gui
  //         .add(influences, value, 0, 1, 0.01)
  //         .name(key.replace("blendShape1.", ""))
  //         .listen(influences);
  //     }

  //     scene.add(object);
  //   },
  //   (xhr) => {
  //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );

  const environment = new RoomEnvironment();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  scene.background = new THREE.Color(0x222222);
  scene.environment = pmremGenerator.fromScene(environment).texture;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 2.5;
  controls.maxDistance = 5;
  controls.minAzimuthAngle = -Math.PI / 2;
  controls.maxAzimuthAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 1.8;
  controls.target.set(0, 0.15, -0.2);

  // const stats = new Stats();
  // container.appendChild(stats.dom);

  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    renderer.render(scene, camera);

    controls.update();

    // stats.update();
  });
}
