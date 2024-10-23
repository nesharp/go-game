import { useState } from "react";
import { useGame } from "../../../entities/game";
import { GoBoard } from "../../../features/Game";
import { PointCursor } from "../../../shared/point-cursor";
import { Area, ViewMapKeys } from "../../../widgets/Area";
import { Eye } from "lucide-react";

export const GamePage = () => {
  const [view, setView] = useState<ViewMapKeys>("free");

  const game = useGame();
  const onStonePlaced = (x: number, y: number) => {
    game.move(x, y);
  };
  const onViewChange = () => {
    switch (view) {
      case "free":
        setView("top");
        break;
      case "top":
        setView("side");
        break;
      case "side":
        setView("free");
        break;
      default:
        break;
    }
  };
  return (
    <div className="cursor-none overflow-clip h-screen w-screen">
      {/* TODO:refactor this */}
      <div className="absolute top-10 right-8 z-50 ">
        <button onClick={onViewChange}>
          <Eye className="h-10 w-10 text-gray-500 opacity-50 hover:opacity-100" />
        </button>
      </div>
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
