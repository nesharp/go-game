import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { PropsWithChildren, useEffect, useRef } from "react";
import { gsap } from "gsap"; // Import GSAP
import sky_1k from "../../../assets/sky_1k.hdr";
import { LazyBudhaMonument } from "../../../shared/BudhaMonument";
import { ViewMapKeys, ViewsMapItem } from "../types";

const ViewsMap: Record<ViewMapKeys, ViewsMapItem> = {
  top: {
    maxAzimuthAngle: degToRad(0),
    minAzimuthAngle: degToRad(0),
    maxPolarAngle: degToRad(0),
    minPolarAngle: degToRad(0),
  },
  side: {
    maxAzimuthAngle: degToRad(85),
    minAzimuthAngle: degToRad(-85),
    maxPolarAngle: degToRad(65),
    minPolarAngle: degToRad(65),
  },
  free: {
    maxAzimuthAngle: degToRad(85),
    minAzimuthAngle: degToRad(-85),
    maxPolarAngle: degToRad(85),
    minPolarAngle: degToRad(0),
  },
};

type AreaProps = {
  children?: React.ReactNode;
  view?: ViewMapKeys;
};

export function Area({
  children,
  view = "free",
}: PropsWithChildren<AreaProps>) {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      // Get the current angles
      const { maxAzimuthAngle, minAzimuthAngle, maxPolarAngle, minPolarAngle } =
        ViewsMap[view];

      // Animate the transition using GSAP
      gsap.to(controlsRef.current, {
        maxAzimuthAngle,
        minAzimuthAngle,
        maxPolarAngle,
        minPolarAngle,
        duration: 1, // Duration of the transition in seconds
        ease: "sine", // Easing function
      });
    }
  }, [view]);

  return (
    <Canvas
      style={{
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
