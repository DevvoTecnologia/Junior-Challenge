import request, { iResponse } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export type Ring = {
  _id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
};

async function getAll() {
  const response: iResponse<Ring[]> = await request({
    path: "rings/get",
    method: "GET",
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

export default function useQueryGetAll() {
  return useQuery({
    queryKey: ["getAllRings"],
    queryFn: () => getAll(),
  });
}
