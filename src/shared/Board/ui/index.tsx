import { RoundedBox } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FC, useState } from "react";
import { TextureLoader } from "three";
import { BoardLines } from "./lines";
import { getCoordsByEvent } from "../utils";
import { Coords } from "../types";
type BoardProps = {
  size: number;
  boardSize: number;
  onCellClick?: (x: number, y: number) => void;
  position?: [number, number, number];
  offset?: number;
};
export const Board: FC<BoardProps> = ({
  size,
  boardSize,
  onCellClick,
  position = [0, 0, 0],
  offset = 2,
}) => {
  const cellSize = boardSize / (size - 1);

  const jadeTexture = useLoader(TextureLoader, "/jade-texture.jpg");
  const linesColor = "#C8D5CD";

  const [lastPointerPosition, setLastPointerPosition] =
    useState<Coords | null>();

  const onPointerDown = (e: any) => {
    setLastPointerPosition(getCoordsByEvent(e, size, cellSize));
  };

  const handleClick = (e: any) => {
    const coords = getCoordsByEvent(e, size, cellSize);
    if (
      !coords ||
      coords.x !== lastPointerPosition?.x ||
      coords.y !== lastPointerPosition?.y
    ) {
      setLastPointerPosition(null);
      return;
    }
    console.log(lastPointerPosition);
    onCellClick?.(coords.x, coords.y);
  };
  return (
    <mesh position={position}>
      <RoundedBox
        args={[boardSize + offset, 1, boardSize + offset]} // Розмір дошки
        radius={0.5} // Радіус заокруглення
        smoothness={6} // Кількість сегментів для плавного заокруглення
        onPointerUp={handleClick}
        onPointerDown={onPointerDown}
      >
        <meshPhysicalMaterial
          map={jadeTexture}
          // color={"#A98F6E"}
          roughness={0.1}
          transmission={0.5}
          thickness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.9}
        />
      </RoundedBox>
      <BoardLines
        size={size}
        boardSize={boardSize}
        cellSize={cellSize}
        color={linesColor}
      />
    </mesh>
  );
};
