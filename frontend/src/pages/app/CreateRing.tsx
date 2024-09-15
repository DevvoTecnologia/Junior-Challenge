import FormRing from "@/components/formRing";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function CreateRing() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center">
      <div className="relative bg-white rounded-3xl flex-col justify-center items-center pt-3 pb-6 px-14 z-10 text-center">
        <Button 
          onClick={() => navigate('/')}
          className="absolute left-3 bg-red-500 rounded-xl py-5 px-3 hover:bg-red-700 transition-colors duration-300"
        >
          <img src="/assets/back_arrow.svg" alt="" className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold mb-6">Criar anel</h1>
        <FormRing />
      </div>
    </div>
  )
}

export default CreateRing
