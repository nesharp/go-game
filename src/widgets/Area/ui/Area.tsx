import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { PropsWithChildren, useRef } from "react";
import sky_1k from "../../../assets/sky_1k.hdr";
import { LazyBudhaMonument } from "../../../shared/BudhaMonument";
import { ViewMapKeys } from "../types";
import { useGameView } from "../hooks/useGameView";

type AreaProps = {
  children?: React.ReactNode;
  view?: ViewMapKeys;
};

export function Area({
  children,
  view = "free",
}: PropsWithChildren<AreaProps>) {
  const controlsRef = useRef<any>(null);

  useGameView(view, controlsRef);

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
      camera={{
        position: [0, 10, 20],
        fov: 100,
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#FFFEAB" />
      <LazyBudhaMonument />
      <Environment background files={sky_1k} backgroundBlurriness={0} />
      <OrbitControls
        ref={controlsRef}
        zoomSpeed={1}
        maxZoom={1}
        minZoom={1}
        minDistance={15}
        maxDistance={25}
        enablePan={false}
      />
      {children}
    </Canvas>
  );
}

export default Area;
