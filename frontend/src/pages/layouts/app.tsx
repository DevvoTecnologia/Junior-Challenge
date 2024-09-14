import { Outlet } from "react-router-dom";

export function AppLayout() {  
  return (
    <div className="h-screen w-full bg_Image antialiased">
      <Outlet />
      <img src="/assets/crew.svg" alt="" className="absolute w-full bottom-0"/>
    </div>
  );
}
