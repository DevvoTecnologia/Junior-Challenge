import { Button } from "@/components/ui/button"
import {
  Dialog as DialogCont,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode } from "react"


const Build = ({state,children}:any)=>{
  
  const {op,setOp,message,type="ok",onYes=null} = state
  
  return(
  <DialogCont open={op} onOpenChange={setOp} >
  <DialogTrigger asChild>
   {children}
  </DialogTrigger>
  <DialogContent style={{backgroundColor:'#202026'}} className=" w-3/4 sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Atenção</DialogTitle>
      <DialogDescription>
        {message}
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
     <Button  onClick={()=>{
      
      if(state.confirmAction!=undefined){
        state.confirmAction()
      }
      setOp(false)}} >{state.confirmAction!=undefined?'Sim':'Ok'}</Button>
      {state.confirmAction!=undefined && (
        <Button variant={"destructive"} onClick={()=>{
    
          setOp(false)}} >Não</Button>
      )
      }
  
    </DialogFooter>
  </DialogContent>
</DialogCont>
)}

export default Build

