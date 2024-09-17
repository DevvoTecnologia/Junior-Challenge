"use client";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ringSchema, { CreateRing } from "./schemas/ring-schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Anvil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutationCreateRing } from "@/hooks/rings/mutations/useMutationCreate";
import { useRouter } from "next/navigation";

export default function Page() {
  const form = useForm<CreateRing>({
    resolver: zodResolver(ringSchema),
  });

  const router = useRouter();

  const { handleSubmit, control } = form;

  const { mutateAsync: create, isPending: isCreating } =
    useMutationCreateRing();

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  async function onSubmit(data: CreateRing) {
    if (imageBase64) {
      data.imagem = imageBase64;
    }

    console.log(data);
    const response = await create(data);

    if (response) {
      router.push("/home");
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageBase64(reader.result as string);
    };
    reader.onerror = (error) => console.error(error);
  }

  return (
    <>
      <p className="mt-6">
        Bem-vindo à Forja! Que seus anéis sejam forjados com maestria e coragem
      </p>
      <div className="mt-2 w-[50%] h-96 max-h-96 overflow-scroll">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit, (err) => console.log(err))();
            }}
            className="flex flex-col space-y-4 mt-4"
          >
            <FormField
              control={control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="nome">Nome</Label>
                  <Input {...field} placeholder="O Um Anel" id="nome" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="portador"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="portador">Portador</Label>
                  <Input {...field} placeholder="Gandalf" id="portador" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="poder"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="poder">Poder</Label>
                  <Input {...field} placeholder="Controlar fogo" id="poder" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="forjadoPor"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="forjadoPor">Forjado por</Label>
                  <Select
                    {...field}
                    onValueChange={(value) =>
                      form.setValue("forjadoPor", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ex: Humanos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Raças</SelectLabel>
                        <SelectItem value={"Anões"}>Anões</SelectItem>
                        <SelectItem value={"Elfos"}>Elfos</SelectItem>
                        <SelectItem value={"Homens"}>Homens</SelectItem>
                        <SelectItem value={"Sauron"}>Sauron</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="imagem"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="imagem">Imagem</Label>
                  <Input
                    {...field}
                    onChange={handleImageChange}
                    type="file"
                    placeholder="Imagem"
                    id="imagem"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isCreating}>
              {isCreating ? (
                <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Anvil className="w-4 h-4 mr-2" />
              )}
              Forjar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
