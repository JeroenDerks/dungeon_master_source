// import * as THREE from "three";
// // @ts-ignore
// // import Stats from "three/addons/libs/stats.module.js";
// // @ts-ignore
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// // @ts-ignore
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// // @ts-ignore
// import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
// // @ts-ignore
// import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
// // @ts-ignore
// import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
// // @ts-ignore
// import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// import { PAGE_PADDING } from "./constants";

// export let mixer: any;
// import { a2fKeys } from "./a2f_blendshapes";

// export function initThree() {
//   const clock = new THREE.Clock();
  
//   for (const blendshapeName of a2fKeys) {
//     const morphTargetName = blendshapeName;
//     const value = morphTargetMesh.morphTargetDictionary[morphTargetName];
  
//     if (value !== undefined) {
//       gui
//         .add(influences, value, 0, 1, 0.01)
//         .name(morphTargetName)
//         .listen(influences);
//     }
//   }
  
//   const container = document.getElementById("skecth-container");

//   const camera = new THREE.PerspectiveCamera(
//     50,
//     window.innerWidth / window.innerHeight,
//     1,
//     20
//   );
//   camera.position.set(0, 1, .25);

//   const scene = new THREE.Scene();

//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(
//     window.innerWidth - PAGE_PADDING * 2,
//     window.innerHeight - PAGE_PADDING - 136
//   );

//   renderer.toneMapping = THREE.ACESFilmicToneMapping;

//   container?.appendChild(renderer.domElement);

//   const light = new THREE.PointLight(0xff0000, 5, 10);
//   light.position.set(-10, -3, 4);
//   scene.add(light);

//   const ktx2Loader = new KTX2Loader()
//     .setTranscoderPath("/textures/basis/")
//     .detectSupport(renderer);

//   new GLTFLoader()
//     .setKTX2Loader(ktx2Loader)
//     .setMeshoptDecoder(MeshoptDecoder)
//     .load("/scene.glb", (gltf) => {
//       console.log("gltf", gltf);
  
//       const mesh = gltf.scene.children[0];
//       scene.add(mesh);
//       console.log("mesh", mesh);
  
//       let morphTargetMeshes = [];
  
//       gltf.scene.traverse((node) => {
//         if (node.isMesh && node.name.startsWith("LOD0_3_")) {
//           morphTargetMeshes.push(node);
//           console.log(node.name);
//         }
//       });
  
//       for (const morphTargetMesh of morphTargetMeshes) {
//         const influences = morphTargetMesh.morphTargetInfluences;
//         const gui = new GUI();
//         gui.close();
  
//         for (const blendshapeName of a2fKeys) {
//           const morphTargetName = blendshapeName.replace("blendShape1.", "");
//           const value = morphTargetMesh.morphTargetDictionary[morphTargetName];
  
//           if (value !== undefined) {
//             gui
//               .add(influences, value, 0, 1, 0.01)
//               .name(morphTargetName)
//               .listen(influences);
//           }
//         }
//       }
//     });
  
//   //   new GLTFLoader()
//   // .setKTX2Loader(ktx2Loader)
//   // .setMeshoptDecoder(MeshoptDecoder)
//   // .load("/scene.glb", (gltf) => {
//   //   console.log("gltf", gltf);

//   //   const mesh = gltf.scene.children[0];
//   //   scene.add(mesh);
//   //   console.log("mesh", mesh);

//   //   let morphTargetMeshes = [];

//   //   gltf.scene.traverse((node) => {
//   //     if (node.isMesh && node.name.startsWith("LOD0_3_")) {
//   //       morphTargetMeshes.push(node);
//   //       console.log(node.name)
//   //     }
//   //   });
    
//   //   for (const morphTargetMesh of morphTargetMeshes) {
//   //     const influences = morphTargetMesh.morphTargetInfluences;
//   //     const gui = new GUI();
//   //     gui.close();
    
//   //     for (const [key, value] of Object.entries(morphTargetMesh.morphTargetDictionary)) {
//   //       console.log(key, value);
//   //       gui
//   //         .add(influences, value, 0, 1, 0.01)
//   //         .name(key.replace("blendShape1.", ""))
//   //         .listen(influences);
//   //     }
//   //   }
    
//   // });


//   // new GLTFLoader()
//   //   .setKTX2Loader(ktx2Loader)
//   //   .setMeshoptDecoder(MeshoptDecoder)
//   //   .load("/scene.glb", (gltf: any) => {
//   //     console.log("gltf", gltf);

//   //     const mesh = gltf.scene.children[0];
//   //     scene.add(mesh);
//   //     console.log("mesh", mesh);
//   //     mixer = new THREE.AnimationMixer(mesh);

//   //     // mixer.clipAction(zeroClip).play();
//   //     // GUI

//   //     let morphTargetMesh;
//   //     gltf.scene.traverse((node) => {
//   //       if (node.isMesh && node.name.startsWith("LOD0_3_")) {
//   //         morphTargetMesh = node;
//   //       }
//   //     });
      
//   //           const head = morphTargetMesh;
//   //     const influences = head.morphTargetInfluences;
//   //     const gui = new GUI();
//   //     gui.close();

//   //     for (const [key, value] of Object.entries(head.morphTargetDictionary)) {
//   //       console.log(key, value);
//   //       gui
//   //         .add(influences, value, 0, 1, 0.01)
//   //         .name(key.replace("blendShape1.", ""))
//   //         .listen(influences);
//   //     }
//   //   });

//   const environment = new RoomEnvironment();
//   const pmremGenerator = new THREE.PMREMGenerator(renderer);

//   scene.background = new THREE.Color(0x222222);
//   scene.environment = pmremGenerator.fromScene(environment).texture;

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
import { PAGE_PADDING } from "./constants";

import { a2fKeys } from "./a2f_blendshapes";

export let mixer: any;
export let neutralMesh: any;

function logMorphTargetNames(mesh: THREE.Mesh) {
  if (mesh.morphTargetDictionary) {
    console.log("Morph target names in the model:");
    for (const key in mesh.morphTargetDictionary) {
      console.log(key);
    }
  }
}

export function initThree() {
  const clock = new THREE.Clock();

  const container = document.getElementById("skecth-container");

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 1); // Adjust the camera position to see the model


  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(
    window.innerWidth - PAGE_PADDING * 2,
    window.innerHeight - PAGE_PADDING - 136
  );

  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  container?.appendChild(renderer.domElement);


  const light = new THREE.PointLight(0xff0000, 5, 10);
  light.position.set(-10, -3, 4);
  scene.add(light);


  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath("/textures/basis/")
    .detectSupport(renderer);


  let morphTargetMesh; // Declare the morphTargetMesh variable here
  
  const light = new THREE.PointLight(0xff0000, 5, 10);
  light.position.set(-10, -3, 4); // Adjust the light position to be closer to the model
  scene.add(light);

  new GLTFLoader()
    .setKTX2Loader(ktx2Loader)
    .setMeshoptDecoder(MeshoptDecoder)
    .load("/scene.glb", (gltf: any) => {
      console.log("gltf", gltf);

      gltf.scene.traverse((node: any) => {
        if (node.isSkinnedMesh && node.name === "neutral") {
          neutralMesh = node;
          console.log(node)
        }
      });
      
      const mesh = gltf.scene.children[0];
      scene.add(mesh);
      console.log("mesh", mesh);


      if (neutralMesh) {
        // scene.add(neutralMesh)
        const lightx = new THREE.PointLight(0xff0000, 5, 10);
        light.position.set(-15, -1, 4);
        neutralMesh.add(lightx);
        console.log("neutralMesh", neutralMesh);
        logMorphTargetNames(neutralMesh);

        const influences = neutralMesh.morphTargetInfluences;
        const gui = new GUI();
        gui.close();

        for (const blendshapeName of a2fKeys) {
          const morphTargetName = blendshapeName;
          const value = neutralMesh.morphTargetDictionary[morphTargetName];

          if (value !== undefined) {
            gui
              .add(influences, value, 0, 1, 0.01)
              .name(morphTargetName)
              .listen(influences);
          }
        }
      } else {
        console.error("Mesh with the provided UUID not found");
=======
    new GLTFLoader()
  .setKTX2Loader(ktx2Loader)
  .setMeshoptDecoder(MeshoptDecoder)
  .load("/mocap.glb", (gltf) => {
    console.log("gltf", gltf);

    const mesh = gltf.scene.children[0];
    scene.add(mesh);
    console.log("mesh", mesh);

    let morphTargetMeshes = [];

    gltf.scene.traverse((node) => {
      if (node.isMesh && node.name.startsWith("LOD0_3_")) {
        morphTargetMeshes.push(node);
        console.log(node.name)
      }
    });
    
    for (const morphTargetMesh of morphTargetMeshes) {
      const influences = morphTargetMesh.morphTargetInfluences;
      const gui = new GUI();
      gui.close();
    
      for (const [key, value] of Object.entries(morphTargetMesh.morphTargetDictionary)) {
        console.log(key, value);
        gui
          .add(influences, value, 0, 1, 0.01)
          .name(key.replace("blendShape1.", ""))
          .listen(influences);

      }
    }
    
  });


  // new GLTFLoader()
  //   .setKTX2Loader(ktx2Loader)
  //   .setMeshoptDecoder(MeshoptDecoder)
  //   .load("/scene.glb", (gltf: any) => {
  //     console.log("gltf", gltf);

  //     const mesh = gltf.scene.children[0];
  //     scene.add(mesh);
  //     console.log("mesh", mesh);
  //     mixer = new THREE.AnimationMixer(mesh);

  //     // mixer.clipAction(zeroClip).play();
  //     // GUI

  //     let morphTargetMesh;
  //     gltf.scene.traverse((node) => {
  //       if (node.isMesh && node.name.startsWith("LOD0_3_")) {
  //         morphTargetMesh = node;
  //       }
  //     });
      
  //           const head = morphTargetMesh;
  //     const influences = head.morphTargetInfluences;
  //     const gui = new GUI();
  //     gui.close();

  //     for (const [key, value] of Object.entries(head.morphTargetDictionary)) {
  //       console.log(key, value);
  //       gui
  //         .add(influences, value, 0, 1, 0.01)
  //         .name(key.replace("blendShape1.", ""))
  //         .listen(influences);
  //     }
  //   });

  const environment = new RoomEnvironment();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  
    scene.background = new THREE.Color(0x222222);
    scene.environment = pmremGenerator.fromScene(environment).texture;


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 0.0;
    controls.maxDistance = 5;
  
    controls.target.set(0, 0.15, 0); // Set the OrbitControls target to the model at the center (0, 0, 0)

  scene.background = new THREE.Color(0x222222);
  scene.environment = pmremGenerator.fromScene(environment).texture;



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
