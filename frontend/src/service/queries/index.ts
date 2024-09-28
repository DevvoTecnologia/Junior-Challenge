import { fetcher } from "@/actions/fetcher";
import type { Users } from "@/types/User";

export async function getAllUsers() {
  return await fetcher<Users>("/user");
}

export async function getUserById(id: number) {
  return await fetcher<Users>(`/user/${id}`);
}

export async function getAllRings() {
  return await fetcher<Users>("/ring");
}

export async function getRingById(id: number) {
  return await fetcher<Users>(`/ring/${id}`);
}
