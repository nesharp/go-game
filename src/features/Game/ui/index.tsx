import { FC } from "react";
import { useGame } from "../../../entities/game";
import { Stone } from "../../../shared/Stone";
import { Board } from "../../../shared/Board";
type Props = {
  y?: number;
};
export const GoBoard: FC<Props> = ({ y: boardY }) => {
  const {
    data: { boardState, boardSize },
    move,
  } = useGame();
  const fullBoardSize = boardSize + 1;
  const cellSize = fullBoardSize / (boardSize - 1); // Розмір однієї клітинки
  return (
    <>
      <Board
        size={boardSize}
        boardSize={fullBoardSize}
        onCellClick={(x, y) => {
          move(x, y);
        }}
        y={boardY}
      />

      {boardState.map((row, x) =>
        row.map((cell, y) => {
          if (cell !== 0) {
            const color = cell === 1 ? "black" : "white";
            return (
              <Stone
                key={`${x}-${y}`}
                position={getStonePosition(x, y, cellSize, boardY)}
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
const getStonePosition = (
  x: number,
  y: number,
  cellSize: number,
  boardY: number = 0
): [number, number, number] => [
  (x - 9) * cellSize,
  boardY + 0.7,
  (y - 9) * cellSize,
];
