import React from "react";
import { cn } from "../../lib/utils";
import { useStore } from "../../hooks/use-store";
import { AdminFooter } from "../AdminFooter/AdminFooter";
import { AdminSideBar } from "../AdminSideBar/AdminSideBar";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const DashboardLayout: React.FC = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (!sidebar) return null;

  return (
    <>
      <AdminSideBar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Outlet />
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <AdminFooter />
      </footer>
    </>
  );
};

export default DashboardLayout;
