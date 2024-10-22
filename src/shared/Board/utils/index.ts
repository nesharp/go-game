import { Vector3 } from "three";
import { Coords } from "../types";

export const getCoordsByEvent = (
  e: any,
  size: number,
  cellSize: number
): Coords | undefined => {
  const point = e.point as Vector3;
  const x = Math.round(point.x / cellSize + (size - 1) / 2);
  const y = Math.round(point.z / cellSize + (size - 1) / 2);
  if (x < 0 || x >= size || y < 0 || y >= size) return;
  return { x, y };
};
