import { cookies } from "next/headers";

import { tokenKey } from "@/global/storageKeys";
import axiosInstance from "@/service/fetcher/axiosInstance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchServer<T = any>(url: string) {
  const jwt = cookies().get(tokenKey)?.value;

  const response = await axiosInstance.get<T>(url, {
    headers: {
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
    },
  });

  return response;
}
