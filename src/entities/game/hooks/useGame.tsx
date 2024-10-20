import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { GameData, HistoryItem } from "../types";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../shared/lib/utils";

// Initial data for the game
const initialData: GameData = {
  boardSize: 19,
  boardState: Array(19).fill(Array(19).fill(0)),
  capturedStones: { black: 0, white: 0 },
  currentPlayer: "black",
  moveHistory: [],
};

// Type for context state
type GameContextType = {
  data: GameData;
  move: (x: number, y: number) => void;
  resetGame: () => void;
};

// Create the game context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Game provider component
export const GameProvider: FC<PropsWithChildren<{}>> = function ({ children }) {
  const [data, setData] = useState<GameData>(initialData);

  // Load saved data from localStorage if available
  useEffect(() => {
    const savedData = getFromLocalStorage();
    if (savedData) {
      setData(savedData);
    }
  }, []);

  // Move function to update the board state
  const move = (x: number, y: number) => {
    if (data.boardState[x][y] !== 0) return;

    const newBoardState = data.boardState.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === x && colIndex === y) {
          return data.currentPlayer === "black" ? 1 : -1;
        }
        return cell;
      })
    );

    const newMoveHistory: HistoryItem[] = [
      ...data.moveHistory,
      { player: data.currentPlayer, position: [x, y] },
    ];

    const newPlayer = data.currentPlayer === "black" ? "white" : "black";

    const newData: GameData = {
      ...data,
      boardState: newBoardState,
      currentPlayer: newPlayer,
      moveHistory: newMoveHistory,
    };

    setData(newData);
    saveToLocalStorage(newData);
  };

  // Reset game to initial state
  const resetGame = () => {
    setData(initialData);
    saveToLocalStorage(initialData);
  };

  return (
    <GameContext.Provider value={{ data, move, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
