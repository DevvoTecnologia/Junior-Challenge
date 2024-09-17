'use client'
import { useEffect,useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { SymbolIcon } from "@radix-ui/react-icons";

export const  VerifySession=({children}: Readonly<{
    children: React.ReactNode;
  }>)=>{
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');

    if(pathname=='/' && token!=null){
        router.push("/Forge")
        setIsLoading(false);
        return
    }

    if(token==null){
        router.push('/');
        setIsLoading(false); 
        return
    }

    setIsLoading(false); 


  }, [router]);

  if (isLoading) {
    return (<>
     <div className={`w-full bg-[url('https://i.redd.it/1p2hl6d04ol91.jpg')] absolute overflow-hidden bg-cover bg-center h-screen transition-all duration-500 ease-in-out 'blur-0 scale-100`} />
     <div className={`w-full h-svh flex justify-center items-center`} >
    <div className="text-white-600 p-4   h-56 bg-gray-950 z-10  text-center flex flex-col justify-center items-center rounded-md ease-in transition-all md:w-2/6 sm:w-5/6">
    <SymbolIcon  className=" m-4 h-4 w-4 animate-spin"/>

        <div>
            Verificando sua sessão
        </div>
    </div>
    </div>
    </>
);

  }else{
  return <div>{children}</div>;

  }

}