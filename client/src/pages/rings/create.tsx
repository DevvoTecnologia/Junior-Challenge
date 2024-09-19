import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { ToastUI, useToast } from "@/components/Toast";

import { useState } from "react";
import { Input } from "@/components/Input";


export default function CreateRing() {
  const router = useRouter();
  const { handleToast, message, open, status } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)

    const ring = {
      nome: formData.get("nome") as string,
      poder: formData.get("poder") as string,
      portador: formData.get("portador") as string,
      forjadoPor: formData.get("forjadoPor") as string,
      imagem: formData.get("imagem") as string,
    }

    const response = await fetch("/rings", {
      method: "POST",
      body: JSON.stringify(ring)
    })

    setLoading(false)

    if (String(response.status).startsWith("5")) {
      return handleToast(
        false,
        "Erro no servidor, tente novamente mais tarde!"
      );
    }

    if (String(response.status).startsWith("4")) {
      return handleToast(
        false,
        "Erro no servidor, tente novamente mais tarde!"
      ); 
    }

    handleToast(
      true,
      `O anel [${ring.nome} foi criado com sucesso!]`
    ); 

    setTimeout(() => {
      router.push("/rings")
    }, 5000);
  }

  return (
    <>
      <Head>
        <title>Tolkien&apos;s Rings | Criar novo anel</title>
      </Head>

      <Header hasPrevious />

      <main className="flex flex-col gap-8 animate-fade-in-scale">
        <h1 className="font-bold text-2xl text-neutral-50">
          Crie um novo anel
        </h1>

        <form
          className="flex flex-col gap-6 mb-48 font-semibold"
          onSubmit={handleSubmit}
        >
          <Input.Text
            name="nome"
            required
            placeholder="Narya, o anel do fogo"
            label={
              <>
                Dê um <span className="text-primary-400">nome</span> ao anel
              </>
            }
          />
          <Input.Text
            name="poder"
            required
            placeholder="Seu portador ganha resistência ao fogo"
            label={
              <>
                Qual o <span className="text-primary-400">poder</span> deste
                anel?
              </>
            }
          />
          <Input.Text
            name="portador"
            required
            placeholder="Gandalf"
            label={
              <>
                Quem é seu <span className="text-primary-400">portador</span>?
              </>
            }
          />
          <Input.Radio
            name="forjadoPor"
            required
            values={["Sauron", "Elfos", "Anões", "Humanos"]}
            labels={["👁‍🗨 Sauron", "🧝‍♂️ Elfos", "🧔 Anões", "👱‍♂️👩 Humanos"]}
            label={
              <>
                Este anel foi forjado{" "}
                <span className="text-primary-400">por quem</span>?
              </>
            }
          />
          <Input.Image
            name="imagem"
            label={
              <>
                Qual a <span className="text-primary-400">imagem</span> deste
                anel?
              </>
            }
          />
          <Button disabled={loading} type="submit">Continuar</Button>
          <Button
            onClick={() => router.back()}
            className="bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
          >
            Voltar
          </Button>
        </form>

      </main>
        
      <ToastUI open={open} message={message} status={status} icon />
    </>
  );
}
