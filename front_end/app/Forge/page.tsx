'use client'
import { Fade } from "@/components/animations/Fade";
import useInitialLoad from "@/hooks/useInitialLoad";
import useUserInfo from "@/hooks/useUserInfo";


import MusicPlayer, { MusicPlayerHandle } from "@/components/sound/MusicPlayer";
import { useRef, useState } from "react";

import { Aside } from "@/components/ui/Aside";
import { Rings } from "@/components/views/Ring";

import Routes from '../../components/router/CurrentView'
export default () => {
    const doorSoundRef = useRef<MusicPlayerHandle>(null);
    const fSoundRef = useRef<MusicPlayerHandle>(null);
    const forgeSoundRef = useRef<MusicPlayerHandle>(null);

    const isLoaded = useInitialLoad();

    const { user }: any = useUserInfo();

    const [route, setRoute] = useState<string>("main");
    const [params, setParams] = useState<any>({});
  

    return (
        <>
            <div className={`w-full bg-[url('https://img.itch.zone/aW1hZ2UvMjExODU5NC8xMjQ3NTgzMi5qcGc=/original/xnZ%2FYG.jpg')] absolute overflow-hidden bg-cover bg-center h-screen transition-all duration-500 ease-in-out ${!isLoaded ? 'blur-0 scale-100 opacity-5' : 'blur-md scale-110 opacity-100'}`} />
            <div className={`w-full h-svh flex justify-center items-center`} >

                <Fade className="sm:w-full  md:w-5/6  md:h-3/4 bg-gray-950 z-10  blur-0 ">

                    <MusicPlayer ref={doorSoundRef} src="/door.wav" playOnce />
                    <MusicPlayer ref={fSoundRef} src="/f_sound.wav" autoplay />
                    <MusicPlayer ref={forgeSoundRef} src="/forge.mp3" autoplay defaultVolume={0.3} />
                    <div className="sm:flex-col sm:flex-nowrap md:flex-row md flex-wrap flex justify-center bg-slate-900 h-full p-4">
                        <Aside  setRoute={setRoute} user={user} musicRef={{music:fSoundRef,door:doorSoundRef,hammers:forgeSoundRef}} />
                        <Routes  setRoute={setRoute} routeName={route} params={params} setParams={setParams} />
                    </div>

                </Fade>
            </div>

        </>
    )
}
