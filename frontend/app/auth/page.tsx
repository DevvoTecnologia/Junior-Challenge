"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import userSchema, { User } from "./schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import useMutationLogin from "@/hooks/auth/mutations/useMutationLogin";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const { handleSubmit, control } = form;

  const { mutateAsync: login, isPending } = useMutationLogin();

  async function onSubmit(data: User) {
    console.log(data);

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
          <CardTitle className="text-2xl">DevvoRings</CardTitle>
          <CardDescription>Entre com sua conta</CardDescription>
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
              <Button disabled={isPending} type="submit">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
