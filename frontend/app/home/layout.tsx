import Navbar from "./components/Navbar";

interface iProps {
  children: React.ReactNode;
}

export default function Layout({ children }: iProps) {
  return (
    <div className="min-w-screen min-h-screen p-5">
      <Navbar />
      <div className="flex flex-col items-center rounded-lg px-7 py-10 bg-stone-900">
        <h1 className="text-2xl text-yellow-400 font-black antialiased text-center">
          DevvoRings
        </h1>

        <p className="text-center text-muted-foreground italic mt-6 w-[40%]">
          {
            '"One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them"'
          }
        </p>

        {children}
      </div>
    </div>
  );
}
