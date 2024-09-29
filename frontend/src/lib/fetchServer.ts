/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

import { tokenKey } from "@/global/storageKeys";
import axiosInstance from "@/service/axiosInstance";

class FetchServer {
  private readonly token: string | undefined;

  constructor() {
    this.token = cookies().get(tokenKey)?.value;

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

const fetchServer = new FetchServer();

export default fetchServer;
