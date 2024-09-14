import Ring, { RingProps } from "../models/ring";

const maxRings: { [key: string]: number } = {
  elves: 3,
  dwarves: 7,
  men: 9,
  sauron: 1,
};

const createRing = async (data: RingProps) => {
  const { name, power, bearer, forgedBy, imageUrl } = data;

  const createdRingsCount = await Ring.countDocuments({ forgedBy });
  const maxAllowedRings = maxRings[forgedBy];

  if (createdRingsCount >= maxAllowedRings) {
    throw new Error(`Ring limit for ${forgedBy} reached`);
  }

  const newRing = new Ring({ name, power, bearer, forgedBy, imageUrl });
  return newRing.save();
};

const listRings = async () => {
  return Ring.find();
};

const updateRing = async (id: string, data: RingProps) => {
  const { forgedBy } = data;

  const existingRing = await Ring.findById(id);

  if (existingRing && existingRing.forgedBy === forgedBy) {
    return Ring.findByIdAndUpdate(id, data, { new: true });
  }

  const createdRingsCount = await Ring.countDocuments({ forgedBy });
  const maxAllowedRings = maxRings[forgedBy];

  if (createdRingsCount >= maxAllowedRings) {
    throw new Error(`Ring limit for ${forgedBy} reached`);
  }

  return Ring.findByIdAndUpdate(id, data, { new: true });
};

const deleteRing = async (id: string) => {
  return Ring.findByIdAndDelete(id);
};

export default {
  createRing,
  listRings,
  updateRing,
  deleteRing,
};
