import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app.routes";

export const router = createBrowserRouter([
  { path: "*", Component: AppRoutes },
]);
