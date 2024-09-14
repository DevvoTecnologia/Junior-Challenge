import { Forger } from "@/models/Forger";
import { api } from "../lib/axios";

export async function getForgers() {
  const response = await api.get<Forger[]>('/forgers')

  return response.data;
}
