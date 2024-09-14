import { CompleteRing } from "@/models/Ring";
import { api } from "../lib/axios";

export async function getRing(ring_id: number) {
  const response = await api.get<CompleteRing>(`/rings/${ring_id}`)

  return response.data;
}
