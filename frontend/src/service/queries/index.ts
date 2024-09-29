import fetcher from "@/actions/fetcher";
import type { Ring, Rings } from "@/types/Ring";
import type { User, Users } from "@/types/User";

export async function getAllUsers() {
  return (await fetcher<Users>("/user")).data;
}

export async function getUserById(id: number) {
  return (await fetcher<User>(`/user/${id}`)).data;
}

export async function getAllRings() {
  return (await fetcher<Rings>("/ring")).data;
}

export async function getRingById(id: number) {
  return (await fetcher<Ring>(`/ring/${id}`)).data;
}
