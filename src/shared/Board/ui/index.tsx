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
};
export const Board: FC<BoardProps> = ({
  size,
  boardSize,
  onCellClick,
  position = [0, 0, 0],
}) => {
  const cellSize = boardSize / (size - 1);

  const jadeTexture = useLoader(TextureLoader, "/texture.jpg");
  const linesColor = "#494949";

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
        args={[boardSize + 1, 1, boardSize + 1]} // Розмір дошки
        radius={0.5} // Радіус заокруглення
        smoothness={6} // Кількість сегментів для плавного заокруглення
        onPointerUp={handleClick}
        onPointerDown={onPointerDown}
      >
        <meshPhysicalMaterial
          map={jadeTexture}
          color={"#A98F6E"}
          roughness={0.6}
          // transmission={0.8}
          thickness={2}
          clearcoat={0.95}
          clearcoatRoughness={0.9}
          sheen={1}
          sheenColor="#D5B58B"
          sheenRoughness={0.5}
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
