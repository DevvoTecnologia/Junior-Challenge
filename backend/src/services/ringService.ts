import Ring, { IRing } from "../models/Ring";

const maxRings: { [key: string]: number } = {
  Elves: 3,
  Dwarves: 7,
  Men: 9,
  Sauron: 1,
};

// create a ring
export const createRing = async (ring: IRing) => {
  const { name, power, holder, forgedBy, image } = ring;

  const totalRing = await Ring.countDocuments({ forgedBy });

  if (maxRings[forgedBy] !== undefined && totalRing >= maxRings[forgedBy]) {
    throw new Error(
      `Maximum allowed rings forged by ${forgedBy} is ${maxRings[forgedBy]}`
    );
  }

  const newRing = new Ring({
    name,
    power,
    holder,
    forgedBy,
    image,
  });

  await newRing.save();

  return newRing;
};

// get all rings
export const getRings = async () => {
  const rings = await Ring.find();

  return rings;
};

// update a ring
export const updateRing = async (id: string, ring: IRing) => {
  const { name, power, holder, forgedBy, image } = ring;

  const updatedRing = await Ring.findByIdAndUpdate(id, ring, {
    new: true,
  });

  if (!updatedRing) {
    throw new Error("Ring not found.");
  }

  return updatedRing;
};

// delete a ring
export const deleteRing = async (id: string) => {
  const deletedRing = await Ring.findByIdAndDelete(id);

  if (!deletedRing) {
    throw new Error("Ring not found.");
  }

  return deletedRing;
};
