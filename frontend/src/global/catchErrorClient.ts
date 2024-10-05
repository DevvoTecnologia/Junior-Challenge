"use client";

import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const defaultErrorMsg = "An unexpected error occurred, please try again later";

export default async function catchErrorClient(
  error: unknown,
  unknownErrorMessage: string = defaultErrorMsg,
) {
  if (error instanceof AxiosError) {
    if (Array.isArray(error.response?.data.message)) {
      return error.response?.data.message.forEach((message: string) => {
        toast.error(message);
      });
    }

    if (error.response?.data.message === "Token is invalid or expired") {
      await signOut({ redirectTo: "/login" });

      return toast.warn("Your session has expired, please log in again");
    }

    return toast.error(error.response?.data.message);
  }

  return toast.error(unknownErrorMessage);
}
