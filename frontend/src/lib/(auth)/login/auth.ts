"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export async function authenticateUser(email: string, password: string) {
  const response = await signIn("Credentials", {
    email,
    password,
    redirect: false,
  });

  if (response?.error) {
    toast.error("Invalid user or password");
    return false;
  }

  toast.success("Logged in successfully");
  return true;
}
