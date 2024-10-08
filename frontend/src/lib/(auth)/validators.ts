"use client";

import { toast } from "react-toastify";

export function validateUsername(username: string): boolean {
  if (username.length < 3) {
    toast.error("Username should be at least 3 characters long");
    return false;
  }
  if (username.length > 20) {
    toast.error("Username should be at most 20 characters long");
    return false;
  }
  return true;
}

export function validatePassword(password: string): boolean {
  if (password.length < 4) {
    toast.error("Password should be at least 4 characters long");
    return false;
  }
  if (password.length > 255) {
    toast.error("Password should be at most 255 characters long");
    return false;
  }
  return true;
}
