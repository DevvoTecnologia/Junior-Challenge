'use client';
import useInitialLoad from "@/hooks/useInitialLoad";
import { LoginForm } from "@/forms/LoginForm";
import { Fade } from "@/components/animations/Fade";
import SauronEye from "@/components/ui/eye";

export default function MainPage() {
  const isLoaded = useInitialLoad();
  return (
    <div className={`relative w-full bg-[url('https://i.redd.it/1p2hl6d04ol91.jpg')] bg-cover bg-center h-screen transition-all duration-500 ease-in-out ${isLoaded ? 'blur-0 scale-100' : 'blur-md scale-110'}`}>
      <Fade className="w-full flex justify-center items-center h-full  ">
      <div className=" bg-gray-900 px-6 p-2 pt-28 w-full lg:m-0 xl:m-0 2xl:m-2 md:w-1/6 h-2/4 z-10 sm:m-4    ">
  <LoginForm />
</div>

        <div className="bg-white w-2/6 h-2/4 hidden md:block">
        <SauronEye/>
        </div>
      </Fade>

    </div>
  );
}
