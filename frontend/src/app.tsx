import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme/theme-provider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { queryClient } from "./lib/react-query";
import { Toaster } from "@/components/ui/toaster";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="ring-theme" defaultTheme="dark">
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
