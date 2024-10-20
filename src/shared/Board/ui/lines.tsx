import { Line } from "@react-three/drei";
import { FC } from "react";
type BoardLinesProps = {
  color?: string;
  boardSize: number;
  cellSize: number;
  size: number;
};
export const BoardLines: FC<BoardLinesProps> = ({
  color = "#656565",
  boardSize,
  cellSize,
  size,
}) => {
  const lines = [];
  for (let i = 0; i < size; i++) {
    const position = i * cellSize - boardSize / 2;
    lines.push(
      <Line
        key={`h-line-${i}`}
        points={[
          [-boardSize / 2, 0.51, position],
          [boardSize / 2, 0.51, position],
        ]}
        color={color}
        lineWidth={1.4}
      />
    );
  }

  for (let i = 0; i < size; i++) {
    const position = i * cellSize - boardSize / 2;
    lines.push(
      <Line
        key={`v-line-${i}`}
        points={[
          [position, 0.51, -boardSize / 2],
          [position, 0.51, boardSize / 2],
        ]}
        color={color}
        lineWidth={1.4}
      />
    );
  }
  return lines;
};
