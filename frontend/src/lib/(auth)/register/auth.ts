"use client";

import { toast } from "react-toastify";

import catchErrorClient from "@/global/catchErrorClient";
import axiosInstance from "@/service/axiosInstance";
import type { RegisterSuccess } from "@/types/User";

export async function registerUser(username: string, password: string) {
  try {
    await axiosInstance.post<RegisterSuccess>("/user", {
      username,
      password,
    });

    toast.success("User registered successfully");
    return true;
  } catch (error) {
    await catchErrorClient(error);
    return false;
  }
}
