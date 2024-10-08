"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosRequestConfig, AxiosResponse } from "axios";

import axiosInstance from "@/service/axiosInstance";

class FetchClient {
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any> | undefined> {
    const response = await axiosInstance.get<T>(url, config);

    return response;
  }

  async post<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any> | undefined> {
    const response = await axiosInstance.post<T>(url, data, config);

    return response;
  }

  async put<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any> | undefined> {
    const response = await axiosInstance.put<T>(url, data, config);

    return response;
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T, any> | undefined> {
    const response = await axiosInstance.delete<T>(url, config);

    return response;
  }
}

const fetchClient = new FetchClient();

export default fetchClient;
