import { Ring } from "@/models/Ring";
import { api } from "../lib/axios";

export interface CreateRing extends Omit<Ring, "created_at" | "updated_at" | "deleted_at"  | "ring_id">{
    forger_id: number;
    carrier_id?: number | null;
}

export async function createRing({data}: {data: CreateRing}) {
  const response = await api.post(`/rings`, data)

  return response.data;
}
