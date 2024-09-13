import { Forgers } from "../models/forgers";
import { Rings } from "../models/rings";

export async function validateForgerCapacity(
  forgedBy: number
): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forger: any = await Forgers.findOne({ where: { id: forgedBy } });

  if (!forger) {
    throw new Error("Forger not found");
  }

  const ringsCount = await Rings.count({ where: { ForgerId: forgedBy } });

  const MAX_RINGS = forger.maximumNumberRings;

  return ringsCount < MAX_RINGS;
}
