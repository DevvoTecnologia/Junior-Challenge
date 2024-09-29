import fetchClient from "@/lib/fetchClient";
import type { Ring, Rings } from "@/types/Ring";
import type { User, Users } from "@/types/User";

export async function getAllUsers() {
  return (await fetchClient.get<Users>("/user")).data;
}

export async function getUserById(id: number) {
  return (await fetchClient.get<User>(`/user/${id}`)).data;
}

export async function getAllRings() {
  return (await fetchClient.get<Rings>("/ring")).data;
}

export async function getRingById(id: number) {
  return (await fetchClient.get<Ring>(`/ring/${id}`)).data;
}
