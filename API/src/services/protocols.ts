// src/services/protocols.ts

import { CreateRingParams } from "../controllers/create-ring/protocols";
import { UpdateRingParams } from "../controllers/update-ring/protocols";
import { Rings } from "../models/rings";


export interface IRingService {
  createRing(params: CreateRingParams): Promise<Rings>;
  getRingById(id: string): Promise<Rings | null>;
  updateRing(id: string, params: UpdateRingParams): Promise<Rings | null>;
  deleteRing(id: string): Promise<Rings | null>;
  getRings(): Promise<Rings[]>; 
}
