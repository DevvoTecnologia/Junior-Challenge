"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

import submitDeleteRingClient from "@/lib/submitDeleteRingClient";
import type { UserRings } from "@/types/User";

interface RingsDeleteBtnIconBlackProps {
  ring: UserRings;
  token: string | undefined;
}

export default function RingsDeleteBtnIconBlack({
  ring,
  token,
}: Readonly<RingsDeleteBtnIconBlackProps>) {
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
    >
      <MdDelete size={24} color="black" />
    </motion.button>
  );
}
