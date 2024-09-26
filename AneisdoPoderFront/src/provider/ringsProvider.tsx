import { useRings } from "../hooks/useRings";

export const ringsProvider = () => {
  const { data, isLoading, error } = useRings();

  return {
    data,
    isLoading,
    error,
  };
};
