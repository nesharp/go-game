export type CapturesStones = {
  black: number;
  white: number;
};
export type HistoryItem = {
  player: "black" | "white";
  position: [number, number];
};
export type BoardState = number[][];
export type GameData = {
  boardSize: number;
  boardState: BoardState;
  capturedStones: CapturesStones;
  moveHistory: HistoryItem[];
  currentPlayer: "black" | "white";
};
