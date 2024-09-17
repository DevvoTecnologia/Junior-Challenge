import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import SlideFromLeft from "@/components/animations/SlideFromLeft";
import { BounceWrapper } from "@/components/animations/Bounce";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion"
import { LogoutBtn } from "@/components/auth/Logout";
import { Fade } from "@/components/animations/Fade";
import VolumeControl from "@/components/sound/MusicControl";

export const Aside = ({user,musicRef}:any)=>{

    return(
        <div className="sm:w-full sm:p-0 md:w-3/12 md:p-2 bg-slate-950 h-full">
        <Fade>
            <div className="bg-slate-800 rounded-xl h-32">
                <div className=" flex justify-center">
                    <Avatar className="h-24 w-24 m-1"  >
                        <AvatarImage src="ht" />
                        <AvatarFallback className="text-black" >{user && user.nome.slice(0, 1)}</AvatarFallback>
                    </Avatar>

                </div>
                <div className="flex justify-center">
                    {user && user.nome}
                </div>
            </div>
        </Fade>
        <Fade>
            <div className=" bg-slate-800 rounded-xl h-52 flex justify-center flex-col p-2 mt-2">
                <VolumeControl players={[musicRef.door,musicRef.music, musicRef.hammers]} />
                <LogoutBtn />
            </div>
        </Fade>

        </div>
    )
}