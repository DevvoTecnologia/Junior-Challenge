import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404";
import CreateRing from "./pages/app/CreateRing";
import EditRing from "./pages/app/EditRing";
import ListRings from "./pages/app/ListRings";
import { AppLayout } from "./pages/layouts/app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <ListRings /> },
      { path: "/create", element: <CreateRing /> },
      { path: "/edit/:id", element: <EditRing /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
