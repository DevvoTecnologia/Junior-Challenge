import RingsList from "./components/RingsList";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen py-7 px-5">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-violet-400 font-black antialiased text-center">
          DevvoRings
        </h1>

        <p className="text-center text-muted-foreground font-bold mt-6 w-[40%]">
          {
            '"One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them"'
          }
        </p>

        <RingsList />
      </div>
    </div>
  );
}
