import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "./pages/404";
import { RingCreation } from "./pages/app/ring-creation/ring-creation";
import { RingGallery } from "./pages/app/ring-gallery/ring-gallery";
import { AppLayout } from "./pages/_layouts/app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <RingGallery /> },
      { path: "/creation", element: <RingCreation /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
