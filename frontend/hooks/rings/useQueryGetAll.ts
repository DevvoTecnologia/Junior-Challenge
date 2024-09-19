import { iRing } from "@/app/home/forgeRing/schemas/ring-schema";
import request, { iResponse } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface iRingWithId extends iRing {
  _id: string;
}

async function getAll() {
  const response: iResponse<iRingWithId[]> = await request({
    path: "rings/get",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.success) {
    toast.error("Erro ao buscar os anéis", {
      description: response.message,
      duration: 5000,
      closeButton: true,
    });

    return false;
  }

  console.log(response.data);

  return response.data;
}

export default function useQueryGetAll() {
  return useQuery({
    queryKey: ["getAllRings"],
    queryFn: () => getAll(),
  });
}
