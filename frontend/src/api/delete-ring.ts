import { api } from "@/lib/axios";

export type DeleteRingResponse = {
  message: string;
};

export type DeleteRingParams = {
  id: string;
};

export const deleteRing = async ({ id }: DeleteRingParams) => {
  const response = await api.delete<DeleteRingResponse>(`/${id}`);

  return response.data;
};
