import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { ToastUI, useToast } from "@/components/Toast";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Carousel } from "@/components/Carousel";
import { GetServerSideProps } from "next";
import { getRings } from "@/services/getRings";
import { Ring } from "@/domain/Rings";
import Link from "next/link";



export const getServerSideProps: GetServerSideProps = async (context) => {
    
  
    const rings = await getRings()
  
    return {
      props: { rings },
    };
  };
  
  interface Props {
    rings: Ring[]
  }

export default function Rings({ rings }: Props) {
    const router = useRouter();

    const sauronRings = rings.filter((ring) => ring.forjadoPor === "Sauron")
    const elvensRings = rings.filter((ring) => ring.forjadoPor === "Elfos")
    const dwarfsRings = rings.filter((ring) => ring.forjadoPor === "Anões")
    const humansRings = rings.filter((ring) => ring.forjadoPor === "Humanos")

    return (
        <>
            <Head>
                <title>Tolkien&apos;s Rings | Aneis de LOTR</title>
            </Head>

            <Header hasPrevious />

            <main className="flex flex-col gap-8 pb-8 animate-fade-in-scale">
                <h1 className="font-bold text-2xl text-neutral-50">
                    Os aneis de LOTR
                </h1>

                <Carousel 
                    rings={sauronRings}
                    subtitle={<>Anel forjado por <Link href={"/rings/create?forjadoPor=Sauron"} className="text-primary-400 font-bold">Sauron</Link></>} 
                />
                <Carousel 
                    rings={elvensRings}
                    subtitle={<>Aneis forjados pelos <Link href="/rings/create?forjadoPor=Elfos" className="text-primary-400 font-bold">Elfos</Link></>} 
                />
                <Carousel 
                    rings={dwarfsRings}
                    subtitle={<>Aneis forjados pelos <Link href="/rings/create?forjadoPor=Anões" className="text-primary-400 font-bold">Anões</Link></>} 
                />
                <Carousel 
                    rings={humansRings}
                    subtitle={<>Aneis forjados pelos <Link href="/rings/create?forjadoPor=Humanos" className="text-primary-400 font-bold">Humanos</Link></>} 
                />
            </main>
        </>
    );
}
