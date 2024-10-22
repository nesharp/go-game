import { GameProvider } from "../../../entities/game";
import { PointCursor } from "../../../shared/point-cursor";
import { LazyArea } from "../../../widgets/Area";

export const GamePage = () => {
  return (
    <GameProvider>
      <div className="cursor-none">
        <LazyArea />
        <PointCursor />
      </div>
    </GameProvider>
  );
};
