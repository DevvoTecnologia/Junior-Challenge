import { Button } from "@/components/ui/button";
import RingsList from "./components/RingsList";
import { Anvil } from "lucide-react";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen p-20">
      <div className="flex flex-col items-center rounded-lg px-7 py-10 bg-stone-900">
        <h1 className="text-2xl text-yellow-400 font-black antialiased text-center">
          DevvoRings
        </h1>

        <p className="text-center text-muted-foreground font-bold mt-6 w-[40%]">
          {
            '"One Challenge to rule them all, One Challenge to find them, One Challenge to bring them all, and in the darkness bind them"'
          }
        </p>

        <Button className="flex mt-4">
          <Anvil className="h-4 w-4 mr-2" /> Forjar anel
        </Button>

        <RingsList />
      </div>
    </div>
  );
}
