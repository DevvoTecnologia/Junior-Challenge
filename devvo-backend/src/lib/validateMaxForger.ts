import { Forger, forgerLimits } from "../@types";

export const validateForgerLimit = (forger: Forger, count: number): boolean => {
  const limit = forgerLimits[forger];
  return count < limit;
};
