import { RoundedBox } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FC } from "react";
import { TextureLoader, Vector3 } from "three";
import { BoardLines } from "./lines";
type BoardProps = {
  size: number;
  boardSize: number;
  onCellClick?: (x: number, y: number) => void;
  y?: number;
};
export const Board: FC<BoardProps> = ({
  size,
  boardSize,
  onCellClick,
  y = 0,
}) => {
  const cellSize = boardSize / (size - 1);
  const jadeTexture = useLoader(TextureLoader, "/src/assets/texture.jpg");
  const linesColor = "#494949";

  const handleClick = (e: any) => {
    const point = e.point as Vector3;
    const x = Math.round(point.x / cellSize + (size - 1) / 2);
    const y = Math.round(point.z / cellSize + (size - 1) / 2);
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    onCellClick?.(x, y);
  };
  return (
    <mesh position={[0, y, 0]}>
      <RoundedBox
        args={[boardSize + 1, 1, boardSize + 1]} // Розмір дошки
        radius={0.5} // Радіус заокруглення
        smoothness={8} // Кількість сегментів для плавного заокруглення
        onPointerDown={handleClick}
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
          sheenColor="#6da08e"
          sheenRoughness={0.5}
          // opacity={0.9}
          // transparent={true}
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
