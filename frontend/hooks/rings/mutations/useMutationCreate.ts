import { CreateRing, iRing } from "@/app/home/forgeRing/schemas/ring-schema";
import request, { iResponse } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function createRing(data: CreateRing) {
  const response: iResponse<iRing> = await request({
    path: "rings/create",
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.success) {
    toast.error("Erro ao forjar o anel", {
      duration: 5000,
      description: response.message,
      closeButton: true,
    });
    return false;
  }

  return response.data;
}

export function useMutationCreateRing() {
  return useMutation({
    mutationKey: ["createRing"],
    mutationFn: (data: CreateRing) => createRing(data),
    onSuccess: (data) => {
      if (data) {
        toast.success("Anel forjado com sucesso", {
          duration: 5000,
          closeButton: true,
        });
      }
    },
  });
}
