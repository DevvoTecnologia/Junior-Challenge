import { api } from "../lib/axios";

export async function deleteRing(id: number) {
  const response = await api.delete(`/rings/${id}`)

  return response.data;
}
