"use server";
import { HttpClientAdapter } from "@/src/infra/adapters/axios-adapter";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TFormSchema } from "../components/form/login-form/use-login-form";
import { apiURL, endpoints } from "../utils/constants";
export const createAccount = async (data: TFormSchema) => {
  const httpClient = new HttpClientAdapter();

  const body = {
    name: "name" in data ? data.name : "",
    email: data.email,
    password: data.password,
  };

  const response = await httpClient.request({
    method: "post",
    url: `${apiURL}${endpoints.register}`,
    body,
  });

  return response;
};

export const Logout = () => {
  cookies().delete("token");
  redirect("/login");
};

export const Login = async (data: TFormSchema) => {
  const httpClient = new HttpClientAdapter();
  const body = { email: data.email, password: data.password };
  const response = await httpClient.request({
    method: "post",
    url: `${apiURL}${endpoints.login}`,
    body,
  });

  if (response && response?.statusCode < 400) {
    cookies().set({
      name: "token",
      value: response?.body?.token,
    });

    redirect("/create-rings");
  }

  return response;
};

export const createRing = async (formData: FormData) => {
  const token = cookies().get("token");
  const httpClient = new HttpClientAdapter();

  const response = await httpClient.request({
    method: "post",
    url: `${apiURL}${endpoints.createRing}`,
    body: formData,
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const updateRing = async (formData: FormData, ringId: string) => {
  const token = cookies().get("token");
  const httpClient = new HttpClientAdapter();

  console.log(`formData`, formData);
  const response = await httpClient.request({
    method: "put",
    url: `${apiURL}${endpoints.updateRing}/${ringId}`,
    body: formData,
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  return response;
};

export const deleteRing = async (ringId: string) => {
  const token = cookies().get("token");
  const httpClient = new HttpClientAdapter();

  const response = await httpClient.request({
    method: "delete",
    url: `${apiURL}${endpoints.deleteRing}/${ringId}`,
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};
