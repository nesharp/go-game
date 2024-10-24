import { useState } from "react";
import { useGame } from "../../../entities/game";
import { GoBoard } from "../../../features/Game";
import { PointCursor } from "../../../shared/point-cursor";
import { Area, ViewMapKeys } from "../../../widgets/Area";
import { ViewsChanger } from "../../../features/views-changer";

export const GamePage = () => {
  const [view, setView] = useState<ViewMapKeys>("free");

  const game = useGame();
  const onStonePlaced = (x: number, y: number) => {
    game.move(x, y);
  };

  return (
    <div className="cursor-none  h-screen w-screen">
      <ViewsChanger view={view} setView={setView} />
      <Area view={view}>
        <GoBoard
          boardSize={game.data.boardSize}
          position={[0, 0, 0]}
          boardState={game.data.boardState}
          onStonePlaced={onStonePlaced}
        />
      </Area>
      <PointCursor />
    </div>
  );
};
