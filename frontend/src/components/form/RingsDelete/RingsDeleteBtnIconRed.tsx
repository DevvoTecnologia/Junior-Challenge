"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

import submitDeleteRingClient from "@/lib/submitDeleteRingClient";
import type { RingResponseBase } from "@/types/Ring";

interface RingsDeleteBtnIconRedProps {
  ring: RingResponseBase;
  token: string | undefined;
}

export default function RingsDeleteBtnIconRed({
  ring,
  token,
}: Readonly<RingsDeleteBtnIconRedProps>) {
  const router = useRouter();

  return (
    <motion.button
      onClick={async () => {
        await submitDeleteRingClient({
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
