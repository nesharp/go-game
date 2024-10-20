import { GameProvider } from "./entities/game";
import { Area } from "./widgets/Area";

function App() {
  return (
    <GameProvider>
      <Area />
    </GameProvider>
  );
}

export default App;
