/* eslint-disable no-console */
import { fetcher } from "@/actions/fetcher";
import type { Users } from "@/types/User";

export async function getAllUsers() {
  try {
    return await fetcher<Users>("/user");
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id: number) {
  try {
    return await fetcher<Users>(`/user/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllRings() {
  try {
    return await fetcher<Users>("/ring");
  } catch (error) {
    console.error(error);
  }
}

export async function getRingById(id: number) {
  try {
    return await fetcher<Users>(`/ring/${id}`);
  } catch (error) {
    console.error(error);
  }
}
