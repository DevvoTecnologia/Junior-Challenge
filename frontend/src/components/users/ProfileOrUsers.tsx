"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

interface ProfileOrUsersProps {
  userId: number | undefined;
}

export default function ProfileOrUsers({ userId }: ProfileOrUsersProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {pathname === `/users/${userId}` ? (
        <Link href={`/users`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white sm:gap-2 sm:px-1 sm:py-2 md:px-4 md:py-2"
          >
            Users
            <FaUser />
          </motion.button>
        </Link>
      ) : (
        <Link href={`/users/${userId}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white sm:gap-2 sm:px-1 sm:py-2 md:px-4 md:py-2"
          >
            Profile
            <FaUser />
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
}
