
import Dialog from "@/Factory/Dialog";
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { ExitIcon } from "@radix-ui/react-icons";
export const LogoutBtn = ()=>{
    const [open,setOpen]= useState<boolean>(false)
    const [message,setMessage]= useState<string>('Você tem certeza que quer sair da forja?')
    const [onYes,setOnYes]= useState<Function>()
    const router = useRouter();
    const Logout = ()=>{

        const onYesHandle =()=>{
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('USER_INFO');
            router.replace("/")
        }
        setOnYes(onYesHandle)
        setOpen(true)

       
    }

    return(
<>
<Dialog state={{op:open,setOp:(state:boolean)=>{setOpen(state)},message:message,type:"ok",onYes:onYes}}/>
        <Button onClick={Logout} className="bg-orange-600" >
        <ExitIcon className="mr-2"/>
            Sair Da Forja
        </Button>
</>
    )


}