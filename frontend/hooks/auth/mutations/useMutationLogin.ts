import { User } from "@/app/auth/schemas/user-schema";
import request, { iResponse } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface iLoggedUser {
  email: string;
  token: string;
}

async function login(data: User) {
  const response: iResponse<iLoggedUser> = await request({
    path: "auth/authenticate",
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.success) {
    toast.error("Erro ao fazer login", {
      duration: 5000,
      closeButton: true,
      description: response.message,
    });

    return false;
  }

  return response.data;
}

export default function useMutationLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: User) => login(data),
    onSuccess: (data) => {
      if (data) {
        toast.success("Seja bem vindo às terras médias, viajante", {
          duration: 5000,
          closeButton: true,
        });

        return data;
      }
    },
  });
}
