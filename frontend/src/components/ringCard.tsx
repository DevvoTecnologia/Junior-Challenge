import { CompleteRing } from "@/models/Ring";
import { textLimiter } from "@/utils/TextHandler";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "./deleteDialog";
import { Button } from "./ui/button";

export function RingCard({ring}: {ring: CompleteRing}) {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-white rounded-3xl flex flex-col gap-6 justify-center items-center py-6 px-14 z-10 h-[355px]  text-center">
      <div className="absolute top-3 right-3">
        <DeleteDialog id={ring.ring_id}/>
      </div>
      <div className="bg-slate-500 h-[90px] w-[90px] min-h-[90px] rounded-xl overflow-hidden flex justify-center items-center">
        <img loading="lazy" src={ring.ring_image} alt="" width={90} height={90} className="object-cover h-full" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">{textLimiter(ring.ring_name,14)}</h2>
        <span className="text-sm font-semibold text-gray-400">{textLimiter(ring.ring_power,23)}</span>
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-orange-600">Portador</h3>
          <span className="text-sm text-gray-400">{textLimiter(ring.carrier?.carrier_name, 9) || 'Não possui'}</span>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-orange-600">Forjador</h3>
          <span className="text-sm text-gray-400">{textLimiter(ring.forger.forger_name,9)}</span>
        </div>
      </div>
      <Button 
        onClick={() => navigate(`/${ring.ring_id}`)}
        className="px-16 py-5 rounded-xl bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-300"
      >
        EDITAR
      </Button>
    </div> 
  )
}
