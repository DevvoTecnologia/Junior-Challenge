"use client";

import { motion } from "framer-motion";
import { useTransition } from "react";
import { toast } from "react-toastify";

import { handleLogoutServer } from "@/actions";

interface BtnLogoutProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BtnLogout({ className, children }: BtnLogoutProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <motion.form>
      <motion.button
        disabled={isPending}
        onClick={async () => {
          await startTransition(async () => {
            await handleLogoutServer();

            toast.success("You have been logged out successfully");
          });
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={className}
      >
        {children ? children : "Logout"}
      </motion.button>
    </motion.form>
  );
}
