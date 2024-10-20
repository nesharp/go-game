import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import natureHdr from "../../../assets/nature.hdr";
import { degToRad } from "three/src/math/MathUtils.js";
import { BudhaMonument } from "../../../shared/BudhaMonument";
import { GoBoard } from "../../../features/Game";

export function Area() {
  return (
    <Canvas
      style={{

        cursor: "none",
        width: "100vw",
        height: "100vh",
      }}
      camera={{
        position: [0, 10, 20],
        fov: 100,
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#FFFEAB" />
      <BudhaMonument />
      <GoBoard y={0} />
      <Environment background files={natureHdr} backgroundBlurriness={0.03} />
      <OrbitControls
        zoomSpeed={1}
        maxZoom={1}
        minZoom={1}
        minDistance={15}
        maxDistance={25}
        enablePan={false}
        maxAzimuthAngle={degToRad(85)}
        minAzimuthAngle={degToRad(-85)}
      />
    </Canvas>
  );
}
