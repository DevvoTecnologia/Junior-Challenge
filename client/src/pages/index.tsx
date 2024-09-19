import Link from "next/link";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tolkien&apos;s Rings</title>
      </Head>

      <Header />

      <main className="animate-fade-in-translate-up">
        <section className="mb-8">
          <p>Three Rings for the Elven-kings under the sky,</p>
          <p>Seven for the Dwarf-lords in their halls of stone,</p>
          <p>Nine for Mortal Men doomed to die,</p>
          <p>One for the Dark Lord on his dark throne</p>
        </section>

        <section className="mb-8">
          <p>In the Land of Mordor where the Shadows lie. </p>
          <p>One Ring to rule them all, </p>
          <p>One Ring to find them, One Ring to bring them all, </p>
          <p>
            and in the darkness bind themIn the Land of Mordor where the Shadows
            lie.
          </p>
        </section>

        <section className="text-right mb-8">
          <strong>— J.R.R. Tolkien</strong>
        </section>

        <Link href="/rings/create" className="w-full">
          <Button className={"w-full"}>Continuar</Button>
        </Link>
      </main>
    </>
  );
}
