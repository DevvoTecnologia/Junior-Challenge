import { CreateRing, iRing } from "@/app/home/forgeRing/schemas/ring-schema";
import request, { iResponse } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface iRingWithId extends iRing {
  _id: string;
}

async function getById(id: string) {
  const response: iResponse<CreateRing> = await request({
    path: `rings/getById/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.success) {
    toast.error("Erro ao buscar os anéis", {
      duration: 5000,
      closeButton: true,
    });

    return false;
  }

  console.log(response.data);

  return response.data;
}

export default function useQueryGetById(id: string) {
  return useQuery({
    queryKey: ["getRingById"],
    queryFn: () => getById(id),
  });
}
