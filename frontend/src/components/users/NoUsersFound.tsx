import * as motion from "framer-motion/client";
import Image from "next/image";

export default function NoUsersFound() {
  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-6 font-serif text-3xl text-yellow-400">
        No users available
      </p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/no-content.png"
          alt="No users"
          width={300}
          height={300}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
