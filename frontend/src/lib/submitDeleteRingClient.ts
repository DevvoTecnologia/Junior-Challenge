"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

import catchErrorClient from "@/global/catchErrorClient";

import fetchClient from "./fetchClient";

export default async function submitDeleteRingClient({
  id,
  name,
  token,
  router,
}: {
  id: string;
  name: string;
  token: string | undefined;
  router: AppRouterInstance;
}) {
  if (confirm("Você tem certeza que deseja deletar o anel " + name + "?")) {
    try {
      await fetchClient.delete(`/ring/${id}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      toast.success(`Ring ${id} deleted successfully`);

      router.refresh();
    } catch (error) {
      return catchErrorClient(
        error,
        "An error occurred while deleting the ring",
      );
    }
  }
}
