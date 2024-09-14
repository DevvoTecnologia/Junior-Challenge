import { api } from "@/lib/axios";

export type Ring = {
  id: string;
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  imageUrl: string;
};

export type GetRingListResponse = Ring[];

export const getRingList = async () => {
  const response = await api.get<GetRingListResponse>("");

  return response.data;
};
