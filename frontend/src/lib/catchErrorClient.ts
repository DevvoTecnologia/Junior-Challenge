"use client";

import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function catchErrorClient(error: unknown) {
  if (error instanceof AxiosError) {
    if (Array.isArray(error.response?.data.message)) {
      return error.response?.data.message.forEach((message: string) => {
        toast.error(message);
      });
    }

    return toast.error(error.response?.data.message);
  }

  return toast.error("An error occurred while deleting the ring");
}
