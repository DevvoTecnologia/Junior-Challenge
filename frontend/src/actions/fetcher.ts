"use server";

import axiosInstance from "@/service/axiosInstance";

export default async function fetcher<T>(url: string, token?: string) {
  const response = await axiosInstance.get<T>(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return response;
}
