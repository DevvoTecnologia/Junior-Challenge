import FormRing from "@/components/formRing";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


function CreateRing() {
  const navigate = useNavigate();


  return (
    <div className="h-screen w-full">
      <div className="w-full flex justify-center p-20">
        <img src="/assets/title.svg" alt="" />
      </div>
      <div className="w-full flex justify-center">
      <div className="relative bg-white rounded-3xl flex-col justify-center items-center pt-3 pb-6 px-14 z-10 text-center">
          <Button 
            onClick={() => navigate('/')}
            className="absolute left-3 bg-red-500 rounded-xl py-5 px-3 hover:bg-red-700 transition-colors duration-300"
          >
            <img src="/assets/back_arrow.svg" alt="" className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold mb-6">Create a Ring</h1>
          <FormRing />
      </div>
      </div>
      <img src="/assets/crew.svg" alt="" className="absolute w-full bottom-0"/>
    </div>
  )
}

export default CreateRing
