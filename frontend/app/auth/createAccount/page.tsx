"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import useMutationLogin from "@/hooks/auth/mutations/useMutationLogin";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import createUserSchema, { CreateUser } from "../schemas/create-user-schema";
import { useMutationCreateAccount } from "@/hooks/auth/mutations/useMutationCreateAccount";

export default function Page() {
  const router = useRouter();

  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
  });

  const { handleSubmit, control } = form;

  const { mutateAsync: login } = useMutationLogin();
  const { mutateAsync: createAccount, isPending: isCreating } =
    useMutationCreateAccount();

  async function onSubmit(data: CreateUser) {
    console.log(data);

    // CREATE ACC
    const accountResponse = await createAccount(data);

    if (!accountResponse) {
      return;
    }

    // LOGIN AUTOMATIC
    const response = await login(data);

    console.log("resdadasdj", response);

    if (response) {
      localStorage.setItem("token", `${response.token}`);
      router.push("/home/");
    }
  }

  return (
    <div className="h-full flex justify-center items-center mt-20 md:mt-[10%] px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forje seu legado</CardTitle>
          <CardDescription>
            Forje seu legado para entrar nas terras médias
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="m@email.com"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="********"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="repeatPassword">Repita sua senha</Label>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="********"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isCreating} type="submit">
                {isCreating && <ReloadIcon className="w-4 h-4 animate-spin" />}
                Forjar legado
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => router.push("/auth/")}
            variant="link"
            className="mx-auto"
          >
            Entrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
