import { useGLTF } from "@react-three/drei";
import { degToRad } from "../../lib/utils";
import { Suspense } from "react";

export const BudhaMonument = () => {
  const { nodes } = useGLTF("/scene.gltf");

  return (
    <Suspense fallback={<div></div>}>
      <group
        rotation={[degToRad(90), degToRad(180), degToRad(180)]}
        position={[-15, -5, -30]}
        renderOrder={100}
      >
        <primitive object={nodes.mesh_0} />
        <primitive object={nodes.mesh_1} />
      </group>
    </Suspense>
  );
};
