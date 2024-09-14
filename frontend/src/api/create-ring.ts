import { api } from "@/lib/axios";

export type CreateRingResponse = {
  id: string;
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  imageUrl: string;
}[];

export type CreateRingBody = {
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  imageUrl: string;
};

export const createRing = async ({
  name,
  power,
  bearer,
  forgedBy,
  imageUrl,
}: CreateRingBody) => {
  const response = await api.post<CreateRingResponse>("", {
    name,
    power,
    bearer,
    forgedBy,
    imageUrl,
  });

  return response.data;
};
