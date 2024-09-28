"use server";

import axiosInstance from "@/service/fetcher/axiosInstance";

export async function fetcher<T>(url: string): Promise<T> {
  const response = await axiosInstance.get<T>(url);

  return response.data;
}
