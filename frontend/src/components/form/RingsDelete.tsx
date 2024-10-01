"use client";

import { motion } from "framer-motion";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import catchErrorClient from "@/lib/catchErrorClient";
import fetchClient from "@/lib/fetchClient";
import type { RingResponseBase } from "@/types/Ring";
import type { UserRings } from "@/types/User";

async function submitDeleteRing({
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

interface RingsDeleteBtnIconRedProps {
  ring: RingResponseBase;
  token: string | undefined;
}

export function RingsDeleteBtnIconRed({
  ring,
  token,
}: RingsDeleteBtnIconRedProps) {
  const router = useRouter();

  return (
    <motion.button
      onClick={async () => {
        await submitDeleteRing({
          id: ring.id.toString(),
          name: ring.name,
          token,
          router,
        });
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
    >
      <MdDelete />
    </motion.button>
  );
}

interface RingsDeleteBtnIconBlackProps {
  ring: UserRings;
  token: string | undefined;
}

export function RingsDeleteBtnIconBlack({
  ring,
  token,
}: RingsDeleteBtnIconBlackProps) {
  const router = useRouter();

  return (
    <motion.button
      onClick={async () => {
        await submitDeleteRing({
          id: ring.id.toString(),
          name: ring.name,
          token,
          router,
        });
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MdDelete size={24} color="black" />
    </motion.button>
  );
}

interface RingsDeleteBtnTextProps {
  ringId: string;
  token: string | undefined;
  ringName: string | undefined;
}

export function RingsDeleteBtnText({
  ringId,
  token,
  ringName = "",
}: RingsDeleteBtnTextProps) {
  const router = useRouter();

  return (
    <motion.button
      onClick={async () => {
        await submitDeleteRing({
          id: ringId,
          name: ringName,
          token,
          router,
        });
      }}
      className="rounded-md bg-red-500 p-3 text-white hover:bg-red-600"
      whileHover={{ scale: 1.05 }}
    >
      Delete
    </motion.button>
  );
}
