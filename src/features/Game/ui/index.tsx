import { FC } from "react";
import { Stone } from "../../../shared/Stone";
import { Board } from "../../../shared/Board";
import { getStonePosition } from "../utils";
type Props = {
  position: [number, number, number];
  boardState: number[][];
  boardSize: number;
  onStonePlaced: (x: number, y: number) => void;
};
export const GoBoard: FC<Props> = ({
  boardSize,
  boardState,
  onStonePlaced,
  position,
}) => {
  const fullBoardSize = boardSize + 1;
  const cellSize = fullBoardSize / (boardSize - 1); // Розмір однієї клітинки
  return (
    <>
      <Board
        size={boardSize}
        boardSize={fullBoardSize}
        onCellClick={onStonePlaced}
        position={position}
      />

      {boardState.map((row, x) =>
        row.map((cell, y) => {
          if (cell !== 0) {
            const color = cell === 1 ? "black" : "white";
            return (
              <Stone
                key={`${x}-${y}`}
                position={getStonePosition(x, y, cellSize, position[1])}
                color={color}
              />
            );
          }
          return null;
        })
      )}
    </>
  );
};
