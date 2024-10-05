"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export async function authenticateUser(username: string, password: string) {
  const response = await signIn("credentials", {
    username,
    password,
    redirect: false,
  });

  if (response?.error) {
    toast.error("Invalid username or password");
    return false;
  }

  toast.success("Logged in successfully");
  return true;
}
