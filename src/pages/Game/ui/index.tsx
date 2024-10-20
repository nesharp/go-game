import { GameProvider } from "../../../entities/game";
import { PointCursor } from "../../../shared/point-cursor";
import { Area } from "../../../widgets/Area";

export const GamePage = () => {
  return (
    <GameProvider>
      <div className="cursor-none">
        <Area />
        <PointCursor />
      </div>
    </GameProvider>
  );
};
