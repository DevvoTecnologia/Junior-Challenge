import { deleteRing } from "@/api/delete-ring";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export const DeleteDialog = ({id}: {id: number}) => {
  const [open, setOpen] = useState(false)

  function updateRingsOnCache(id: number){
    const listCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['rings'],
    })
    listCache.forEach(([cacheKey, cacheData]) => {
      if(!cacheData){
        return
      }
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, [
          ...cacheData.filter(ring => {
            if(ring.ring_id !== id){
              return ring;
            }
          })
        ])
    })
  }

  const { mutateAsync: deleteRingFn} = useMutation({
    mutationFn: deleteRing,
    async onSuccess(_,id) {
      updateRingsOnCache(id);
    }
  })

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 rounded-xl py-5 px-3 hover:bg-red-700 transition-colors duration-300">
          <img src="/assets/trash.svg" alt="" className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white  max-w-[300px]">
        <DialogHeader>
          <DialogTitle className="mb-10 text-center mt-5">Você tem certeza que deseja deletar este anel?</DialogTitle>
          <DialogDescription className="flex gap-3 justify-center">
            <DialogClose asChild>
              <Button 
                className=" rounded-xl py-5 px-3 bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-300"
              >
                CANCELAR
              </Button>
           </DialogClose>
            <Button 
              onClick={() => deleteRingFn(id)}
              className="bg-red-500 rounded-xl py-5 px-3 text-white hover:bg-red-700 transition-colors duration-300"
            >
              EXCLUIR
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}