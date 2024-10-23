import { FC } from "react";
import { useMousePosition } from "../hooks";
type PointCursorProps = {
  type?: "default" | "grab";
};
export const PointCursor: FC<PointCursorProps> = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="h-3 w-3 opacity-30 bg-black rounded-full absolute z-[9999] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        top: y,
        left: x,
      }}
    />
  );
};
