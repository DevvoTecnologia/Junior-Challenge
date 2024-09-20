"use client";

import { CreateRing } from "@/app/home/forgeRing/schemas/ring-schema";
import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Anvil } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useMutationCreateRing } from "@/hooks/rings/mutations/useMutationCreate";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutationEditRing } from "@/hooks/rings/mutations/useMutationEdit";
import { iRingWithId } from "@/hooks/rings/useQueryGetById";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface iProps {
  type: "Edit" | "Create";
  form: UseFormReturn<CreateRing>;
  _id?: string;
}

export default function RingForm({ type, form, _id }: iProps) {
  const router = useRouter();

  const { handleSubmit, control } = form;

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const { mutateAsync: create, isPending: isCreating } =
    useMutationCreateRing();

  const { mutateAsync: edit, isPending: isEditing } = useMutationEditRing();

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

  async function onSubmit(data: CreateRing) {
    if (imageBase64) {
      data.imagem = imageBase64;
    }

    console.log(data);

    let response;

    if (type === "Edit") {
      const newData: iRingWithId = { ...data, _id: _id ? _id : "" };
      response = await edit(newData);
    } else {
      response = await create(data);
    }

    if (response) {
      router.push("/home");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Forja de Anéis
          </CardTitle>
          <CardDescription className="text-center">
            Bem-vindo à Forja! Que seus anéis sejam forjados com maestria e
            coragem
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="max-h-[300px] overflow-y-auto">
          <Form {...form}>
            <form className="flex flex-col space-y-4 mt-4">
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
                      value={form.watch("forjadoPor")}
                      onValueChange={(value) =>
                        form.setValue("forjadoPor", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ex: Homens" />
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
                      multiple={false}
                      onChange={handleImageChange}
                      type="file"
                      value={imageBase64 ? imageBase64 : ""}
                      placeholder="Imagem"
                      id="imagem"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <Separator className="mb-2" />
        <CardFooter>
          <Button
            className="w-full"
            disabled={isEditing || isCreating}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit, (err) => console.log(err))();
            }}
          >
            {isEditing || isCreating ? (
              <ReloadIcon className="animate-spin h-4 w-4 mr-2" />
            ) : (
              <Anvil className="w-4 h-4 mr-2" />
            )}
            {type === "Create" ? "Forjar" : "Reforjar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
