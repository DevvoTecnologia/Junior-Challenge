import request, { iResponse } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { iRingWithId } from "../useQueryGetAll";

async function editRing(data: iRingWithId) {
  const response: iResponse<iRingWithId> = await request({
    path: `rings/update/${data._id}`,
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.success) {
    toast.error("Erro ao reforjar o anel", {
      duration: 5000,
      description: response.message,
      closeButton: true,
    });
    return false;
  }

  return response.data;
}

export function useMutationEditRing() {
  return useMutation({
    mutationKey: ["editRing"],
    mutationFn: (data: iRingWithId) => editRing(data),
    onSuccess: (data) => {
      if (data) {
        toast.success("Anel reforjado com sucesso", {
          duration: 5000,
          closeButton: true,
        });
      }
    },
  });
}
