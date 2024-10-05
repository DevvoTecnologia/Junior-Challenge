"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { registerUser } from "@/lib/(auth)/register/auth";
import { validatePassword, validateUsername } from "@/lib/(auth)/validators";

import { LoadingIcon } from "../Loading";

export default function RegisterForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateUsername(username) || !validatePassword(password)) {
      return;
    }

    const isRegistered = await registerUser(username, password);

    if (isRegistered) {
      router.push("/login");
    }
  }

  return (
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
          type={showPassword ? "text" : "password"}
          name="password"
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
          Register
        </motion.button>
      )}
    </motion.form>
  );
}
