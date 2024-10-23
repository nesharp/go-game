import { useGLTF } from "@react-three/drei";
import { degToRad } from "../../lib/utils";
import { FC } from "react";
import { animated } from "@react-spring/three";
type Props = {
  position?: [number, number, number];
  [key: string]: any;
};
export const BudhaMonument: FC<Props> = ({
  position = [-15, -5, -30],
  ...props
}) => {
  const { nodes } = useGLTF("/scene.gltf", true);

  return (
    <animated.group
      position={position}
      {...props}
    >
      <group
        rotation={[degToRad(90), degToRad(180), degToRad(180)]}
      >
        <primitive object={nodes.mesh_0} />
        <primitive object={nodes.mesh_1} />
      </group>
    </animated.group>
  );
};
useGLTF.preload("/scene.gltf");
export default BudhaMonument;
