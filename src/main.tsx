import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GamePage } from "./pages/Game/index.ts";
import { GameProvider } from "./app/game-provider/index.ts";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GameProvider>
        <GamePage />
      </GameProvider>
    ),
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
