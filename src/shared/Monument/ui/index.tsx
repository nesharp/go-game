import { useGLTF } from "@react-three/drei";

export const Monument = () => {
  const { nodes, materials } = useGLTF("/monument.glb");
  console.log(nodes.ChnArcher_001);
  console.log(materials.ChKnSoldier_01);

  return (
    <mesh
      geometry={(nodes.ChnArcher_001 as any).geometry!}
      material={materials.ChKnSoldier_01}
      rotation={[-1.6, 0, 3.4]}
      position={[10, -70, -100]}
      scale={[10, 10, 10]}
    />
  );
};
