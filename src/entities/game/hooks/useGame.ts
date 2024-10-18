import { useState, useEffect } from "react";
import { GameData, HistoryItem } from "../types";

const initialData: GameData = {
  boardSize: 19,
  boardState: Array(19).fill(Array(19).fill(0)),
  capturedStones: { black: 0, white: 0 },
  currentPlayer: "black",
  moveHistory: [],
};

type UseGameReturnType = {
  data: GameData;
  move: (x: number, y: number) => void;
  resetGame: () => void;
};

export const useGame = (): UseGameReturnType => {
  const [data, setData] = useState<GameData>(initialData);

  useEffect(() => {
    const savedData = getFromLocalStorage();
    if (savedData) {
      setData(savedData);
    }
  }, []);

  const move = (x: number, y: number) => {
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

  const resetGame = () => {
    setData(initialData);
    saveToLocalStorage(initialData);
  };

  return { data, move, resetGame };
};

const saveToLocalStorage = (data: GameData) => {
  localStorage.setItem("game", JSON.stringify(data));
};

const getFromLocalStorage = (): GameData | null => {
  const data = localStorage.getItem("game");
  return data ? JSON.parse(data) : null;
};
