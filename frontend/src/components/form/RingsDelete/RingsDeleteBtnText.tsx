"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import submitDeleteRingClient from "@/lib/submitDeleteRingClient";

interface RingsDeleteBtnTextProps {
  ringId: string;
  token: string | undefined;
  ringName: string | undefined;
}

export default function RingsDeleteBtnText({
  ringId,
  token,
  ringName = "",
}: Readonly<RingsDeleteBtnTextProps>) {
  const router = useRouter();

  return (
    <motion.button
      onClick={async () => {
        await submitDeleteRingClient({
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
