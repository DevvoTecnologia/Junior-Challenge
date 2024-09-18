import { useContext } from "react";
import { RingContext } from "../context/RingContext";

export function useRing() {
  const context = useContext(RingContext);

  if (!context) {
    throw new Error("useRing must be used within a RingProvider");
  }

  return context;
}