import Ring, { Forjador } from "../models/Ring";

const MAX_RINGS: Record<Forjador, number> = {
  [Forjador.ELFOS]: 3,
  [Forjador.ANOES]: 7,
  [Forjador.HOMENS]: 9,
  [Forjador.SAURON]: 1,
};
interface RingData {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: Forjador;
  imagem: string;
}

export const createRing = async (ringData: RingData) => {
  const { forjadoPor } = ringData;

  const ringsCount = await Ring.countDocuments({ forjadoPor });

  if (ringsCount >= MAX_RINGS[forjadoPor] || 0) {
    throw new Error(`Limite de anéis para ${forjadoPor} excedido`);
  }

  const ring = new Ring(ringData);
  return await ring.save();
};

export const getRings = async () => {
  return await Ring.find();
};

export const updateRing = async (id: string, updates: Partial<RingData>) => {
  return await Ring.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteRing = async (id: string) => {
  return await Ring.findByIdAndDelete(id);
};
