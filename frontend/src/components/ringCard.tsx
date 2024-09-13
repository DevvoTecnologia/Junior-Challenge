import { Button } from "./ui/button";

export function RingCard() {
  return (
    <div className="relative bg-white rounded-3xl flex flex-col gap-6 justify-center items-center py-6 px-14 z-10">
      <div className="absolute top-3 right-3">
        <Button className="bg-red-500 rounded-xl py-5 px-3 hover:bg-red-700">
          <img src="/assets/trash.svg" alt="" />
        </Button>
      </div>
      <div className="bg-slate-500 h-[90px] w-[90px] rounded-xl"></div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">Anel de Ouro</h2>
        <span className="text-sm font-semibold text-gray-400">Tem o poder da morte</span>
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-orange-600">Portador</h3>
          <span className="text-sm text-gray-400">Gandalf</span>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-orange-600">Forjador</h3>
          <span className="text-sm text-gray-400">Anões</span>
        </div>
      </div>
      <Button className="px-16 py-5 rounded-xl bg-gray-700 text-white hover:bg-gray-900">EDITAR</Button>
    </div> 
  )
}
