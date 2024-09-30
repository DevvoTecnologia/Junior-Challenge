import * as motion from "framer-motion/client";
import Link from "next/link";

import { auth } from "@/auth";

export default async function UsersSettingsPage() {
  const session = await auth();
  const username = session?.user.username;
  const userId = session?.user.userId;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute right-2 top-2"
      >
        <Link href={`/users/${userId}`}>
          <button className="rounded bg-green-500 p-2 text-white transition duration-300 hover:bg-green-600">
            Back to Profile
          </button>
        </Link>
      </motion.div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-4xl font-bold"
      >
        Hello{" "}
        {username && username?.charAt(0).toUpperCase() + username?.slice(1)}!
        Welcome to your settings page.
      </motion.h1>
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 text-2xl"
      >
        Settings
      </motion.h2>
      <motion.form
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-md rounded-lg bg-white p-6 text-black shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Username:
          </label>
          <input
            className="w-full rounded border border-gray-300 p-2"
            type="text"
            id="username"
            value={username}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password:
          </label>
          <input
            className="w-full rounded border border-gray-300 p-2"
            type="password"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Save
        </button>
      </motion.form>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6"
      >
        <button className="rounded bg-red-500 p-2 text-white transition duration-300 hover:bg-red-600">
          Delete User
        </button>
      </motion.div>
    </motion.div>
  );
}
