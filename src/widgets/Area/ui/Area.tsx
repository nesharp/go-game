import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { GoBoard } from "../../../features/Game";
import { useGame } from "../../../entities/game";
import { PropsWithChildren, Suspense } from "react";
import sky_1k from "../../../assets/sky_1k.hdr";
import {
  AnimatedBudhaMonument,
  LazyBudhaMonument,
} from "../../../shared/BudhaMonument";

type AreaProps = {
  children?: React.ReactNode;
};
export function Area({ children }: PropsWithChildren<AreaProps>) {
  const game = useGame();
  const onStonePlaced = (x: number, y: number) => {
    game.move(x, y);
  };
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
      {/* <AnimatedBudhaMonument /> */}
      <LazyBudhaMonument />
      <GoBoard
        boardSize={19}
        boardState={game.data.boardState}
        onStonePlaced={onStonePlaced}
        position={[0, 0, 0]}
      />
      <Environment background files={sky_1k} backgroundBlurriness={0} />
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
      {children}
    </Canvas>
  );
}
export default Area;
