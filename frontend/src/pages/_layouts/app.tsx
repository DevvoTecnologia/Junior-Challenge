import { Outlet } from "react-router-dom";

import { Header } from "@/components/header";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
