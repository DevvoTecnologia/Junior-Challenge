import { Ring } from "@/domain/Rings"

export async function getRings(): Promise<Ring[]> {
  const response = await fetch("/rings")

  const rings = await response.json()

  return rings
}