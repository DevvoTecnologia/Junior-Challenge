export interface RingResponseBase {
  id: number;
  name: string;
  power: string;
  owner: string;
  forgedBy: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  url: string;
}

export type Ring = RingResponseBase | undefined;

export type Rings = RingResponseBase[] | undefined;

export type CreateRingSuccess = RingResponseBase;
export type UpdateRingSuccess = RingResponseBase;
