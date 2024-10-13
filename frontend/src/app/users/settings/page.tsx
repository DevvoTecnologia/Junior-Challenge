import * as motion from "framer-motion/client";

import SettingsForm from "@/components/form/Settings";
import SettingsOAuthForm from "@/components/form/SettingsOAuth";
import getSessionServer from "@/lib/getSessionServer";

export default async function UsersSettingsPage() {
  const { token, userId, username, isOAuth, email } = await getSessionServer();

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
        {username?.trim()
          ? username?.charAt(0).toUpperCase() + username?.slice(1)
          : "User"}
        ! Welcome to your settings page.
      </motion.h1>
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 text-2xl"
      >
        Settings
      </motion.h2>

      {isOAuth ? (
        <SettingsOAuthForm
          usernameSession={username}
          userId={userId}
          token={token}
        />
      ) : (
        <SettingsForm
          usernameSession={username}
          emailSession={email}
          userId={userId}
          token={token}
        />
      )}
    </motion.div>
  );
}
