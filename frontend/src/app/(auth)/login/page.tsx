"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { LoadingIcon } from "@/components/Loading";

export default function LoginPage() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.length < 3) {
      return toast.error("Username should be at least 3 characters long");
    }

    if (password.length < 4) {
      return toast.error("Password should be at least 4 characters long");
    }

    if (password.length > 255) {
      return toast.error("Password should be at most 255 characters long");
    }

    if (username.length > 20) {
      return toast.error("Username should be at most 20 characters long");
    }

    const response = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (response?.error) {
      return toast.error("Invalid username or password");
    }

    toast.success("Logged in successfully");

    router.replace(`/users`);

    router.refresh();
  }

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
        <motion.form
          onSubmit={(e) => {
            startTransition(async () => {
              await handleSubmit(e);
            });
          }}
        >
          <motion.div className="mb-4" whileHover={{ scale: 1.05 }}>
            <label
              className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-200"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </motion.div>
          <motion.div className="relative mb-6" whileHover={{ scale: 1.05 }}>
            <label
              className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <motion.button
              type="button"
              className="absolute right-2 top-9 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <FaEye color="black" size={24} />
              ) : (
                <FaEyeSlash color="black" size={24} />
              )}
            </motion.button>
          </motion.div>
          {isPending ? (
            <motion.div className="flex justify-center">
              <LoadingIcon />
            </motion.div>
          ) : (
            <motion.button
              type="submit"
              className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isPending}
            >
              Sign in
            </motion.button>
          )}
        </motion.form>
        <motion.button
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 hover:underline focus:outline-none"
        >
          <Link href="/register">Don&apos;t have an account? Register</Link>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
