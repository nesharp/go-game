// GoBoard.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Board } from "../../Board";
import { Stone } from "../../Stone";
import { useGame } from "../../../entities/game";

export default function GoBoard() {
  const {
    data: { boardState, boardSize, currentPlayer },
    move,
  } = useGame();
  const fullBoardSize = boardSize + 1;
  const cellSize = fullBoardSize / (boardSize - 1); // Розмір однієї клітинки

  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
      }}
      camera={{ position: [0, 10, 20], fov: 80 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#FFFEAB" />
      <Board
        size={boardSize}
        boardSize={fullBoardSize}
        onCellClick={(x, y) => {
          move(x, y);
        }}
      />

      {/* <Stone position={[-8 * cellSize, 0.7, -8 * cellSize]} color="black" />
      <Stone position={[0, 0.7, 0]} color="white" /> */}

      {boardState.map((row, x) =>
        row.map((cell, y) => {
          if (cell !== 0) {
            const color = cell === 1 ? "black" : "white";
            return (
              <Stone
                key={`${x}-${y}`}
                position={getStonePosition(x, y, cellSize)}
                color={color}
              />
            );
          }
          return null;
        })
      )}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
const getStonePosition = (
  x: number,
  y: number,
  cellSize: number
): [number, number, number] => [(x - 9) * cellSize, 0.7, (y - 9) * cellSize];
