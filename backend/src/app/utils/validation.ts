import { ForgerType } from "../@types/forgerType";
import { IRing } from "../@types/IRing";
import { AppDataSource } from "../database/data-source";
import { Ring } from "../models/Ring";

const ringRepository = AppDataSource.getRepository(Ring);

const maxAllowed: Record<string, number> = {
  [ForgerType.SAURON]: 1,
  [ForgerType.ELFOS]: 3,
  [ForgerType.ANOES]: 7,
  [ForgerType.HOMENS]: 9,
};

export const ringLimitAllowed = async (ring: Ring): Promise<boolean> => {
  const ringsForged = await ringRepository.count({
    where: { forged: ring.forged },
  });

  console.log(ringsForged);
  console.log('maxAllowed: ', maxAllowed[ring.forged]);


  return ringsForged >= maxAllowed[ring.forged]
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}