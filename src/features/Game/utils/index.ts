export const getStonePosition = (
  x: number,
  y: number,
  cellSize: number,
  boardY: number = 0
): [number, number, number] => [
  (x - 9) * cellSize,
  boardY + 0.7,
  (y - 9) * cellSize,
];
