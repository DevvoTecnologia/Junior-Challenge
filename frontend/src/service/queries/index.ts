"use client";

import fetchClient from "@/lib/fetchClient";
import type { Ring, Rings } from "@/types/Ring";
import type { User, Users } from "@/types/User";

export async function getAllUsers() {
  return (await fetchClient.get<Users>("/user")).data;
}

export async function getUserById(id: number) {
  return (await fetchClient.get<User>(`/user/${id}`)).data;
}

export async function getAllRings(token?: string) {
  return (
    await fetchClient.get<Rings>("/ring", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
  ).data;
}

export async function getRingById(id: number, token: string) {
  return (
    await fetchClient.get<Ring>(`/ring/${id}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
  ).data;
}
