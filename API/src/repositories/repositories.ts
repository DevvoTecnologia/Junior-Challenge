// src/controllers/repositories.ts
import { CreateRingParams, UpdateRingParams } from '../controllers/create-ring/protocols';
import { Rings } from '../models/rings';

export interface ICreateRingRepository {
  createRing(params: CreateRingParams): Promise<Rings>;
}

export interface IUpdateRingRepository {
  updateRing(id: string, params: UpdateRingParams): Promise<Rings | null>;
}

export interface IDeleteRingRepository {
  deleteRing(id: string): Promise<Rings | null>;
}

export interface IGetRingsRepository {
  getRings(): Promise<Rings[]>;
  getRingById(id: string): Promise<Rings | null>;
}
