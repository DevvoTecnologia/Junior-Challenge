import { Carrier } from "@/models/Carrier";
import { api } from "../lib/axios";

export async function getCarriers() {
  const response = await api.get<Carrier[]>('/carriers')

  return response.data;
}
