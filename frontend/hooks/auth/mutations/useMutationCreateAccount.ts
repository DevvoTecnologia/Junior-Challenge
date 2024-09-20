import { CreateUser } from "@/app/auth/schemas/create-user-schema";
import request, { iResponse } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { iLoggedUser } from "./useMutationLogin";
import { toast } from "sonner";

async function createAccount(data: Omit<CreateUser, "repeatPassword">) {
  const response: iResponse<iLoggedUser> = await request({
    method: "POST",
    path: "auth/createAccount/",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.success) {
    toast.error("Erro ao forjar legado", {
      duration: 5000,
      closeButton: true,
      description: response.message,
    });
    return false;
  }

  return response.data;
}

export function useMutationCreateAccount() {
  return useMutation({
    mutationKey: ["createAccount"],
    mutationFn: (data: Omit<CreateUser, "repeatPassword">) =>
      createAccount(data),
  });
}
