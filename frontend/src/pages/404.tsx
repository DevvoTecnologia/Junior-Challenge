import { PageTitle } from "@/components/PageTitle";
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";

export function NotFound() {  
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full antialiased" style={{
        backgroundImage: "url('/assets/background.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="h-screen w-full">
        <div className="w-full flex justify-center p-20">
          <PageTitle />
        </div>
        <h2 className="text-3xl text-center text-white mt-[100px]">Página não encontrada!</h2>
        <div className="flex justify-center mt-5">
          <Button 
            onClick={() => navigate("/")}
            className="bg-orange-600 px-8 hover:bg-orange-900 transition-colors duration-300"
          >
            <span className="text-md text-center text-white">Voltar</span>
          </Button>
        </div>
        <img src="/assets/crew.svg" alt="" className="absolute w-full bottom-0"/>
      </div>
    </div>
  );
}
