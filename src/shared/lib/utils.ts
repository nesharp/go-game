import { GameData } from "../../entities/game";

export const saveToLocalStorage = (data: GameData) => {
  localStorage.setItem("game", JSON.stringify(data));
};

export const getFromLocalStorage = (): GameData | null => {
  const data = localStorage.getItem("game");
  return data ? JSON.parse(data) : null;
};
export const degToRad = (degrees: number) => degrees * (Math.PI / 180);
