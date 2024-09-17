"use client";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ringSchema, { CreateRing } from "../schemas/ring-schema";
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
import { useMutationEditRing } from "@/hooks/rings/mutations/useMutationEdit";
import { useRouter } from "next/navigation";
import { iRingWithId } from "@/hooks/rings/useQueryGetAll";
import useQueryGetById from "@/hooks/rings/useQueryGetById";
import Image from "next/image";

export default function Page({
  params: { ringId },
}: {
  params: { ringId: string };
}) {
  const { data: ring, isLoading } = useQueryGetById(ringId);

  const form = useForm<CreateRing>({
    values: ring ? { ...ring, imagem: "" } : undefined,
    resolver: zodResolver(ringSchema),
  });

  const { handleSubmit, control } = form;

  const { mutateAsync: edit, isPending: isEditing } = useMutationEditRing();

  const [imageBase64, setImageBase64] = useState<string | null>(
    ring && ring.imagem ? ring.imagem : null
  );

  const router = useRouter();

  async function onSubmit(data: CreateRing) {
    if (imageBase64) {
      data.imagem = imageBase64;
    }

    const newData: iRingWithId = { ...data, _id: ringId };
    const response = await edit(newData);

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

  if (isLoading) {
    return (
      <>
        <p>Sauron está procurando pelo anel...</p>
      </>
    );
  }

  return (
    <div>
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
                  onValueChange={(value) => form.setValue("forjadoPor", value)}
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
          {imageBase64 && (
            <Image
              src={imageBase64}
              alt="Ring Image"
              width={100}
              height={100}
            />
          )}

          <Button disabled={isEditing}>
            {isEditing ? (
              <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
            ) : (
              <Anvil className="w-4 h-4 mr-2" />
            )}
            Reforjar
          </Button>
        </form>
      </Form>
    </div>
  );
}
