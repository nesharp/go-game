import { FC, PropsWithChildren } from "react";
import { GameProvider as GameStateProvider } from "../../../entities/game";
export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  return <GameStateProvider>{children}</GameStateProvider>;
};
