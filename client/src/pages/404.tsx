import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404Page() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tolkien's Rings | Página não encontrada</title>
      </Head>

      <Header />

      <main className="m-auto text-preto">
        <section className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">
            <span className="text-primary-400">404</span> - Página não
            encontrada
          </h1>
          <p className="text-p text-cinza+2">
            A página que você tentou acessar não foi encontrada ou não está
            disponível.
          </p>
        </section>

        <section className="mt-8 mx-auto grid gap-4 items-center sm:grid-cols-2">
          <Button onClick={() => router.back()}>Voltar</Button>
          <Link
            href="/"
            className="font-bold text-center text-primária py-2 rounded-lg"
          >
            Ir para página inicial
          </Link>
        </section>
      </main>
    </>
  );
}
