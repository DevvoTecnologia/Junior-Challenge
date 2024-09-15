import { CompleteRing } from "@/models/Ring";
import { api } from "../lib/axios";

export async function getRings() {
  const response = await api.get<CompleteRing[]>('/rings')

  return response.data;
}
