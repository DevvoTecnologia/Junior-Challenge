import * as motion from "framer-motion/client";

import LoginForm from "@/components/form/LoginUser";

export default async function LoginPage() {
  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mx-2 w-full max-w-md rounded-lg bg-white p-8 shadow-lg sm:mx-0 dark:bg-gradient-to-r dark:from-blue-800 dark:to-gray-700"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
          Login Page
        </h1>

        <LoginForm />
      </motion.div>
    </motion.div>
  );
}
