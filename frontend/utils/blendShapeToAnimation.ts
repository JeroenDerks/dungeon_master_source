// import * as THREE from "three";
// import { facecapModel } from "./mapVertices";
// import type { BlendData } from "./types";

// export const blendShapeToAnimation = (blendData: BlendData) => {
//   let values = Array.from({ length: 52 * (blendData.length + 1) }, () => 0);
//   const times: number[] = [];

//   blendData.forEach(({ timeStamp, blendShapes }, i) => {
//     times.push(timeStamp);
//     Object.keys(blendShapes).forEach((key) => {
//       let newKey = "";
//       if (key === "jawLeft" || key === "jawRight") newKey = key;
//       else if (key === "mouthRight" || key === "mouthLeft") {
//         newKey = key;
//       } else if (key.endsWith("Right")) {
//         newKey = key.replace("Right", "_R");
//       } else if (key.endsWith("Left")) {
//         newKey = key.replace("Left", "_L");
//       } else newKey = key;

//       const index = facecapModel[newKey] + i * 52;
//       if (index >= 0) {
//         values[index] = blendData[i].blendShapes[key] * 2;
//       }
//     });
//   });

//   times.push(times[times.length - 1] + times[1]);
//   const customTrack = new THREE.NumberKeyframeTrack(
//     "mesh_2.morphTargetInfluences",
//     times,
//     values
//   );

//   return new THREE.AnimationClip("audioclip", -1, [customTrack]);
// };
import * as THREE from "three";
import { a2fKeys } from "./a2f_blendshapes";
import type { BlendData } from "./types";

export const blendShapeToAnimation = (blendData: BlendData) => {
  let values = Array.from({ length: a2fKeys.length * (blendData.length + 1) }, () => 0);
  const times: number[] = [];

  blendData.forEach(({ timeStamp, blendShapes }, i) => {
    times.push(timeStamp);
    Object.keys(blendShapes).forEach((key) => {
      const blendShapeIndex = neutralMesh.morphTargetDictionary[key]; // Use neutralMesh's morphTargetDictionary to get the index
      const index = blendShapeIndex + i * a2fKeys.length;
      if (index >= 0) {
        values[index] = blendShapes[key] * 2;
      }
    });
  });
  

  times.push(times[times.length - 1] + times[1]);
  const customTrack = new THREE.NumberKeyframeTrack(
    "mesh_2.morphTargetInfluences",
    times,
    values
  );

  return new THREE.AnimationClip("audioclip", -1, [customTrack]);
};
