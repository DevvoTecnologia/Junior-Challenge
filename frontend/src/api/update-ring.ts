import { Ring } from "@/models/Ring";
import { api } from "../lib/axios";

export interface UpdateRing extends Omit<Ring, "created_at" | "updated_at" | "deleted_at"  | "ring_id">{
    forger_id: number;
    carrier_id?: number | null;
}

export async function updateRing({id, data}: {id: number, data: UpdateRing}) {
  const response = await api.patch(`/rings/${id}`, data)

  return response.data;
}
