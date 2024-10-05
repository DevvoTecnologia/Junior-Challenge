import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";

interface NoRingsFoundProps {
  username: string;
  isMyProfile: boolean;
}

export default function NoRingsFound({
  username,
  isMyProfile,
}: Readonly<NoRingsFoundProps>) {
  return (
    <motion.div
      className="flex h-screen flex-col items-center justify-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="mb-1 text-center text-2xl font-semibold text-gray-900"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Username: {username.charAt(0).toUpperCase() + username.slice(1)}
      </motion.h2>
      <motion.p
        className="text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        No rings available
      </motion.p>

      {isMyProfile && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            className="flex items-center text-2xl text-blue-600 hover:text-blue-800 active:text-blue-900"
            href={`/rings/new`}
          >
            <svg
              className="mr-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create a new ring, click here!
          </Link>
        </motion.div>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Image
          src="/no-content.png"
          alt="no-content"
          width={200}
          height={200}
          className="h-auto w-auto"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link
          className="text-2xl text-gray-700 hover:text-blue-400 active:text-blue-600"
          href={`/users`}
        >
          Back
        </Link>
      </motion.div>
    </motion.div>
  );
}
