import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GamePage } from "./pages/Game/index.ts";
const router = createBrowserRouter([{ path: "/", element: <GamePage /> }]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
