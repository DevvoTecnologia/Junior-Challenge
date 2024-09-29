/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import { tokenKey } from "@/global/storageKeys";
import axiosInstance from "@/service/axiosInstance";

class FetchBase {
  protected token: string | undefined;

  constructor(token: string | undefined) {
    this.token = token;

    if (this.token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    const response = await axiosInstance.get<T>(url, config);
    return response;
  }

  async post<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
    const response = await axiosInstance.post<T>(url, data, config);
    return response;
  }

  async put<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
    const response = await axiosInstance.put<T>(url, data, config);
    return response;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    const response = await axiosInstance.delete<T>(url, config);
    return response;
  }
}

class FetchClient extends FetchBase {
  constructor() {
    const token = getCookie(tokenKey) as string | undefined;
    super(token);
  }
}

class FetchServer extends FetchBase {
  constructor() {
    const token = cookies().get(tokenKey)?.value;
    super(token);
  }
}

const fetchClient = new FetchClient();
const fetchServer = new FetchServer();

export { fetchClient, fetchServer };
