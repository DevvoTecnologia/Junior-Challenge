import { Button } from "@/components/ui/button";
import RingsList from "./components/RingsList";
import { Anvil } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/home/forgeRing">
        <Button className="flex mt-4">
          <Anvil className="h-4 w-4 mr-2" /> Forjar anel
        </Button>
      </Link>
      <RingsList />
    </>
  );
}
