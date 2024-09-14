import { api } from "@/lib/axios";

export type UpdateRingResponse = {
  id: string;
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  imageUrl: string;
}[];

export type UpdateRingParams = {
  id: string;
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  imageUrl?: string;
};

export const updateRing = async ({
  name,
  power,
  bearer,
  forgedBy,
  imageUrl,
  id,
}: UpdateRingParams) => {
  const response = await api.put<UpdateRingResponse>(`/${id}`, {
    name,
    power,
    bearer,
    forgedBy,
    imageUrl,
  });

  return response.data;
};
