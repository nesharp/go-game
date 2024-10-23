import { FC } from "react";
import { useMousePosition } from "../hooks";
type PointCursorProps = {
  type?: "default" | "grab";
};
export const PointCursor: FC<PointCursorProps> = () => {
  const { x, y } = useMousePosition();
  // Отримання розмірів вікна
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Обмеження позиції курсора, щоб він не виходив за межі вікна
  const cursorX = Math.max(0, Math.min(x, windowWidth - 8));
  const cursorY = Math.max(0, Math.min(y, windowHeight - 8));
  return (
    <div
      className="h-3 w-3 opacity-30 bg-black rounded-full absolute z-[9999] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        top: cursorY,
        left: cursorX,
      }}
    />
  );
};
