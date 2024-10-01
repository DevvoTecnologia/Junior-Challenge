import * as motion from "framer-motion/client";

import { auth } from "@/auth";
import SettingsForm from "@/components/form/Settings";

export default async function UsersSettingsPage() {
  const session = await auth();
  const username = session?.user.username;
  const userId = session?.user.userId;
  const token = session?.user.accessToken;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-center text-4xl font-bold"
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

      <SettingsForm usernameSession={username} userId={userId} token={token} />
    </motion.div>
  );
}
