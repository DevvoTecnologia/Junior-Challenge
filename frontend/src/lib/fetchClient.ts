"use client";

import { getCookie } from "cookies-next";
import { signOut } from "next-auth/react";

import { tokenKey } from "@/global/storageKeys";
import axiosInstance from "@/service/fetcher/axiosInstance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchClient<T = any>(url: string) {
  const jwt = getCookie(tokenKey);

  const response = await axiosInstance.get<T>(url, {
    headers: {
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
    },
  });

  if (response.status !== 200) {
    await signOut();
  }

  return response;
}
