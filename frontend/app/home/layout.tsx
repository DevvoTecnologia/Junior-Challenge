import AuthCtx from "@/helpers/AuthCtx";
import Navbar from "../../components/Navbar/Navbar";

interface iProps {
  children: React.ReactNode;
}

export default function Layout({ children }: iProps) {
  return (
    <AuthCtx>
      <div className="min-w-screen min-h-screen p-2 sm:p-3 md:p-4 lg:p-5">
        <Navbar />
        <div className="flex flex-col items-center rounded-lg px-3 sm:px-4 md:px-5 lg:px-7 py-5 sm:py-6 md:py-8 lg:py-10 bg-stone-900">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-black antialiased text-center">
            DevvoRings
          </h1>

          <p className="text-center text-muted-foreground italic mt-3 sm:mt-4 md:mt-5 lg:mt-6 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 text-sm sm:text-base">
            {
              '"One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them"'
            }
          </p>

          {children}
        </div>
      </div>
    </AuthCtx>
  );
}
