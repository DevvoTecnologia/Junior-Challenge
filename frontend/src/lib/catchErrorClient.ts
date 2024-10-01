"use client";

import { AxiosError } from "axios";
import { toast } from "react-toastify";

const defaultErrorMsg = "An unexpected error occurred, please try again later";

export default function catchErrorClient(
  error: unknown,
  unknownErrorMessage: string = defaultErrorMsg,
) {
  if (error instanceof AxiosError) {
    if (Array.isArray(error.response?.data.message)) {
      return error.response?.data.message.forEach((message: string) => {
        toast.error(message);
      });
    }

    return toast.error(error.response?.data.message);
  }

  return toast.error(unknownErrorMessage);
}
