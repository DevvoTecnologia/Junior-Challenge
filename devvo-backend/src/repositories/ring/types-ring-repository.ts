import { Prisma } from "@prisma/client";

import { Forger } from "../../@types";

export type RingCreateInput = Prisma.RingCreateInput & {
  carrier: string;
};

export type RingCreatedReturn = Prisma.RingGetPayload<{
  include: {
    carrier: true;
  };
}>;

export type RingCreateInputParameters = Omit<RingCreateInput, "id" | "history">;
export default interface IRingRepository {
  create(data: RingCreateInputParameters): Promise<RingCreatedReturn>;
  findAll(): Promise<RingCreatedReturn[]>;
  findById(id: string): Promise<RingCreatedReturn | null>;
  findForgerQuantityLimit(forgedBy: Forger): Promise<number>;
  update(id: string, data: RingCreateInput): Promise<RingCreatedReturn | null>;
  delete(id: string): Promise<void>;
}
