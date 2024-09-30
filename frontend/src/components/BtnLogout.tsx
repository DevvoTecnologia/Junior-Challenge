"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

interface BtnLogoutProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BtnLogout({ className, children }: BtnLogoutProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={() => {
        signOut({
          redirectTo: "/",
        });
      }}
    >
      {children ? children : "Logout"}
    </motion.button>
  );
}
