import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function AppLayout() {  
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen w-full bg_image antialiased" style={{
      backgroundImage: "url('/assets/background.svg')",
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="h-screen w-full">
        {location.pathname === "/" && <Button 
          type="button" 
          onClick={() => navigate('/create')}
          className="fixed top-5 right-5 px-16 py-5 rounded-xl bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-300"
        >
          CRIAR
        </Button>}
        <div className="w-full flex justify-center p-20">
          <PageTitle />
        </div>
        <Outlet />
        <img src="/assets/crew.svg" alt="" className="absolute w-full bottom-0"/>
      </div>
    </div>
  );
}
